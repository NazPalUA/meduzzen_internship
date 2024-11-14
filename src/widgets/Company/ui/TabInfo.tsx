import { type CompanyDetails } from "@entities/company"
import EmailIcon from "@mui/icons-material/Email"
import LinkIcon from "@mui/icons-material/Link"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import PhoneIcon from "@mui/icons-material/Phone"
import { Link } from "@navigation"
import { Avatar } from "@shared/components/ui"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { getDisplayLinks } from "../lib/utils/getDisplayLinks"
import styles from "./Styles.module.scss"

export function TabInfo({ company }: { company: CompanyDetails }) {
  const {
    company_description,
    company_city,
    company_phone,
    company_links,
    company_owner: { user_firstname, user_lastname, user_email, user_avatar, user_id },
  } = company

  const t = useTranslations("CompanyPage.info")

  const displayLinks = getDisplayLinks(company_links)

  return (
    <div className={styles.info}>
      {company_description && (
        <section className={styles.info__section}>
          <h4 className={styles.info__sectionTitle}>{t("aboutUs")}</h4>
          <p className={styles.info__sectionDescription}>{company_description}</p>
        </section>
      )}

      {(company_city || company_phone || user_email) && (
        <section className={clsx(styles.info__section, styles.info__sectionContacts)}>
          {company_city && (
            <div className={styles.info__contact}>
              <LocationCityIcon color="action" />
              <span>{company_city}</span>
            </div>
          )}
          {company_phone && (
            <div className={styles.info__contact}>
              <PhoneIcon color="action" />
              <span>{company_phone}</span>
            </div>
          )}
          {user_email && (
            <div className={styles.info__contact}>
              <EmailIcon color="action" />
              <span>{user_email}</span>
            </div>
          )}
        </section>
      )}

      {!!displayLinks.length && (
        <section className={styles.info__section}>
          <h4 className={styles.info__sectionTitle}>{t("companyLinks")}</h4>

          <div className={styles.info__links}>
            {displayLinks?.map((link, index) => (
              <Link key={index} href={link.url} target="_blank" className={styles.info__link}>
                <LinkIcon />
                {link.displayText}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.info__section}>
        <h4 className={styles.info__sectionTitle}>{t("companyOwner")}</h4>
        <div className={styles.info__owner}>
          <Avatar src={user_avatar} alt={user_firstname} size="sm" />
          <div className={styles.info__ownerDetails}>
            <Link href={`/users/${user_id}`} className={styles.info__ownerLink}>
              <strong>
                {user_firstname} {user_lastname}
              </strong>
            </Link>
            <div className={styles.info__ownerContact}>
              <EmailIcon fontSize="small" color="action" />
              <span>{user_email}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
