import { PaginationSchema } from "@shared/models/PaginationSchema"
import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { z } from "zod"

export const SingleCompanySchema = z.object({
  company_id: z.number(),
  company_name: z.string(),
  company_title: z.string().nullable(),
  company_avatar: z.string().nullable(),
  is_visible: z.boolean(),
})

export const CompaniesListResponseSchema = ServerResponseSchema(
  z.object({
    companies: z.array(SingleCompanySchema),
    pagination: PaginationSchema,
  }),
)

export type SingleCompany = z.infer<typeof SingleCompanySchema>
export type CompaniesListResponse = z.infer<typeof CompaniesListResponseSchema>
