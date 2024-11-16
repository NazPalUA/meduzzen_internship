import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const DeleteQuizResponseSchema = ServerResponseSchema(z.string().or(z.null()))

export type DeleteQuizResponse = z.infer<typeof DeleteQuizResponseSchema>
