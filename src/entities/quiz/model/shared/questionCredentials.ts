import { translateMessage } from "@shared/utils"
import { z } from "zod"

export const questionCredentialsSchema = (t?: (key: string) => string) => {
  const translate = translateMessage(t)

  return z
    .object({
      question_text: z
        .string()
        .min(1, { message: translate("question.textRequired", "Question text is required.") }),
      question_answers: z
        .array(
          z.string().min(1, {
            message: translate("question.answerRequired", "The answer field cannot be empty."),
          }),
        )
        .min(2, {
          message: translate(
            "question.answersAtLeast",
            "At least two answer options are required.",
          ),
        })
        .refine((answers) => new Set(answers).size === answers.length, {
          message: translate("question.answersUnique", "All answer options must be unique."),
        }),
      question_correct_answer: z
        .number({
          invalid_type_error: translate(
            "question.correctAnswerInvalidType",
            "Correct answer must be a number.",
          ),
        })
        .int({
          message: translate("question.correctAnswerInteger", "Correct answer must be an integer."),
        })
        .min(0, {
          message: translate(
            "question.correctAnswerMin",
            "Correct answer index cannot be negative.",
          ),
        }),
    })
    .superRefine((data, ctx) => {
      const { question_correct_answer, question_answers } = data

      if (question_correct_answer >= question_answers.length) {
        ctx.addIssue({
          path: ["question_correct_answer"],
          code: z.ZodIssueCode.custom,
          message: translate(
            "question.correctAnswerInvalid",
            "The correct answer index must be within the range of provided answers.",
          ),
        })
      }
    })
}

export const QuestionCredentialsSchema = questionCredentialsSchema()

export type QuestionCredentials = z.infer<typeof QuestionCredentialsSchema>
