import { type UserDetails } from "@entities/user"
import { useTranslations } from "next-intl"

import EmailIcon from "@mui/icons-material/Email"
import InfoIcon from "@mui/icons-material/Info"
import LinkIcon from "@mui/icons-material/Link"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import PhoneIcon from "@mui/icons-material/Phone"

import { Header } from "./Header"
import { InfoCard } from "./InfoCard"
import { LinksCard } from "./LinksCard"
import styles from "./UserDetails.module.scss"

export function UserDetails({ user }: { user: UserDetails }) {
  const {
    user_firstname,
    user_lastname,
    user_email,
    user_avatar,
    user_status,
    user_city,
    user_phone,
    user_links,
    is_superuser,
  } = user

  const t = useTranslations("ProfilePage")

  return (
    <div className={styles.container}>
      <Header
        user_firstname={user_firstname}
        user_lastname={user_lastname}
        is_superuser={is_superuser}
        user_avatar={user_avatar}
      />
      <div className={styles.userInfo}>
        <InfoCard label={t("email")} value={user_email} icon={<EmailIcon color="primary" />} />
        <InfoCard label={t("status")} value={user_status} icon={<InfoIcon color="primary" />} />
        <InfoCard label={t("city")} value={user_city} icon={<LocationCityIcon color="primary" />} />
        <InfoCard label={t("phone")} value={user_phone} icon={<PhoneIcon color="primary" />} />
        <LinksCard label={t("links")} links={user_links} icon={<LinkIcon color="primary" />} />
      </div>
    </div>
  )
}
