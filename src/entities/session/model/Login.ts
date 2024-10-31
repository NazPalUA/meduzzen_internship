import { z } from "zod"

export const LoginCredentialsSchema = z.object({
  user_email: z.string().email({ message: "Invalid email address" }).trim(),
  user_password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
})

export const LoginResponseSchema = z.object({
  status_code: z.number(),
  detail: z.string(),
  result: z.object({
    access_token: z.string(),
    token_type: z.string(),
  }),
})

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>
