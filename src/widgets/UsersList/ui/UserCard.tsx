import { type SingleUser } from "@entities/user"
import { Avatar } from "@mui/material"
import { Link } from "@navigation"
import { Routes } from "@shared/constants"
import Image from "next/image"
import styles from "./UserCard.module.scss"

export function UserCard({ user }: { user: SingleUser }) {
  const { user_firstname, user_lastname, user_email, user_avatar, user_id } = user
  return (
    <Link href={`${Routes.USERS}/${user_id}`} className={styles.container}>
      <Avatar>
        {user_avatar ? (
          <Image src={user_avatar} fill sizes="40px" alt={user_firstname} />
        ) : (
          user_firstname[0]
        )}
      </Avatar>
      <div className={styles.details}>
        <strong className={styles.name}>{`${user_firstname} ${user_lastname}`}</strong>
        <div className={styles.email}>{user_email}</div>
      </div>
    </Link>
  )
}
