import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { z } from "zod"

export const updateUserPasswordCredentialsSchema = (t?: (key: string) => string) => {
  const translate = (key: string, defaultMessage: string) => {
    return t ? t(key) : defaultMessage
  }

  return z
    .object({
      user_password: z
        .string()
        .min(8, translate("passwordRequired", "Password is required"))
        .trim(),
      user_password_repeat: z.string(),
    })
    .refine((data) => data.user_password === data.user_password_repeat, {
      message: translate("passwordsDoNotMatch", "Passwords do not match"),
      path: ["user_password_repeat"],
    })
}

export const UpdateUserPasswordCredentialsSchema = updateUserPasswordCredentialsSchema()

export type UpdateUserPasswordCredentials = z.infer<typeof UpdateUserPasswordCredentialsSchema>

export const UpdateUserPasswordResponseSchema = ServerResponseSchema(
  z.object({
    user_id: z.number(),
  }),
)

export type UpdateUserPasswordResponse = z.infer<typeof UpdateUserPasswordResponseSchema>
