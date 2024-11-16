"use client"

import {
  createUserCredentialsSchema,
  useCreateUserMutation,
  type CreateUserCredentials,
} from "@entities/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@navigation"
import { getForm } from "@shared/components/Form"
import { Routes } from "@shared/constants"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import styles from "./Form.module.scss"
import { SwitchAuth } from "./SwitchAuth"

export function SignUpForm() {
  const [createUser, { error, isError }] = useCreateUserMutation()
  const router = useRouter()

  const t = useTranslations()
  const schema = createUserCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: CreateUserCredentials) => {
    await createUser(data).unwrap()
    router.push(Routes.LOGIN)
  }

  const errorMessage = isError
    ? "status" in error && error.status === 400
      ? t("Error.emailAlreadyExists")
      : t("Error.default")
    : null

  const form = useForm<CreateUserCredentials>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_email: "",
      user_firstname: "",
      user_lastname: "",
      user_password: "",
      user_password_repeat: "",
    },
  })

  const Form = getForm<CreateUserCredentials>()

  return (
    <Form form={form} onSubmit={onSubmit} title={t("CreateUser.title")} className={styles.form}>
      <Form.TextField
        name="user_email"
        type="email"
        label={t("CreateUser.labels.email")}
        autoComplete="email"
      />
      <Form.TextField name="user_firstname" label={t("CreateUser.labels.firstName")} />
      <Form.TextField name="user_lastname" label={t("CreateUser.labels.lastName")} />
      <Form.TextField
        name="user_password"
        type="password"
        autoComplete="new-password"
        label={t("CreateUser.labels.password")}
      />
      <Form.TextField
        name="user_password_repeat"
        type="password"
        autoComplete="new-password"
        label={t("CreateUser.labels.confirmPassword")}
      />
      <Form.SubmitButton text={t("CreateUser.submitText")} />
      <Form.ErrorMessage text={errorMessage} />

      <SwitchAuth to={Routes.LOGIN} />
    </Form>
  )
}
