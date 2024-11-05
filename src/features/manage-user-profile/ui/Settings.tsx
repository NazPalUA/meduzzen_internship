"use client"

import { useSession } from "@entities/session"
import { ModalType } from "@shared/overlays"
import { ModalWindow } from "@shared/overlays/ui/ModalWindow"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { ReactNode } from "react"
import { DeleteUserForm } from "./DeleteUserForm"
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

  const dialogWindows: { title: string; modal: ModalType; component: ReactNode }[] = [
    { title: t("updateInfo"), modal: "info", component: <UpdateInfoForm user={currentUser} /> },
    {
      title: t("updateAvatar"),
      modal: "avatar",
      component: <UpdateAvatarForm user={currentUser} />,
    },
    {
      title: t("changePassword"),
      modal: "password",
      component: <UpdatePasswordForm user={currentUser} />,
    },
    {
      title: t("deleteAccount"),
      modal: "delete",
      component: <DeleteUserForm user={currentUser} />,
    },
  ]

  return (
    <div className={styles.container}>
      <SettingsMenu />

      {dialogWindows.map((dialog) => (
        <ModalWindow key={dialog.modal} title={dialog.title} modal={dialog.modal}>
          {dialog.component}
        </ModalWindow>
      ))}
    </div>
  )
}
