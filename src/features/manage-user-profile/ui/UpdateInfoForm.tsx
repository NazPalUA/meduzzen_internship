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

  const t = useTranslations()

  const { toastError, toastSuccess, closeModal } = useOverlays()

  const defaultValues: UpdateUserInfoCredentials = {
    user_firstname: user.user_firstname,
    user_lastname: user.user_lastname,
    user_status: user.user_status || "",
    user_city: user.user_city || "",
    user_phone: user.user_phone || "",
    user_links: user.user_links || [""],
  }

  const schema = updateUserInfoCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: UpdateUserInfoCredentials) => {
    try {
      await updateUserInfo({ userId: user.user_id.toString(), userInfo: data }).unwrap()
      toastSuccess(t("UpdateUser.info.result.success"))
      closeModal()
    } catch {
      toastError(t("UpdateUser.info.result.error"))
    }
  }

  return (
    <UpdateForm<UpdateUserInfoCredentials>
      schema={schema}
      onSubmit={onSubmit}
      isError={isError}
      error={isError ? t("Error.default") : null}
      defaultValues={defaultValues}
      title={t("UpdateUser.info.title")}
      submitText={t("UpdateUser.info.submitText")}
      isLoading={isLoading}
      fields={[
        {
          name: "user_firstname",
          label: t("UpdateUser.info.labels.firstName"),
          type: "text",
        },
        {
          name: "user_lastname",
          label: t("UpdateUser.info.labels.lastName"),
          type: "text",
        },
        {
          name: "user_status",
          label: t("UpdateUser.info.labels.status"),
          type: "text",
        },
        {
          name: "user_city",
          label: t("UpdateUser.info.labels.city"),
          type: "text",
        },
        {
          name: "user_phone",
          label: t("UpdateUser.info.labels.phone"),
          type: "text",
        },
        {
          name: "user_links",
          label: t("UpdateUser.info.labels.links"),
          type: "array",
        },
      ]}
    />
  )
}
