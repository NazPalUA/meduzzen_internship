import { z } from "zod"

export const DeleteUserResponseSchema = z.object({
  status_code: z.number(),
  detail: z.string(),
  result: z.string().or(z.null()),
})

export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>
