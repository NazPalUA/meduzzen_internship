"use client"

import { CurrentUser } from "@entities/session"
import {
  type UpdateUserInfoCredentials,
  updateUserInfoCredentialsSchema,
  useUpdateUserInfoMutation,
} from "@entities/user"
import { useOverlays } from "@shared/overlays"
import { useTranslations } from "next-intl"
import { UpdateForm } from "./UpdateForm"

export function UpdateInfoForm({ user }: { user: CurrentUser }) {
  const [updateUserInfo, { isLoading, isError }] = useUpdateUserInfoMutation()

  const tInfo = useTranslations("UpdateUser.info")
  const tValidation = useTranslations("Validation")
  const tError = useTranslations("Error")

  const { toastError, toastSuccess, closeModal } = useOverlays()

  const defaultValues: UpdateUserInfoCredentials = {
    user_firstname: user.user_firstname,
    user_lastname: user.user_lastname,
    user_status: user.user_status || "",
    user_city: user.user_city || "",
    user_phone: user.user_phone || "",
    user_links: user.user_links || [""],
  }

  const schema = updateUserInfoCredentialsSchema(tValidation)

  const onSubmit = async (data: UpdateUserInfoCredentials) => {
    try {
      await updateUserInfo({ userId: user.user_id.toString(), userInfo: data }).unwrap()
      toastSuccess(tInfo("result.success"))
      closeModal()
    } catch {
      toastError(tInfo("result.error"))
    }
  }

  return (
    <UpdateForm<UpdateUserInfoCredentials>
      schema={schema}
      onSubmit={onSubmit}
      isError={isError}
      error={isError ? tError("default") : null}
      defaultValues={defaultValues}
      title={tInfo("title")}
      submitText={tInfo("submitText")}
      isLoading={isLoading}
      fields={[
        {
          name: "user_firstname",
          label: tInfo("labels.firstName"),
          type: "text",
        },
        {
          name: "user_lastname",
          label: tInfo("labels.lastName"),
          type: "text",
        },
        {
          name: "user_status",
          label: tInfo("labels.status"),
          type: "text",
        },
        {
          name: "user_city",
          label: tInfo("labels.city"),
          type: "text",
        },
        {
          name: "user_phone",
          label: tInfo("labels.phone"),
          type: "text",
        },
        {
          name: "user_links",
          label: tInfo("labels.links"),
          type: "array",
        },
      ]}
    />
  )
}
