import { z } from "zod"

export const QuestionSchema = z.object({
  question_id: z.number(),
  question_text: z.string(),
  question_answers: z.array(z.string()),
})

export type Question = z.infer<typeof QuestionSchema>
