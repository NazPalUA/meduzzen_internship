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

  const tPassword = useTranslations("UpdateUser.password")
  const tValidation = useTranslations("Validation")
  const tError = useTranslations("Error")

  const schema = updateUserPasswordCredentialsSchema(tValidation)

  const onSubmit = async (data: UpdateUserPasswordCredentials) => {
    if (!user) {
      dispatch(showSnackbar({ message: tPassword("result.error"), error: true }))
      return
    }
    try {
      await updatePassword({ userId: user.user_id.toString(), passwordInfo: data }).unwrap()
      dispatch(showSnackbar({ message: tPassword("result.success"), error: false }))
      dispatch(closeModal())
    } catch {
      dispatch(showSnackbar({ message: tPassword("result.error"), error: true }))
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
