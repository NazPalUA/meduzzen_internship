import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const CreateActionFromUserResponseSchema = ServerResponseSchema(
  z.object({
    action_id: z.number(),
  }),
)

export type CreateActionFromUserResponse = z.infer<typeof CreateActionFromUserResponseSchema>
