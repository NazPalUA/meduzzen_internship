import { ServerResponseSchema } from "@shared/api"
import { translateMessage } from "@shared/utils"
import { z } from "zod"
import { passwordSchema } from "./shared/password"

export const updateUserPasswordCredentialsSchema = (t?: (key: string) => string) => {
  const translate = translateMessage(t)

  return z
    .object({
      user_password: passwordSchema(t),
      user_password_repeat: z.string(),
    })
    .refine((data) => data.user_password === data.user_password_repeat, {
      message: translate("password.doNotMatch", "Passwords do not match"),
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
