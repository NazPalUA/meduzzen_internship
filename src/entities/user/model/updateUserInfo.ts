import { ServerResponseSchema } from "@shared/api"
import { translateMessage } from "@shared/utils"
import { z } from "zod"

export const updateUserInfoCredentialsSchema = (t?: (key: string) => string) => {
  const translate = translateMessage(t)

  return z.object({
    user_firstname: z
      .string()
      .min(1, translate("firstName.required", "First name is required"))
      .trim(),
    user_lastname: z
      .string()
      .min(1, translate("lastName.required", "Last name is required"))
      .trim(),
    user_status: z.string().optional(),
    user_city: z.string().optional(),
    user_phone: z.string().optional(),
    user_links: z.array(z.string().url(translate("url.invalid", "Invalid URL"))).optional(),
  })
}

export const UpdateUserInfoCredentialsSchema = updateUserInfoCredentialsSchema()

export type UpdateUserInfoCredentials = z.infer<typeof UpdateUserInfoCredentialsSchema>

export const UpdateUserInfoResponseSchema = ServerResponseSchema(
  z.object({
    user_id: z.number(),
  }),
)

export type UpdateUserInfoResponse = z.infer<typeof UpdateUserInfoResponseSchema>
