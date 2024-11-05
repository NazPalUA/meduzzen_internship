"use client"

import { useSession } from "@entities/session"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { DeleteUserForm } from "./DeleteUserForm"
import { DialogContainer } from "./DialogContainer"
import { Feedback } from "./Feedback"
import styles from "./Settings.module.scss"
import { SettingsMenu } from "./SettingsMenu"
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

  const dialogWindows = [
    { title: t("updateInfo"), modal: "info" as const, component: <UpdateInfoForm /> },
    { title: t("updateAvatar"), modal: "avatar" as const, component: <UpdateAvatarForm /> },
    { title: t("changePassword"), modal: "password" as const, component: <UpdatePasswordForm /> },
    { title: t("deleteAccount"), modal: "delete" as const, component: <DeleteUserForm /> },
  ]

  return (
    <div className={styles.container}>
      <SettingsMenu />

      {dialogWindows.map((dialog) => (
        <DialogContainer key={dialog.modal} title={dialog.title} modal={dialog.modal}>
          {dialog.component}
        </DialogContainer>
      ))}

      <Feedback />
    </div>
  )
}
