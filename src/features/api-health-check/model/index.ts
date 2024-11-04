import { z } from "zod"

export const CheckHealthResponseSchema = z.object({
  status_code: z.number(),
  detail: z.string(),
  result: z.string(),
})

export type CheckHealthResponse = z.infer<typeof CheckHealthResponseSchema>
