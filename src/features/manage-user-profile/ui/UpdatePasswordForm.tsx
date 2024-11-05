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

  const tPassword = useTranslations("UpdateUser.password")
  const tValidation = useTranslations("Validation")
  const tError = useTranslations("Error")

  const schema = updateUserPasswordCredentialsSchema(tValidation)

  const onSubmit = async (data: UpdateUserPasswordCredentials) => {
    try {
      await updatePassword({ userId: user.user_id.toString(), passwordInfo: data }).unwrap()
      toastSuccess(tPassword("result.success"))
      closeModal()
    } catch {
      toastError(tPassword("result.error"))
    }
  }

  return (
    <>
      <UpdateForm<UpdateUserPasswordCredentials>
        schema={schema}
        onSubmit={onSubmit}
        isError={isError}
        error={isError ? tError("default") : null}
        title={tPassword("title")}
        submitText={tPassword("submitText")}
        isLoading={isLoading}
        fields={[
          {
            name: "user_password",
            label: tPassword("labels.password"),
            type: "password",
          },
          {
            name: "user_password_repeat",
            label: tPassword("labels.confirmPassword"),
            type: "password",
          },
        ]}
      />
    </>
  )
}
