import { ServerResponseSchema } from "@shared/api"
import { z } from "zod"

export const DeleteCompanyResponseSchema = ServerResponseSchema(z.string().or(z.null()))

export type DeleteCompanyResponse = z.infer<typeof DeleteCompanyResponseSchema>
