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
    quiz_frequency: z.coerce.number().min(1, {
      message: translate("quiz.frequencyMin", "Quiz frequency must be at least once a day."),
    }),
    company_id: z
      .number()
      .min(1, { message: translate("quiz.companyIdRequired", "Company ID is required.") }),
    questions_list: z.array(questionCredentialsSchema(t)).min(2, {
      message: translate("quiz.questionsAtLeast", "At least two questions are required."),
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
