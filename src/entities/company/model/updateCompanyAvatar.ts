import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const UpdateCompanyAvatarCredentialsSchema = z.object({
  file: z.instanceof(File),
})

export type UpdateCompanyAvatarCredentials = z.infer<typeof UpdateCompanyAvatarCredentialsSchema>

export const UpdateCompanyAvatarResponseSchema = ServerResponseSchema(z.string())

export type UpdateCompanyAvatarResponse = z.infer<typeof UpdateCompanyAvatarResponseSchema>
