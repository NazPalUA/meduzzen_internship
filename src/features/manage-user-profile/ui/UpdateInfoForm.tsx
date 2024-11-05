"use client"

import { useAppDispatch } from "@/src/shared/store"
import { useSession } from "@entities/session"
import {
  type UpdateUserInfoCredentials,
  updateUserInfoCredentialsSchema,
  useUpdateUserInfoMutation,
} from "@entities/user"
import { useTranslations } from "next-intl"
import { closeModal, showSnackbar } from "../store/settingsSlice"
import { UpdateForm } from "./UpdateForm"

export function UpdateInfoForm() {
  const [updateUserInfo, { isLoading, isError }] = useUpdateUserInfoMutation()
  const { user } = useSession()
  const t = useTranslations("UpdateUserInfo")
  const dispatch = useAppDispatch()

  if (!user) {
    dispatch(showSnackbar({ message: t("updateError"), error: true }))
    return
  }

  const defaultValues: UpdateUserInfoCredentials = {
    user_firstname: user.user_firstname,
    user_lastname: user.user_lastname,
    user_status: user.user_status || "",
    user_city: user.user_city || "",
    user_phone: user.user_phone || "",
    user_links: user.user_links || [""],
  }

  const schema = updateUserInfoCredentialsSchema(t)

  const onSubmit = async (data: UpdateUserInfoCredentials) => {
    try {
      await updateUserInfo({ userId: user.user_id.toString(), userInfo: data }).unwrap()
      dispatch(showSnackbar({ message: t("updateSuccess"), error: false }))
      dispatch(closeModal())
    } catch {
      dispatch(showSnackbar({ message: t("updateError"), error: true }))
    }
  }

  return (
    <UpdateForm<UpdateUserInfoCredentials>
      schema={schema}
      onSubmit={onSubmit}
      isError={isError}
      error={isError ? t("serverErrorGeneral") : null}
      defaultValues={defaultValues}
      title={t("title")}
      submitText={t("submitText")}
      isLoading={isLoading}
      fields={[
        {
          name: "user_firstname",
          label: t("firstnameLabel"),
          type: "text",
        },
        {
          name: "user_lastname",
          label: t("lastnameLabel"),
          type: "text",
        },
        {
          name: "user_status",
          label: t("statusLabel"),
          type: "text",
        },
        {
          name: "user_city",
          label: t("cityLabel"),
          type: "text",
        },
        {
          name: "user_phone",
          label: t("phoneLabel"),
          type: "text",
        },
        {
          name: "user_links",
          label: t("linksLabel"),
          type: "array",
        },
      ]}
    />
  )
}
