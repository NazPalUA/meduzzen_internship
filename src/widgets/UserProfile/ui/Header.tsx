import { type UserDetails } from "@entities/user"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import { Avatar } from "@mui/material"
import Image from "next/image"
import styles from "./Header.module.scss"

export function Header({
  user_firstname,
  user_lastname,
  is_superuser,
  user_avatar,
}: Pick<UserDetails, "user_firstname" | "user_lastname" | "is_superuser" | "user_avatar">) {
  return (
    <div className={styles.header}>
      <Avatar>
        {user_avatar ? (
          <Image src={user_avatar} fill sizes="40px" alt={user_firstname} />
        ) : (
          user_firstname[0]
        )}
      </Avatar>
      <h2 className={styles.userName}>{`${user_firstname} ${user_lastname}`}</h2>
      {is_superuser && <AdminPanelSettingsIcon color="primary" />}
    </div>
  )
}
