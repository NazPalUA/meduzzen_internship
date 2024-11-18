import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const UserDataQuizzesLastPassResponseSchema = ServerResponseSchema(
  z.object({
    quizzes: z.array(
      z.object({
        quiz_id: z.number(),
        last_quiz_pass_at: z.string().datetime(),
      }),
    ),
  }),
)

export type UserDataQuizzesLastPassResponse = z.infer<typeof UserDataQuizzesLastPassResponseSchema>
