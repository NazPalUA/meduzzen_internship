"use client"

import { useSession } from "@entities/session"
import {
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Lock as LockIcon,
} from "@mui/icons-material"
import { SettingsMenu, type MenuItem } from "@shared/components/SettingsMenu"
import { ContentDialog } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { DeleteModal } from "./DeleteModal"
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
      content: (
        <ContentDialog>
          <UpdateInfoForm user={currentUser} />
        </ContentDialog>
      ),
    },
    {
      text: t("updateAvatar"),
      icon: <AccountCircleIcon fontSize="small" />,
      content: (
        <ContentDialog title={t("updateAvatar")}>
          <UpdateAvatarForm user={currentUser} />
        </ContentDialog>
      ),
    },
    {
      text: t("changePassword"),
      icon: <LockIcon fontSize="small" />,
      content: (
        <ContentDialog>
          <UpdatePasswordForm user={currentUser} />
        </ContentDialog>
      ),
    },
    {
      text: t("deleteAccount"),
      icon: <DeleteIcon fontSize="small" />,
      content: <DeleteModal user={currentUser} />,
    },
  ]

  return <SettingsMenu menuItems={menuItems} />
}
