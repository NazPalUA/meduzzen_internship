import { z } from "zod"

export const createUserCredentialsSchema = (t?: (key: string) => string) => {
  const translate = (key: string, defaultMessage: string) => {
    return t ? t(key) : defaultMessage
  }

  return z
    .object({
      user_email: z
        .string()
        .email({ message: translate("invalidEmail", "Invalid email address") })
        .trim(),
      user_password: z
        .string()
        .min(8, {
          message: translate("passwordMinLength", "Password must be at least 8 characters"),
        })
        .trim(),
      user_password_repeat: z.string(),
      user_firstname: z
        .string()
        .min(1, { message: translate("firstNameRequired", "First name is required") })
        .trim(),
      user_lastname: z
        .string()
        .min(1, { message: translate("lastNameRequired", "Last name is required") })
        .trim(),
    })
    .refine((data) => data.user_password === data.user_password_repeat, {
      message: translate("passwordsDoNotMatch", "Passwords do not match"),
      path: ["user_password_repeat"],
    })
}

export const CreateUserCredentialsSchema = createUserCredentialsSchema()

export const CreateUserResponseSchema = z.object({
  status_code: z.number(),
  detail: z.string(),
  result: z.object({
    user_id: z.number(),
  }),
})

export type CreateUserCredentials = z.infer<typeof CreateUserCredentialsSchema>
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>
