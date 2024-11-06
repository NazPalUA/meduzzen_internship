"use client"

import { CurrentUser } from "@entities/session"
import {
  updateUserPasswordCredentialsSchema,
  useUpdateUserPasswordMutation,
  type UpdateUserPasswordCredentials,
} from "@entities/user"
import { useOverlays } from "@shared/overlays"
import { useTranslations } from "next-intl"
import { UpdateForm } from "./UpdateForm"

export function UpdatePasswordForm({ user }: { user: CurrentUser }) {
  const [updatePassword, { isLoading, isError }] = useUpdateUserPasswordMutation()

  const { toastError, toastSuccess, closeModal } = useOverlays()

  const t = useTranslations()

  const schema = updateUserPasswordCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: UpdateUserPasswordCredentials) => {
    try {
      await updatePassword({ userId: user.user_id.toString(), passwordInfo: data }).unwrap()
      toastSuccess(t("UpdateUser.password.result.success"))
      closeModal()
    } catch {
      toastError(t("UpdateUser.password.result.error"))
    }
  }

  return (
    <>
      <UpdateForm<UpdateUserPasswordCredentials>
        schema={schema}
        onSubmit={onSubmit}
        isError={isError}
        error={isError ? t("Error.default") : null}
        title={t("UpdateUser.password.title")}
        submitText={t("UpdateUser.password.submitText")}
        isLoading={isLoading}
        fields={[
          {
            name: "user_password",
            label: t("UpdateUser.password.labels.password"),
            type: "password",
          },
          {
            name: "user_password_repeat",
            label: t("UpdateUser.password.labels.confirmPassword"),
            type: "password",
          },
        ]}
      />
    </>
  )
}
