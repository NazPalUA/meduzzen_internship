import { PaginationSchema } from "@shared/models/PaginationSchema"
import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { z } from "zod"

export const SingleUserSchema = z.object({
  user_id: z.number(),
  user_email: z.string().email(),
  user_firstname: z.string(),
  user_lastname: z.string(),
  user_avatar: z.string().nullable(),
})

export const UsersListResponseSchema = ServerResponseSchema(
  z.object({
    users: z.array(SingleUserSchema),
    pagination: PaginationSchema,
  }),
)

export type SingleUser = z.infer<typeof SingleUserSchema>
export type UsersListResponse = z.infer<typeof UsersListResponseSchema>
