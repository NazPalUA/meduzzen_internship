"use client"

import { useSession } from "@entities/session"
import { Notifications as NotificationsIcon } from "@mui/icons-material"
import { Badge, Fab } from "@mui/material"
import { ContentDialog } from "@shared/components/ui"
import { useDialog } from "@shared/hooks"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useGetNotificationsListQuery } from "../api/notificationsApi"
import { Notifications } from "./Notifications"
import styles from "./Styles.module.scss"

export function ShowNotifications() {
  const { user } = useSession()
  const userId = user?.user_id
  const t = useTranslations("Notifications")

  const { data: notifications } = useGetNotificationsListQuery(userId!, {
    pollingInterval: 30000,
    skip: !userId,
  })

  const { openDialog } = useDialog()

  const newNotifications = notifications?.filter((notification) => !notification.is_read)

  if (!userId) {
    return null
  }

  return (
    <Fab
      size="small"
      className={styles.showNotifications}
      onClick={() =>
        openDialog(
          <ContentDialog title={t("title")}>
            <Notifications />
          </ContentDialog>,
          {
            maxWidth: "xs",
          },
        )
      }
      aria-label={t("showNotifications")}
    >
      <Badge badgeContent={newNotifications?.length} color="primary">
        <NotificationsIcon className={clsx(newNotifications?.length && styles.animatedIcon)} />
      </Badge>
    </Fab>
  )
}
