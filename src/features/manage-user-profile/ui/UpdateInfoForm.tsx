"use client"

import { CurrentUser } from "@entities/session"
import {
  type UpdateUserInfoCredentials,
  updateUserInfoCredentialsSchema,
  useUpdateUserInfoMutation,
} from "@entities/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { getForm } from "@shared/components/Form"
import { useOverlays } from "@shared/overlays"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import styles from "./Styles.module.scss"

export function UpdateInfoForm({ user }: { user: CurrentUser }) {
  const [updateUserInfo, { isError }] = useUpdateUserInfoMutation()

  const t = useTranslations()

  const { toastError, toastSuccess, closeModal } = useOverlays()

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

  const Form = getForm<UpdateUserInfoCredentials>()

  const form = useForm<UpdateUserInfoCredentials>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_firstname: user.user_firstname,
      user_lastname: user.user_lastname,
      user_status: user.user_status || "",
      user_city: user.user_city || "",
      user_phone: user.user_phone || "",
      user_links: user.user_links || [""],
    },
  })

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      title={t("UpdateUser.info.title")}
      className={styles["update-form"]}
    >
      <Form.TextField name="user_firstname" label={t("UpdateUser.info.labels.firstName")} />
      <Form.TextField name="user_lastname" label={t("UpdateUser.info.labels.lastName")} />
      <Form.TextField name="user_status" label={t("UpdateUser.info.labels.status")} />
      <Form.TextField name="user_city" label={t("UpdateUser.info.labels.city")} />
      <Form.TextField name="user_phone" label={t("UpdateUser.info.labels.phone")} />
      <Form.ArrayField
        name="user_links"
        label={t("UpdateUser.info.labels.links")}
        itemLabel={t("UpdateUser.info.labels.links")}
      />
      <Form.SubmitButton text={t("UpdateUser.info.submitText")} />
      <Form.ErrorMessage text={isError ? t("Error.default") : null} />
    </Form>
  )
}
