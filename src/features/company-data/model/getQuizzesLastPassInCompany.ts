import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const CompanyDataQuizzesLastPassInResponseSchema = ServerResponseSchema(
  z.object({
    users: z.array(
      z.object({
        user_id: z.number(),
        quizzes: z.array(
          z.object({
            quiz_id: z.number(),
            last_quiz_pass_at: z.string().datetime(),
          }),
        ),
      }),
    ),
  }),
)

export type CompanyDataQuizzesLastPassInResponse = z.infer<
  typeof CompanyDataQuizzesLastPassInResponseSchema
>
