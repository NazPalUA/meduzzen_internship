import { z } from "zod"

export const ServerResponseSchema = <T extends z.ZodType>(resultSchema: T) =>
  z.object({
    status_code: z.number(),
    detail: z.string(),
    result: resultSchema,
  })
