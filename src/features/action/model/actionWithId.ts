import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const ActionWithIdResponseSchema = ServerResponseSchema(
  z.object({
    action_id: z.number(),
  }),
)

export type ActionWithIdResponse = z.infer<typeof ActionWithIdResponseSchema>
