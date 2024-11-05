import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { z } from "zod"

export const UpdateUserAvatarCredentialsSchema = z.object({
  file: z.instanceof(File),
})

export type UpdateUserAvatarCredentials = z.infer<typeof UpdateUserAvatarCredentialsSchema>

export const UpdateUserAvatarResponseSchema = ServerResponseSchema(z.string())

export type UpdateUserAvatarResponse = z.infer<typeof UpdateUserAvatarResponseSchema>
