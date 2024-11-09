import { z } from "zod"

export const PaginationSchema = z.object({
  current_page: z.number(),
  total_page: z.number(),
  total_results: z.number(),
})
