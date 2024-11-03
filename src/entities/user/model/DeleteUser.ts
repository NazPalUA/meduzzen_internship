import { z } from "zod"

export const DeleteUserResponseSchema = z.object({
  status_code: z.number(),
  detail: z.string(),
  result: z.string(),
})

export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>
