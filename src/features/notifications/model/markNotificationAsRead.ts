import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const MarkNotificationAsReadResponseSchema = ServerResponseSchema(
  z.object({
    notification_id: z.number(),
  }),
)

export type MarkNotificationAsReadResponse = z.infer<typeof MarkNotificationAsReadResponseSchema>
