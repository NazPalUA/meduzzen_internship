import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { z } from "zod"

export const DeleteUserResponseSchema = ServerResponseSchema(z.string().or(z.null()))

export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>
