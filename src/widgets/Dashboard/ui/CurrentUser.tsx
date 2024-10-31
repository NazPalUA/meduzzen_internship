import { type CurrentUser } from "@/src/entities/session"
import { useTranslations } from "next-intl"
import styles from "./CurrentUser.module.scss"

export function CurrentUser({ user }: { user: CurrentUser }) {
  const t = useTranslations("DashboardPage")

  return (
    <div className={styles.currentUserContainer}>
      <h3 className={styles.heading}>{t("currentUser")}</h3>
      <div className={styles.userInfo}>
        <UserField label="Email" value={user.user_email} />
        <UserField label="First Name" value={user.user_firstname} />
        <UserField label="Last Name" value={user.user_lastname} />
      </div>
    </div>
  )
}

function UserField({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.userField}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}
