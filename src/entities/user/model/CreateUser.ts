import { z } from "zod"

export const CreateUserCredentialsSchema = z
  .object({
    user_email: z.string().email({ message: "Invalid email address" }).trim(),
    user_password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
    user_password_repeat: z.string().min(8),
    user_firstname: z.string().min(1),
    user_lastname: z.string().min(1),
  })
  .refine((data) => data.user_password === data.user_password_repeat, {
    message: "Passwords do not match",
    path: ["user_password_repeat"],
  })

export type CreateUserCredentials = z.infer<typeof CreateUserCredentialsSchema>

export const CreateUserResponseSchema = z.object({
  status_code: z.number(),
  detail: z.string(),
  result: z.object({
    user_id: z.number(),
  }),
})

export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>
