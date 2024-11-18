import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const UserDataQuizzesLastPassSchema = z.object({
  quiz_id: z.number(),
  last_quiz_pass_at: z.string(),
})

export const UserDataQuizzesLastPassResponseSchema = ServerResponseSchema(
  z.object({
    quizzes: z.array(UserDataQuizzesLastPassSchema),
  }),
)

export type UserDataQuizzesLastPass = z.infer<typeof UserDataQuizzesLastPassSchema>
export type UserDataQuizzesLastPassResponse = z.infer<typeof UserDataQuizzesLastPassResponseSchema>
