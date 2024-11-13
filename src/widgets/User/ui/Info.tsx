import { type UserDetails } from "@entities/user"
import EmailIcon from "@mui/icons-material/Email"
import InfoIcon from "@mui/icons-material/Info"
import LinkIcon from "@mui/icons-material/Link"

import LocationCityIcon from "@mui/icons-material/LocationCity"
import PhoneIcon from "@mui/icons-material/Phone"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import styles from "./Styles.module.scss"
// eslint-disable-next-line
import Link from "next/link"

export function Info({ user }: { user: UserDetails }) {
  const { user_email, user_status, user_city, user_phone, user_links } = user

  const t = useTranslations("UserPage.info")

  return (
    <div className={styles.userInfo}>
      <InfoCard label={t("email")} value={user_email} icon={<EmailIcon />} />
      <InfoCard label={t("status")} value={user_status} icon={<InfoIcon />} />
      <InfoCard label={t("city")} value={user_city} icon={<LocationCityIcon />} />
      <InfoCard label={t("phone")} value={user_phone} icon={<PhoneIcon />} />
      <LinksCard label={t("links")} links={user_links} icon={<LinkIcon />} />
    </div>
  )
}

export function InfoCard({
  label,
  value,
  icon,
}: {
  label: string
  value: string | React.ReactNode | null
  icon: React.ReactNode
}) {
  return (
    <div className={styles.infoCard}>
      {icon}
      <div>
        <strong className={styles.infoCard__label}>{label}</strong>
        {typeof value === "string" || value === null ? (
          <span className={clsx(styles.infoCard__value, !value && styles.infoCard__noValue)}>
            {value || "—"}
          </span>
        ) : (
          value
        )}
      </div>
    </div>
  )
}

export function LinksCard({
  label,
  links,
  icon,
}: {
  label: string
  links: string[] | null
  icon: React.ReactNode
}) {
  const displayLinks: {
    url: string
    displayText: string
  }[] = links
    ? links
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
    <InfoCard
      label={label}
      icon={icon}
      value={
        displayLinks.length > 0
          ? displayLinks.map(({ url, displayText }, index) => (
              <Link
                href={url}
                key={index}
                target="_blank"
                className={clsx(styles.link, styles.userInfo__link)}
              >
                {displayText}
              </Link>
            ))
          : null
      }
    />
  )
}
