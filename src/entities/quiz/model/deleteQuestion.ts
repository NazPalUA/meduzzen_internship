import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const DeleteQuestionResponseSchema = ServerResponseSchema(z.string().or(z.null()))

export type DeleteQuestionResponse = z.infer<typeof DeleteQuestionResponseSchema>
