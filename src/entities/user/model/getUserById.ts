import { ServerResponseSchema, UserDetailsSchema } from "@shared/api"
import { z } from "zod"

export { UserDetailsSchema, type UserDetails } from "@shared/api"

export const UserDetailsResponseSchema = ServerResponseSchema(UserDetailsSchema)

export type UserDetailsResponse = z.infer<typeof UserDetailsResponseSchema>
