import { SingleCompanySchema } from "@entities/company"
import { ServerResponseSchema } from "@shared/api"
import { Action } from "@shared/constants"
import { z } from "zod"

export const UserCompanySchema = SingleCompanySchema.extend({
  action_id: z.number(),
  action: z.nativeEnum(Action),
})

export const UserCompaniesListResponseSchema = ServerResponseSchema(
  z.object({
    companies: z.array(UserCompanySchema),
  }),
)

export type UserCompany = z.infer<typeof UserCompanySchema>
export type UserCompaniesListResponse = z.infer<typeof UserCompaniesListResponseSchema>
