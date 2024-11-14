import { QuizDetailsSchema } from "@entities/quiz"
import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const CompanyDataQuizSchema = QuizDetailsSchema.pick({
  quiz_id: true,
  quiz_name: true,
  quiz_title: true,
  quiz_description: true,
})

export const CompanyDataQuizzesListResponseSchema = ServerResponseSchema(
  z.object({
    quizzes: z.array(CompanyDataQuizSchema),
  }),
)

export type CompanyDataQuiz = z.infer<typeof CompanyDataQuizSchema>
export type CompanyDataQuizzesListResponse = z.infer<typeof CompanyDataQuizzesListResponseSchema>
