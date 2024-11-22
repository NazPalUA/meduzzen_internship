import { type UserDetails } from "@entities/user"
import { Email, Info, Link, LocationCity, Phone } from "@mui/icons-material"
import { useTranslations } from "next-intl"
import { InfoCard } from "./InfoCard"
import { InfoLinksCard } from "./InfoLinksCard"
import styles from "./Styles.module.scss"

export function UserInfo({ user }: { user: UserDetails }) {
  const { user_email, user_status, user_city, user_phone, user_links } = user

  const t = useTranslations("UserPage.info")

  return (
    <div className={styles.info}>
      <InfoCard label={t("email")} value={user_email} icon={<Email />} />
      <InfoCard label={t("status")} value={user_status} icon={<Info />} />
      <InfoCard label={t("city")} value={user_city} icon={<LocationCity />} />
      <InfoCard label={t("phone")} value={user_phone} icon={<Phone />} />
      <InfoLinksCard label={t("links")} links={user_links} icon={<Link />} />
    </div>
  )
}
