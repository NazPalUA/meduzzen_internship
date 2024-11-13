import { SingleUser } from "@entities/user"

export const fakeUsers = (
  type: "members" | "invites" | "requests",
  companyId: string | number,
): SingleUser[] => [
  {
    user_id: 1,
    user_email: `${companyId}: test@test.com`,
    user_firstname: `${type}: John`,
    user_lastname: "Doe",
    user_avatar: null,
  },
  {
    user_id: 2,
    user_email: `${companyId}: test2@test.com`,
    user_firstname: `${type}: Jane`,
    user_lastname: "Doe",
    user_avatar: null,
  },
  {
    user_id: 3,
    user_email: `${companyId}: test3@test.com`,
    user_firstname: `${type}: John`,
    user_lastname: "Doe",
    user_avatar: null,
  },
]
