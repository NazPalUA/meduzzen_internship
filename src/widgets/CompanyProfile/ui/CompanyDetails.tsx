"use client"

import { type CompanyDetails } from "@entities/company"
import { Settings } from "@features/manage-company"
import EmailIcon from "@mui/icons-material/Email"
import LinkIcon from "@mui/icons-material/Link"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import PhoneIcon from "@mui/icons-material/Phone"
import { Card, CardContent, CardHeader, Chip } from "@mui/material"
import { Link } from "@navigation"
import { Avatar } from "@shared/ui/Avatar"
import { useTranslations } from "next-intl"
import styles from "./CompanyDetails.module.scss"

type DisplayLink = {
  url: string
  displayText: string
}

export function CompanyDetails({ company }: { company: CompanyDetails }) {
  const {
    company_name,
    company_title,
    company_avatar,
    company_description,
    company_city,
    company_phone,
    company_links,
    is_visible,
    company_owner: { user_firstname, user_lastname, user_email, user_avatar },
  } = company

  const t = useTranslations("CompanyProfilePage")

  const displayLinks: DisplayLink[] = company_links
    ? company_links
        .map((link) => {
          try {
            const url = new URL(link)
            return {
              url: url.toString(),
              displayText: url.hostname.replace(/^www\./, ""),
            }
          } catch {
            return null
          }
        })
        .filter((link) => link !== null)
    : []

  return (
    <Card className={styles.card}>
      <CardHeader
        avatar={<Avatar src={company_avatar} alt={company_name} size="lg" />}
        title={<h3>{company_name}</h3>}
        subheader={
          <>
            <strong className={styles["card__sub-title"]}>{company_title}</strong>
            <Chip
              size="small"
              label={is_visible ? "Visible" : "Hidden"}
              color={is_visible ? "success" : "warning"}
            />
          </>
        }
        action={<Settings />}
      />
      <CardContent>
        {company_description && (
          <section>
            <h4>{t("aboutUs")}</h4>
            <p>{company_description}</p>
          </section>
        )}

        {(company_city || company_phone || user_email) && (
          <section className={styles.info}>
            {company_city && (
              <div className={styles.info__item}>
                <LocationCityIcon color="action" />
                <span>{company_city}</span>
              </div>
            )}
            {company_phone && (
              <div className={styles.info__item}>
                <PhoneIcon color="action" />
                <span>{company_phone}</span>
              </div>
            )}
            {user_email && (
              <div className={styles.info__item}>
                <EmailIcon color="action" />
                <span>{user_email}</span>
              </div>
            )}
          </section>
        )}

        {displayLinks.length > 0 && (
          <section>
            <h4>{t("companyLinks")}</h4>

            <div className={styles.links}>
              {displayLinks?.map((link, index) => (
                <Link key={index} href={link.url} target="_blank" className={styles.links__item}>
                  <LinkIcon />
                  {link.displayText}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h4>{t("companyOwner")}</h4>

          <div className={styles.owner__info}>
            <Avatar src={user_avatar} alt={user_firstname} size="sm" />
            <div className={styles.owner__details}>
              <strong>
                {user_firstname} {user_lastname}
              </strong>
              <div className={styles.owner__contact}>
                <EmailIcon fontSize="small" color="action" />
                <span>{user_email}</span>
              </div>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
