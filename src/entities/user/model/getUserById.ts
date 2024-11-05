import { ServerResponseSchema } from "@shared/models/ServerResponseSchema"
import { UserDetailsSchema } from "@shared/models/userDetails"
import { z } from "zod"

export { UserDetailsSchema, type UserDetails } from "@shared/models/userDetails"

export const UserDetailsResponseSchema = ServerResponseSchema(UserDetailsSchema)

export type UserDetailsResponse = z.infer<typeof UserDetailsResponseSchema>
