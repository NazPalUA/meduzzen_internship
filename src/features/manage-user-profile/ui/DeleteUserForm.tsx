"use client"

import { CurrentUser, useLogoutMutation } from "@entities/session"
import { useDeleteUserMutation } from "@entities/user"
import { Button, CircularProgress } from "@mui/material"
import { useRouter } from "@navigation"
import { Routes } from "@shared/constants/routes"
import { useOverlays } from "@shared/overlays"
import { useTranslations } from "next-intl"
import styles from "./Form.module.scss"

export function DeleteUserForm({ user }: { user: CurrentUser }) {
  const t = useTranslations("DeleteUser")
  const [logout] = useLogoutMutation()
  const [deleteUser, { isLoading }] = useDeleteUserMutation()
  const router = useRouter()

  const { toastError, toastSuccess, closeModal } = useOverlays()

  const handleDelete = async () => {
    try {
      await deleteUser(user.user_id.toString()).unwrap()
      toastSuccess(t("result.success"))
      closeModal()
      await logout().unwrap()
      router.push(Routes.LOGIN)
    } catch {
      toastError(t("result.error"))
    }
  }

  return (
    <div>
      <p>{t("confirmDelete")}</p>
      <div className={styles.buttonGroup}>
        <Button variant="contained" color="error" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : t("submitText")}
        </Button>
        <Button variant="outlined" onClick={closeModal} disabled={isLoading}>
          {t("rejectText")}
        </Button>
      </div>
    </div>
  )
}
