import { RatingSchema, ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const AllUsersAnalyticsSchema = z.object({
  user_id: z.number(),
  rating: z.array(RatingSchema),
})

export const CompanyDataSummaryRatingAnalyticForUsersResponseSchema = ServerResponseSchema(
  z.object({
    rating: z.array(AllUsersAnalyticsSchema),
  }),
)

export type AllUsersAnalytics = z.infer<typeof AllUsersAnalyticsSchema>

export type CompanyDataSummaryRatingAnalyticForUsersResponse = z.infer<
  typeof CompanyDataSummaryRatingAnalyticForUsersResponseSchema
>
