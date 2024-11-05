"use client"

import { loginCredentialsSchema, useLoginMutation, type LoginCredentials } from "@entities/session"
import { useRouter } from "@navigation"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { Routes } from "@shared/constants/routes"
import { useTranslations } from "next-intl"
import { AuthForm } from "./AuthForm"

export function LoginForm() {
  const [login, { isLoading, isError, error }] = useLoginMutation()
  const router = useRouter()
  const tLogin = useTranslations("Login")
  const tError = useTranslations("Error")
  const tValidation = useTranslations("Validation")

  const schema = loginCredentialsSchema(tValidation)

  const onSubmit = async (data: LoginCredentials) => {
    await login(data).unwrap()
    router.push(Routes.DASHBOARD)
  }

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (!error) return null

    if ("status" in error && error.status === 401) {
      return tError("invalidCredentials")
    }

    return tError("default")
  }

  return (
    <AuthForm<LoginCredentials>
      schema={schema}
      onSubmit={onSubmit}
      fields={[
        {
          name: "user_email",
          label: tLogin("labels.email"),
          type: "email",
          autoComplete: "email",
        },
        {
          name: "user_password",
          label: tLogin("labels.password"),
          type: "password",
          autoComplete: "current-password",
        },
      ]}
      title={tLogin("title")}
      submitText={tLogin("submitText")}
      isLoading={isLoading}
      isError={isError}
      error={getErrorMessage(error)}
    />
  )
}
