import { z } from "zod"

export const CurrentUserSchema = z.object({
  user_id: z.number(),
  user_email: z.string().email(),
  user_firstname: z.string(),
  user_lastname: z.string(),
  user_avatar: z.string().nullable(),
  user_status: z.string().nullable(),
  user_city: z.string().nullable(),
  user_phone: z.string().nullable(),
  user_links: z.array(z.string()).nullable(),
  is_superuser: z.boolean(),
})

export const GetMeResponseSchema = z.object({
  status_code: z.number(),
  detail: z.string(),
  result: CurrentUserSchema,
})

export type CurrentUser = z.infer<typeof CurrentUserSchema>
export type GetMeResponse = z.infer<typeof GetMeResponseSchema>
