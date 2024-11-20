import { RatingSchema, ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const UserDataRatingAnalyticForQuizResponseSchema = ServerResponseSchema(
  z.object({
    rating: z.array(RatingSchema),
  }),
)

export type UserDataRatingAnalyticForQuizResponse = z.infer<
  typeof UserDataRatingAnalyticForQuizResponseSchema
>
