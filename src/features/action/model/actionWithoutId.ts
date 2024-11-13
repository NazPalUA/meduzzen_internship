import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const ActionWithoutIdResponseSchema = ServerResponseSchema(z.string().or(z.null()))

export type ActionWithoutIdResponse = z.infer<typeof ActionWithoutIdResponseSchema>
