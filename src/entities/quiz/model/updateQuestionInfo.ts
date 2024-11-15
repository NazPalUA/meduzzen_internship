import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"
import { questionCredentialsSchema } from "./shared/questionCredentials"

export const updateQuestionCredentialsSchema = (t?: (key: string) => string) =>
  questionCredentialsSchema(t)

export const UpdateQuestionCredentialsSchema = updateQuestionCredentialsSchema()

export const UpdateQuestionResponseSchema = ServerResponseSchema(
  z.object({
    question_id: z.number(),
  }),
)

export type UpdateQuestionCredentials = z.infer<typeof UpdateQuestionCredentialsSchema>
export type UpdateQuestionResponse = z.infer<typeof UpdateQuestionResponseSchema>
