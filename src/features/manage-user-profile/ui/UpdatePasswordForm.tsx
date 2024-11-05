"use client"

import { useAppDispatch } from "@/src/shared/store"
import { useSession } from "@entities/session"
import {
  updateUserPasswordCredentialsSchema,
  useUpdateUserPasswordMutation,
  type UpdateUserPasswordCredentials,
} from "@entities/user"
import { useTranslations } from "next-intl"
import { closeModal, showSnackbar } from "../store/settingsSlice"
import { UpdateForm } from "./UpdateForm"

export function UpdatePasswordForm() {
  const [updatePassword, { isLoading, isError }] = useUpdateUserPasswordMutation()
  const { user } = useSession()
  const dispatch = useAppDispatch()
  const t = useTranslations("UpdateUserPassword")
  const schema = updateUserPasswordCredentialsSchema(t)

  const onSubmit = async (data: UpdateUserPasswordCredentials) => {
    if (!user) {
      dispatch(showSnackbar({ message: t("updateError"), error: true }))
      return
    }
    try {
      await updatePassword({ userId: user.user_id.toString(), passwordInfo: data }).unwrap()
      dispatch(showSnackbar({ message: t("updateSuccess"), error: false }))
      dispatch(closeModal())
    } catch {
      dispatch(showSnackbar({ message: t("updateError"), error: true }))
    }
  }

  return (
    <>
      <UpdateForm<UpdateUserPasswordCredentials>
        schema={schema}
        onSubmit={onSubmit}
        isError={isError}
        error={isError ? t("serverErrorGeneral") : null}
        title={t("title")}
        submitText={t("submitText")}
        isLoading={isLoading}
        fields={[
          {
            name: "user_password",
            label: t("passwordLabel"),
            type: "password",
          },
          {
            name: "user_password_repeat",
            label: t("confirmPasswordLabel"),
            type: "password",
          },
        ]}
      />
    </>
  )
}
