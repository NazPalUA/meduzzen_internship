import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"
import { CompanyDataRatingSchema } from "./shared/rating"

export const CompanyDataSummaryRatingAnalyticForUsersResponseSchema = ServerResponseSchema(
  z.object({
    rating: z.array(
      z.object({
        rating: z.array(CompanyDataRatingSchema),
        user_id: z.number(),
      }),
    ),
  }),
)

export type CompanyDataSummaryRatingAnalyticForUsersResponse = z.infer<
  typeof CompanyDataSummaryRatingAnalyticForUsersResponseSchema
>
