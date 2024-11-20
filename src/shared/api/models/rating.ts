import { z } from "zod"

export const RatingSchema = z.object({
  current_rating: z.number(),
  average_rating: z.number(),
  pass_at: z.string(),
})

export type Rating = z.infer<typeof RatingSchema>
