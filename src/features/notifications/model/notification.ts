import { z } from "zod"

export const NotificationSchema = z.object({
  notification_id: z.number(),
  notification_title: z.string(),
  notification_message: z.string(),
  notification_user_id: z.number(),
  notification_company_id: z.number(),
  is_read: z.boolean(),
  created_at: z.string(),
})

export type Notification = z.infer<typeof NotificationSchema>
