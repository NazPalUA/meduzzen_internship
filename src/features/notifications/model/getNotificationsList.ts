import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"
import { NotificationSchema } from "./notification"

export const GetNotificationsListResponseSchema = ServerResponseSchema(
  z.object({
    notifications: z.array(NotificationSchema),
  }),
)

export type GetNotificationsListResponse = z.infer<typeof GetNotificationsListResponseSchema>
