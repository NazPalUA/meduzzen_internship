import { ServerResponseSchema, UserDetailsSchema } from "@shared/api"
import { z } from "zod"
import { QuestionSchema } from "./shared/question"

const QuizCreatorSchema = UserDetailsSchema.pick({
  user_id: true,
  user_email: true,
  user_firstname: true,
  user_lastname: true,
  user_avatar: true,
})

export const QuizDetailsSchema = z.object({
  quiz_id: z.number(),
  quiz_name: z.string(),
  quiz_title: z.string().nullable(),
  quiz_description: z.string().nullable(),
  quiz_frequency: z.number(),
  created_by: QuizCreatorSchema,
  questions_list: z.array(QuestionSchema),
})

export const GetQuizByIdResponseSchema = ServerResponseSchema(QuizDetailsSchema)

export type QuizDetails = z.infer<typeof QuizDetailsSchema>
export type QuizCreator = z.infer<typeof QuizCreatorSchema>
export type GetQuizByIdResponse = z.infer<typeof GetQuizByIdResponseSchema>
