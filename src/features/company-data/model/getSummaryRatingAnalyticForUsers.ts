import { RatingSchema, ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const CompanyDataSummaryRatingAnalyticForUsersResponseSchema = ServerResponseSchema(
  z.object({
    rating: z.array(
      z.object({
        rating: z.array(RatingSchema),
        user_id: z.number(),
      }),
    ),
  }),
)

export type CompanyDataSummaryRatingAnalyticForUsersResponse = z.infer<
  typeof CompanyDataSummaryRatingAnalyticForUsersResponseSchema
>
