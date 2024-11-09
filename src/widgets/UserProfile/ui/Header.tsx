import { type UserDetails } from "@entities/user"
import { Settings } from "@features/manage-user-profile"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import { Avatar } from "@mui/material"
import { NoCacheNextImage } from "@shared/components/ui"
import styles from "./Header.module.scss"

export function Header({
  user_firstname,
  user_lastname,
  is_superuser,
  user_avatar,
}: Pick<UserDetails, "user_firstname" | "user_lastname" | "is_superuser" | "user_avatar">) {
  const timestamp = new Date().getTime()

  return (
    <div className={styles.header}>
      <Avatar>
        {user_avatar ? (
          <NoCacheNextImage
            cacheKey={timestamp}
            src={user_avatar}
            width={40}
            height={40}
            alt={user_firstname}
          />
        ) : (
          user_firstname[0]
        )}
      </Avatar>
      <h2 className={styles.userName}>{`${user_firstname} ${user_lastname}`}</h2>
      {is_superuser && <AdminPanelSettingsIcon color="primary" />}
      <div className={styles.settings}>
        <Settings />
      </div>
    </div>
  )
}
