"use client"

import { useSession } from "@entities/session"
import { Check as CheckIcon, Notifications as NotificationsIcon } from "@mui/icons-material"
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useToaster } from "@shared/hooks"
import clsx from "clsx"
import { formatDistanceToNow } from "date-fns"
import { useTranslations } from "next-intl"
import {
  useGetNotificationsListQuery,
  useMarkNotificationAsReadMutation,
} from "../api/notificationsApi"
import styles from "./Styles.module.scss"

export function Notifications() {
  const { user } = useSession()
  const userId = user?.user_id

  const {
    data: notifications,
    isLoading,
    isError,
  } = useGetNotificationsListQuery(userId!, {
    pollingInterval: 30000,
    skip: !userId,
  })
  const [markAsRead] = useMarkNotificationAsReadMutation()

  const { toastError, toastSuccess } = useToaster()
  const t = useTranslations("Notifications")

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markAsRead({ userId: userId!, notificationId }).unwrap()
      toastSuccess(t("markReadSuccess"))
    } catch {
      toastError(t("markReadError"))
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={t("errorFetching")} />
  }

  if (!notifications?.length) {
    return (
      <div className={styles.emptyState}>
        <NotificationsIcon fontSize="large" color="disabled" />
        <p className={styles.emptyTitle}>{t("noNotifications")}</p>
      </div>
    )
  }

  const sortedNotifications = notifications
    ? [...notifications].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
    : []

  return (
    <List>
      {sortedNotifications?.map((notification) => (
        <ListItem
          key={notification.notification_id}
          className={clsx(styles.notificationItem, notification.is_read && styles.read)}
          secondaryAction={
            !notification.is_read && (
              <IconButton
                edge="end"
                aria-label={t("markAsRead")}
                onClick={() => handleMarkAsRead(notification.notification_id)}
              >
                <CheckIcon />
              </IconButton>
            )
          }
        >
          <ListItemIcon>
            {notification.is_read ? (
              <NotificationsNoneOutlinedIcon color="inherit" fontSize="large" />
            ) : (
              <NotificationsActiveOutlinedIcon
                color="inherit"
                fontSize="large"
                className={styles.animatedIcon}
              />
            )}
          </ListItemIcon>

          <ListItemText
            primary={
              <span className={clsx(styles.title, notification.is_read && styles.read)}>
                {notification.notification_title}
              </span>
            }
            secondary={
              <div className={styles.secondaryContent}>
                <p>{notification.notification_message}</p>
                <span>
                  {formatDistanceToNow(new Date(notification.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
