import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const TakeQuizCredentialsSchema = z.object({
  answers: z.record(z.string().min(1), z.string().min(1)),
})

export const TakeQuizResponseSchema = ServerResponseSchema(
  z.object({
    result_id: z.number(),
    result_score: z.number(),
  }),
)

export type TakeQuizCredentials = z.infer<typeof TakeQuizCredentialsSchema>
export type TakeQuizResponse = z.infer<typeof TakeQuizResponseSchema>
