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

  const t = useTranslations("CreateUser")
  const tValidation = useTranslations("Validation")

  const schema = createUserCredentialsSchema(tValidation)

  const onSubmit = async (data: CreateUserCredentials) => {
    await createUser(data).unwrap()
    router.push(Routes.LOGIN)
  }

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (!error) return null

    if ("status" in error && error.status === 400) {
      return t("serverErrorEmailAlreadyExists")
    }

    return t("serverErrorGeneral")
  }

  return (
    <AuthForm<CreateUserCredentials>
      schema={schema}
      onSubmit={onSubmit}
      fields={[
        {
          name: "user_firstname",
          label: t("firstNameLabel"),
          type: "text",
        },
        {
          name: "user_lastname",
          label: t("lastNameLabel"),
          type: "text",
        },
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
        },
        {
          name: "user_password_repeat",
          label: t("confirmPasswordLabel"),
          type: "password",
        },
      ]}
      title={t("title")}
      submitText={t("submitText")}
      isLoading={isLoading}
      isError={isError}
      error={getErrorMessage(error)}
    />
  )
}
