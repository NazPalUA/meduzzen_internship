import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const UpdateCompanyVisibleCredentialsSchema = z.object({
  is_visible: z.boolean(),
})

export type UpdateCompanyVisibleCredentials = z.infer<typeof UpdateCompanyVisibleCredentialsSchema>

export const UpdateCompanyVisibleResponseSchema = ServerResponseSchema(
  z.object({
    company_id: z.number(),
  }),
)

export type UpdateCompanyVisibleResponse = z.infer<typeof UpdateCompanyVisibleResponseSchema>
