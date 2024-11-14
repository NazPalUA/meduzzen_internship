import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"
import { questionCredentialsSchema } from "./shared/questionCredentials"

export const addQuestionCredentialsSchema = (t?: (key: string) => string) =>
  questionCredentialsSchema(t)

export const AddQuestionCredentialsSchema = addQuestionCredentialsSchema()

export const AddQuestionResponseSchema = ServerResponseSchema(
  z.object({
    question_id: z.number(),
  }),
)

export type AddQuestionCredentials = z.infer<typeof AddQuestionCredentialsSchema>
export type AddQuestionResponse = z.infer<typeof AddQuestionResponseSchema>
