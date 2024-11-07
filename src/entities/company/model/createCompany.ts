import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { z } from "zod"

export const createCompanyCredentialsSchema = (t?: (key: string) => string) => {
  const translate = (key: string, defaultMessage: string) => {
    return t ? t(key) : defaultMessage
  }

  return z.object({
    company_name: z
      .string()
      .min(1, { message: translate("company.nameRequired", "Company name is required") })
      .trim(),
    is_visible: z.boolean().default(false),
  })
}

export const CreateCompanyCredentialsSchema = createCompanyCredentialsSchema()

export const CreateCompanyResponseSchema = ServerResponseSchema(
  z.object({
    company_id: z.number(),
  }),
)

export type CreateCompanyCredentials = z.infer<typeof CreateCompanyCredentialsSchema>
export type CreateCompanyResponse = z.infer<typeof CreateCompanyResponseSchema>
