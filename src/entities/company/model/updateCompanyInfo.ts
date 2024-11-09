import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const updateCompanyInfoCredentialsSchema = (t?: (key: string) => string) => {
  const translate = (key: string, defaultMessage: string) => {
    return t ? t(key) : defaultMessage
  }

  return z.object({
    company_name: z
      .string()
      .min(1, translate("company.nameRequired", "Company name is required"))
      .trim(),
    company_title: z.string().optional(),
    company_description: z.string().optional(),
    company_city: z.string().optional(),
    company_phone: z.string().optional(),
    company_links: z.array(z.string().url(translate("url.invalid", "Invalid URL"))).optional(),
  })
}

export const UpdateCompanyInfoCredentialsSchema = updateCompanyInfoCredentialsSchema()

export type UpdateCompanyInfoCredentials = z.infer<typeof UpdateCompanyInfoCredentialsSchema>

export const UpdateCompanyInfoResponseSchema = ServerResponseSchema(
  z.object({
    company_id: z.number(),
  }),
)

export type UpdateCompanyInfoResponse = z.infer<typeof UpdateCompanyInfoResponseSchema>
