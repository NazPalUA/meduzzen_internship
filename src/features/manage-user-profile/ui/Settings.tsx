"use client"

import { useSession } from "@entities/session"
import {
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Lock as LockIcon,
} from "@mui/icons-material"
import { SettingsMenu, type MenuItem } from "@shared/ui/SettingsMenu"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { DeleteUserForm } from "./DeleteUserForm"
import styles from "./Styles.module.scss"
import { UpdateAvatarForm } from "./UpdateAvatarForm"
import { UpdateInfoForm } from "./UpdateInfoForm"
import { UpdatePasswordForm } from "./UpdatePasswordForm"

export function Settings() {
  const t = useTranslations("Settings")
  const { user: currentUser } = useSession()
  const params = useParams()

  const profileUserId = params.userId

  if (!currentUser || currentUser.user_id.toString() !== profileUserId) {
    return null
  }

  const menuItems: MenuItem[] = [
    {
      text: t("updateInfo"),
      icon: <EditIcon fontSize="small" />,
      modalWindow: "updateUserInfo",
      modalTitle: t("updateInfo"),
      content: <UpdateInfoForm user={currentUser} />,
    },
    {
      text: t("updateAvatar"),
      icon: <AccountCircleIcon fontSize="small" />,
      modalWindow: "updateUserAvatar",
      modalTitle: t("updateAvatar"),
      content: <UpdateAvatarForm user={currentUser} />,
    },
    {
      text: t("changePassword"),
      icon: <LockIcon fontSize="small" />,
      modalWindow: "updateUserPassword",
      modalTitle: t("changePassword"),
      content: <UpdatePasswordForm user={currentUser} />,
    },
    {
      text: t("deleteAccount"),
      icon: <DeleteIcon fontSize="small" />,
      modalWindow: "deleteUser",
      modalTitle: t("deleteAccount"),
      content: <DeleteUserForm user={currentUser} />,
    },
  ]

  return (
    <div className={styles.container}>
      <SettingsMenu menuItems={menuItems} />
    </div>
  )
}
