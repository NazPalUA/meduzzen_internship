import { SingleCompanySchema } from "@entities/company"
import { ServerResponseSchema } from "@shared/api"
import { Action } from "@shared/constants"
import { z } from "zod"

export const UserDataCompanySchema = SingleCompanySchema.extend({
  action_id: z.number(),
  action: z.nativeEnum(Action),
})

export const UserDataCompaniesListResponseSchema = ServerResponseSchema(
  z.object({
    companies: z.array(UserDataCompanySchema),
  }),
)

export type UserDataCompany = z.infer<typeof UserDataCompanySchema>
export type UserDataCompaniesListResponse = z.infer<typeof UserDataCompaniesListResponseSchema>
