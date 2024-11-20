import { RatingSchema, ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const CompanyDataSummaryRatingAnalyticForUserResponseSchema = ServerResponseSchema(
  z.object({
    rating: z.array(
      z.object({
        rating: z.array(RatingSchema),
        quiz_id: z.number(),
      }),
    ),
  }),
)

export type CompanyDataSummaryRatingAnalyticForUserResponse = z.infer<
  typeof CompanyDataSummaryRatingAnalyticForUserResponseSchema
>
