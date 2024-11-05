"use client"

import { Routes } from "@/src/shared/constants/routes"
import { useAppDispatch } from "@/src/shared/store"
import { useLogoutMutation, useSession } from "@entities/session"
import { useDeleteUserMutation } from "@entities/user"
import { Button, CircularProgress } from "@mui/material"
import { useRouter } from "@navigation"
import { useTranslations } from "next-intl"
import { closeModal, showSnackbar } from "../store/settingsSlice"
import styles from "./Form.module.scss"

export function DeleteUserForm() {
  const t = useTranslations("DeleteUser")
  const { user, isLoading } = useSession()
  const [logout] = useLogoutMutation()
  const [deleteUser] = useDeleteUserMutation()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
    if (!user) {
      dispatch(showSnackbar({ message: t("deleteError"), error: true }))
      return
    }

    try {
      await deleteUser(user.user_id.toString()).unwrap()
      dispatch(showSnackbar({ message: t("deleteSuccess"), error: false }))
      dispatch(closeModal())
      await logout().unwrap()
      router.push(Routes.LOGIN)
    } catch {
      dispatch(showSnackbar({ message: t("deleteError"), error: true }))
    }
  }

  return (
    <div>
      <p>{t("confirmDelete")}</p>
      <div className={styles.buttonGroup}>
        <Button variant="contained" color="error" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : t("deleteButton")}
        </Button>
        <Button variant="outlined" onClick={() => dispatch(closeModal())} disabled={isLoading}>
          {t("closeButton")}
        </Button>
      </div>
    </div>
  )
}
