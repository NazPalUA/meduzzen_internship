import { z } from "zod"

export const CompanyDataRatingSchema = z.object({
  current_rating: z.number(),
  average_rating: z.number(),
  pass_at: z.string().datetime(),
})

export type CompanyDataRating = z.infer<typeof CompanyDataRatingSchema>
