import { ServerResponseSchema, UserDetailsSchema } from "@shared/api"
import { z } from "zod"

export const CompanyOwnerSchema = UserDetailsSchema.pick({
  user_id: true,
  user_email: true,
  user_firstname: true,
  user_lastname: true,
  user_avatar: true,
})

export const CompanyDetailsSchema = z.object({
  company_id: z.number(),
  company_name: z.string(),
  company_title: z.string().nullable(),
  company_avatar: z.string().nullable(),
  is_visible: z.boolean(),
  company_description: z.string().nullable(),
  company_city: z.string().nullable(),
  company_phone: z.string().nullable(),
  company_links: z.array(z.string()).nullable(),
  company_owner: CompanyOwnerSchema,
})

export const CompanyDetailsResponseSchema = ServerResponseSchema(CompanyDetailsSchema)

export type CompanyDetails = z.infer<typeof CompanyDetailsSchema>
export type CompanyOwner = z.infer<typeof CompanyOwnerSchema>
export type CompanyDetailsResponse = z.infer<typeof CompanyDetailsResponseSchema>
