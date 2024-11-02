"use client"

import { loginCredentialsSchema, useLoginMutation, type LoginCredentials } from "@entities/session"
import { useRouter } from "@navigation"
import { Routes } from "@shared/constants/routes"
import { useTranslations } from "next-intl"
import { AuthForm } from "./AuthForm"

export function LoginForm() {
  const [login, { isLoading, isError, error }] = useLoginMutation()
  const router = useRouter()
  const t = useTranslations("Login")

  const schema = loginCredentialsSchema(t)

  const onSubmit = async (data: LoginCredentials) => {
    await login(data).unwrap()
    router.push(Routes.DASHBOARD)
  }

  return (
    <AuthForm<LoginCredentials>
      schema={schema}
      onSubmit={onSubmit}
      fields={[
        {
          name: "user_email",
          label: t("emailLabel"),
          type: "email",
          autoComplete: "email",
        },
        {
          name: "user_password",
          label: t("passwordLabel"),
          type: "password",
          autoComplete: "current-password",
        },
      ]}
      title={t("title")}
      submitText={t("submitText")}
      isLoading={isLoading}
      isError={isError}
      error={error instanceof Error ? error.message : "An error occurred during login."}
    />
  )
}
