import { Avatar } from "@/src/shared/components/ui"
import { type UserDetails } from "@entities/user"
import { Settings } from "@features/manage-user-profile"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import EmailIcon from "@mui/icons-material/Email"
import InfoIcon from "@mui/icons-material/Info"
import LinkIcon from "@mui/icons-material/Link"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import PhoneIcon from "@mui/icons-material/Phone"
import { Card, CardContent, CardHeader } from "@mui/material"
import { useTranslations } from "next-intl"
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
  const timestamp = new Date().getTime()

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user_avatar} alt={user_firstname} cacheKey={timestamp} />}
        title={<h3>{`${user_firstname} ${user_lastname}`}</h3>}
        subheader={is_superuser ? <AdminPanelSettingsIcon color="primary" /> : null}
        action={<Settings />}
      />
      <CardContent className={styles.userInfo}>
        <InfoCard label={t("email")} value={user_email} icon={<EmailIcon color="primary" />} />
        <InfoCard label={t("status")} value={user_status} icon={<InfoIcon color="primary" />} />
        <InfoCard label={t("city")} value={user_city} icon={<LocationCityIcon color="primary" />} />
        <InfoCard label={t("phone")} value={user_phone} icon={<PhoneIcon color="primary" />} />
        <LinksCard label={t("links")} links={user_links} icon={<LinkIcon color="primary" />} />
      </CardContent>
    </Card>
  )
}
