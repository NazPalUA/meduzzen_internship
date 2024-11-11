import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const LeaveCompanyResponseSchema = ServerResponseSchema(z.string().or(z.null()))

export type LeaveCompanyResponse = z.infer<typeof LeaveCompanyResponseSchema>
