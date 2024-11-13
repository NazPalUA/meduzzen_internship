import { SingleUserSchema } from "@entities/user"
import { ServerResponseSchema } from "@shared/api"
import { Action } from "@shared/constants"
import { z } from "zod"

export const CompanyDataUserSchema = SingleUserSchema.extend({
  action_id: z.number(),
  action: z.nativeEnum(Action),
})

export const CompanyDataUsersListResponseSchema = ServerResponseSchema(
  z.object({
    users: z.array(CompanyDataUserSchema),
  }),
)

export type CompanyDataUser = z.infer<typeof CompanyDataUserSchema>
export type CompanyDataUsersListResponse = z.infer<typeof CompanyDataUsersListResponseSchema>
