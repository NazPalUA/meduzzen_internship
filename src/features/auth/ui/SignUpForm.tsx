"use client"

import {
  createUserCredentialsSchema,
  useCreateUserMutation,
  type CreateUserCredentials,
} from "@entities/user"
import { useRouter } from "@navigation"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { Routes } from "@shared/constants/routes"
import { useTranslations } from "next-intl"
import { AuthForm } from "./AuthForm"

export function SignUpForm() {
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation()
  const router = useRouter()

  const t = useTranslations()

  const schema = createUserCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: CreateUserCredentials) => {
    await createUser(data).unwrap()
    router.push(Routes.LOGIN)
  }

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (!error) return null

    if ("status" in error && error.status === 400) {
      return t("Error.emailAlreadyExists")
    }

    return t("Error.default")
  }

  return (
    <AuthForm<CreateUserCredentials>
      schema={schema}
      onSubmit={onSubmit}
      fields={[
        {
          name: "user_firstname",
          label: t("CreateUser.labels.firstName"),
          type: "text",
        },
        {
          name: "user_lastname",
          label: t("CreateUser.labels.lastName"),
          type: "text",
        },
        {
          name: "user_email",
          label: t("CreateUser.labels.email"),
          type: "email",
          autoComplete: "email",
        },
        {
          name: "user_password",
          label: t("CreateUser.labels.password"),
          type: "password",
        },
        {
          name: "user_password_repeat",
          label: t("CreateUser.labels.confirmPassword"),
          type: "password",
        },
      ]}
      title={t("CreateUser.title")}
      submitText={t("CreateUser.submitText")}
      isLoading={isLoading}
      isError={isError}
      error={getErrorMessage(error)}
    />
  )
}
