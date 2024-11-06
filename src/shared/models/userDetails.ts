import { z } from "zod"

export const UserDetailsSchema = z.object({
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

export type UserDetails = z.infer<typeof UserDetailsSchema>
