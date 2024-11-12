"use client"

import { CurrentUser, useLogoutMutation } from "@entities/session"
import { useDeleteUserMutation } from "@entities/user"
import { useRouter } from "@navigation"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { Routes } from "@shared/constants"
import { useTranslations } from "next-intl"

export function DeleteModal({ user }: { user: CurrentUser }) {
  const t = useTranslations("DeleteUser")
  const [logout] = useLogoutMutation()
  const [deleteUser] = useDeleteUserMutation()
  const router = useRouter()

  return (
    <ConfirmActionModal
      confirmAction={{
        onAction: () => deleteUser(user.user_id.toString()).unwrap(),
        successMessage: t("result.success"),
        errorMessage: t("result.error"),
        onSuccess: async () => {
          await logout().unwrap()
          router.push(Routes.LOGIN)
        },
        buttonProps: {
          children: t("submitText"),
          color: "error",
        },
      }}
      cancelAction={{
        buttonProps: {
          children: t("rejectText"),
          color: "primary",
        },
      }}
      message={t("confirmDelete")}
      title={t("title")}
    />
  )
}
