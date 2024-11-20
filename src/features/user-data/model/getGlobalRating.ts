import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const UserDataGlobalRatingResponseSchema = ServerResponseSchema(
  z.object({
    rating: z.number(),
  }),
)

export type UserDataGlobalRatingResponse = z.infer<typeof UserDataGlobalRatingResponseSchema>
