"use client"

import { loginCredentialsSchema, useLoginMutation, type LoginCredentials } from "@entities/session"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@navigation"
import { getForm } from "@shared/components/Form"
import { Routes } from "@shared/constants"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import styles from "./Form.module.scss"

export function LoginForm() {
  const [login, { isError, error }] = useLoginMutation()
  const router = useRouter()
  const t = useTranslations()

  const schema = loginCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: LoginCredentials) => {
    await login(data).unwrap()
    router.push(Routes.DASHBOARD)
  }

  const errorMessage = isError
    ? "status" in error && error.status === 401
      ? t("Error.invalidCredentials")
      : t("Error.default")
    : null

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_email: "",
      user_password: "",
    },
  })

  const Form = getForm<LoginCredentials>()

  return (
    <Form form={form} onSubmit={onSubmit} title={t("Login.title")} className={styles.form}>
      <Form.TextField name="user_email" label={t("Login.labels.email")} type="email" />
      <Form.TextField name="user_password" label={t("Login.labels.password")} type="password" />
      <Form.SubmitButton text={t("Login.submitText")} />
      <Form.ErrorMessage text={errorMessage} />
    </Form>
  )
}
