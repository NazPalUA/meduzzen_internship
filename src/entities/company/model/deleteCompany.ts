import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { z } from "zod"

export const DeleteCompanyResponseSchema = ServerResponseSchema(z.string().or(z.null()))

export type DeleteCompanyResponse = z.infer<typeof DeleteCompanyResponseSchema>
