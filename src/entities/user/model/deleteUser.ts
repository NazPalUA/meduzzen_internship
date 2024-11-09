import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const DeleteUserResponseSchema = ServerResponseSchema(z.string().or(z.null()))

export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>
