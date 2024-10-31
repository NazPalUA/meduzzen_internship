"use client"

import { useSession } from "@/src/entities/session"
import { CurrentUser } from "./CurrentUser"
import styles from "./Dashboard.module.scss"

export function Dashboard() {
  const { user, isLoading, isError, error } = useSession()

  if (isLoading) return <div className={styles.loading}>Loading...</div>
  if (isError) return <div className={styles.error}>Error: {`${error}`}</div>
  if (!user) return <div className={styles.noUser}>No user information available.</div>
  return <CurrentUser user={user} />
}
