"use client"

import { CurrentUser } from "@entities/session"
import {
  updateUserPasswordCredentialsSchema,
  useUpdateUserPasswordMutation,
  type UpdateUserPasswordCredentials,
} from "@entities/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { getForm } from "@shared/components/Form"
import { useDialog, useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import styles from "./Styles.module.scss"

export function UpdatePasswordForm({ user }: { user: CurrentUser }) {
  const [updatePassword, { isError }] = useUpdateUserPasswordMutation()

  const { toastError, toastSuccess } = useToaster()
  const { closeDialog } = useDialog()

  const t = useTranslations()

  const schema = updateUserPasswordCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: UpdateUserPasswordCredentials) => {
    try {
      await updatePassword({ userId: user.user_id, passwordInfo: data }).unwrap()
      toastSuccess(t("UpdateUser.password.result.success"))
      closeDialog()
    } catch {
      toastError(t("UpdateUser.password.result.error"))
    }
  }

  const Form = getForm<UpdateUserPasswordCredentials>()

  const form = useForm<UpdateUserPasswordCredentials>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_password: "",
      user_password_repeat: "",
    },
  })

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      title={t("UpdateUser.password.title")}
      className={styles["update-form"]}
    >
      <Form.TextField
        name="user_password"
        label={t("UpdateUser.password.labels.password")}
        type="password"
      />
      <Form.TextField
        name="user_password_repeat"
        label={t("UpdateUser.password.labels.confirmPassword")}
        type="password"
      />
      <Form.SubmitButton text={t("UpdateUser.password.submitText")} />
      <Form.ErrorMessage text={isError ? t("Error.default") : null} />
    </Form>
  )
}
