"use client"

import {
  CreateUserCredentialsSchema,
  useCreateUserMutation,
  type CreateUserCredentials,
} from "@entities/user"
import { useRouter } from "@navigation"
import { Routes } from "@shared/constants/routes"
import { AuthForm } from "./AuthForm"

export function SignUpForm() {
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation()
  const router = useRouter()

  const onSubmit = async (data: CreateUserCredentials) => {
    await createUser(data).unwrap()
    router.push(Routes.LOGIN)
  }

  return (
    <AuthForm<CreateUserCredentials>
      schema={CreateUserCredentialsSchema}
      onSubmit={onSubmit}
      fields={[
        {
          name: "user_firstname",
          label: "First Name",
          type: "text",
        },
        {
          name: "user_lastname",
          label: "Last Name",
          type: "text",
        },
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
        },
        {
          name: "user_password_repeat",
          label: "Confirm Password",
          type: "password",
        },
      ]}
      title="Create a new account"
      submitText="Sign Up"
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  )
}
