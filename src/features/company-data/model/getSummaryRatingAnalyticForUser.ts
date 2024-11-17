import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"
import { CompanyDataRatingSchema } from "./shared/rating"

export const CompanyDataSummaryRatingAnalyticForUserResponseSchema = ServerResponseSchema(
  z.object({
    rating: z.array(
      z.object({
        rating: z.array(CompanyDataRatingSchema),
        quiz_id: z.number(),
      }),
    ),
  }),
)

export type CompanyDataSummaryRatingAnalyticForUserResponse = z.infer<
  typeof CompanyDataSummaryRatingAnalyticForUserResponseSchema
>
