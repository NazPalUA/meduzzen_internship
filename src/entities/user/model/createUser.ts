import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { z } from "zod"
import { passwordSchema } from "./shared/password"

export const createUserCredentialsSchema = (t?: (key: string) => string) => {
  const translate = (key: string, defaultMessage: string) => {
    return t ? t(key) : defaultMessage
  }

  return z
    .object({
      user_email: z
        .string()
        .min(1, { message: translate("email.required", "Email is required") })
        .email({ message: translate("email.invalid", "Invalid email address") })
        .trim(),
      user_password: passwordSchema(t),
      user_password_repeat: z.string(),
      user_firstname: z
        .string()
        .min(1, { message: translate("firstName.required", "First name is required") })
        .trim(),
      user_lastname: z
        .string()
        .min(1, { message: translate("lastName.required", "Last name is required") })
        .trim(),
    })
    .refine((data) => data.user_password === data.user_password_repeat, {
      message: translate("password.doNotMatch", "Passwords do not match"),
      path: ["user_password_repeat"],
    })
}

export const CreateUserCredentialsSchema = createUserCredentialsSchema()

export const CreateUserResponseSchema = ServerResponseSchema(
  z.object({
    user_id: z.number(),
  }),
)

export type CreateUserCredentials = z.infer<typeof CreateUserCredentialsSchema>
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>
