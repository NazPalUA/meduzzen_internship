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

  const tCreateUser = useTranslations("CreateUser")
  const tValidation = useTranslations("Validation")
  const tError = useTranslations("Error")

  const schema = createUserCredentialsSchema(tValidation)

  const onSubmit = async (data: CreateUserCredentials) => {
    await createUser(data).unwrap()
    router.push(Routes.LOGIN)
  }

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (!error) return null

    if ("status" in error && error.status === 400) {
      return tError("emailAlreadyExists")
    }

    return tError("default")
  }

  return (
    <AuthForm<CreateUserCredentials>
      schema={schema}
      onSubmit={onSubmit}
      fields={[
        {
          name: "user_firstname",
          label: tCreateUser("labels.firstName"),
          type: "text",
        },
        {
          name: "user_lastname",
          label: tCreateUser("labels.lastName"),
          type: "text",
        },
        {
          name: "user_email",
          label: tCreateUser("labels.email"),
          type: "email",
          autoComplete: "email",
        },
        {
          name: "user_password",
          label: tCreateUser("labels.password"),
          type: "password",
        },
        {
          name: "user_password_repeat",
          label: tCreateUser("labels.confirmPassword"),
          type: "password",
        },
      ]}
      title={tCreateUser("title")}
      submitText={tCreateUser("submitText")}
      isLoading={isLoading}
      isError={isError}
      error={getErrorMessage(error)}
    />
  )
}
