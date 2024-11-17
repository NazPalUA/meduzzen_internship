import { ServerResponseSchema } from "@shared/api"
import { translateMessage } from "@shared/utils"
import { z } from "zod"

export const updateQuizInfoCredentialsSchema = (t?: (key: string) => string) => {
  const translate = translateMessage(t)

  return z.object({
    quiz_name: z
      .string()
      .min(1, { message: translate("quiz.nameRequired", "Quiz name is required.") })
      .trim(),
    quiz_title: z.string(),
    quiz_description: z.string(),
    quiz_frequency: z.coerce.number().min(1, {
      message: translate("quiz.frequencyMin", "Quiz frequency must be at least once a day."),
    }),
  })
}

export const UpdateQuizInfoCredentialsSchema = updateQuizInfoCredentialsSchema()

export type UpdateQuizInfoCredentials = z.infer<typeof UpdateQuizInfoCredentialsSchema>

export const UpdateQuizInfoResponseSchema = ServerResponseSchema(
  z.object({
    quiz_id: z.number(),
  }),
)

export type UpdateQuizInfoResponse = z.infer<typeof UpdateQuizInfoResponseSchema>
