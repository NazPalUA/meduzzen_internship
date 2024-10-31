"use client"

import { LoginCredentialsSchema, useLoginMutation, type LoginCredentials } from "@entities/session"
import { useRouter } from "@navigation"
import { Routes } from "@shared/constants/routes"
import { AuthForm } from "./AuthForm"

export function LoginForm() {
  const [login, { isLoading, isError, error }] = useLoginMutation()
  const router = useRouter()

  const onSubmit = async (data: LoginCredentials) => {
    await login(data).unwrap()
    router.push(Routes.DASHBOARD)
  }

  return (
    <AuthForm<LoginCredentials>
      schema={LoginCredentialsSchema}
      onSubmit={onSubmit}
      fields={[
        {
          name: "user_email",
          label: "Email Address",
          type: "email",
          autoComplete: "email",
        },
        {
          name: "user_password",
          label: "Password",
          type: "password",
          autoComplete: "current-password",
        },
      ]}
      title="Sign in to your account"
      submitText="Sign In"
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  )
}
