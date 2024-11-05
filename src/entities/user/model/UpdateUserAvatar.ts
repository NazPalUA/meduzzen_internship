import { z } from "zod"

export const UpdateUserAvatarCredentialsSchema = z.object({
  file: z.instanceof(File),
})

export type UpdateUserAvatarCredentials = z.infer<typeof UpdateUserAvatarCredentialsSchema>

export const UpdateUserAvatarResponseSchema = z.object({
  status_code: z.number(),
  detail: z.string(),
  result: z.string(),
})

export type UpdateUserAvatarResponse = z.infer<typeof UpdateUserAvatarResponseSchema>
