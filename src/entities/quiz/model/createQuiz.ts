import { ServerResponseSchema } from "@shared/api"
import { translateMessage } from "@shared/utils"
import { z } from "zod"
import { questionCredentialsSchema } from "./shared/questionCredentials"

export const createQuizCredentialsSchema = (t?: (key: string) => string) => {
  const translate = translateMessage(t)

  return z.object({
    quiz_name: z
      .string()
      .min(1, { message: translate("quiz.nameRequired", "Quiz name is required.") })
      .trim(),
    quiz_frequency: z
      .number()
      .min(1, {
        message: translate("quiz.frequencyMin", "Quiz frequency must be at least once a day."),
      })
      .max(365, {
        message: translate("quiz.frequencyMax", "Quiz frequency cannot exceed once a year."),
      }),
    company_id: z
      .number()
      .min(1, { message: translate("quiz.companyIdRequired", "Company ID is required.") }),
    questions: z
      .array(questionCredentialsSchema(t))
      .min(2, {
        message: translate("quiz.questionsAtLeast", "At least two questions are required."),
      })
      .max(50, {
        message: translate("quiz.questionsMax", "A maximum of 50 questions is allowed."),
      }),
  })
}

export const CreateQuizCredentialsSchema = createQuizCredentialsSchema()

export const CreateQuizResponseSchema = ServerResponseSchema(
  z.object({
    quiz_id: z.number(),
  }),
)

export type CreateQuizCredentials = z.infer<typeof CreateQuizCredentialsSchema>
export type CreateQuizResponse = z.infer<typeof CreateQuizResponseSchema>
