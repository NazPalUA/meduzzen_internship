import { ServerResponseSchema } from "@shared/api"
import { translateMessage } from "@shared/utils"
import { z } from "zod"

export const loginCredentialsSchema = (t?: (key: string) => string) => {
  const translate = translateMessage(t)

  return z.object({
    user_email: z
      .string()
      .min(1, translate("email.required", "Email is required"))
      .email(translate("email.invalid", "Invalid email address"))
      .trim(),
    user_password: z.string().min(1, translate("password.required", "Password is required")).trim(),
  })
}

export const LoginCredentialsSchema = loginCredentialsSchema()

export const LoginResponseSchema = ServerResponseSchema(
  z.object({
    access_token: z.string(),
    token_type: z.string(),
  }),
)

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>
