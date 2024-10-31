import { z } from "zod"

export const SingleUserSchema = z.object({
  user_id: z.number(),
  user_email: z.string().email(),
  user_firstname: z.string(),
  user_lastname: z.string(),
  user_avatar: z.string().nullable(),
})

const PaginationSchema = z.object({
  current_page: z.number(),
  total_page: z.number(),
  total_results: z.number(),
})

export const UsersListResponseSchema = z.object({
  status_code: z.number(),
  detail: z.string(),
  result: z.object({
    users: z.array(SingleUserSchema),
    pagination: PaginationSchema,
  }),
})

export type SingleUser = z.infer<typeof SingleUserSchema>
export type Pagination = z.infer<typeof PaginationSchema>
export type UsersListResponse = z.infer<typeof UsersListResponseSchema>
