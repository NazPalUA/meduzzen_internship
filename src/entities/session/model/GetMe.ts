import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { UserDetailsSchema } from "@shared/models/UserDetails"
import { z } from "zod"

export const CurrentUserSchema = UserDetailsSchema

export const GetMeResponseSchema = ServerResponseSchema(CurrentUserSchema)

export type CurrentUser = z.infer<typeof CurrentUserSchema>
export type GetMeResponse = z.infer<typeof GetMeResponseSchema>
