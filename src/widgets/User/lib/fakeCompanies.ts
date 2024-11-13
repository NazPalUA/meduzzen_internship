import { type SingleCompany } from "@entities/company"

export const fakeCompanies = (
  type: "participation" | "invites" | "requests",
  userId: string | number,
): SingleCompany[] => [
  {
    company_id: 1,
    company_name: `${type}: Company 1`,
    company_title: `Title 1 (UserId: ${userId}  )`,
    company_avatar: null,
    is_visible: true,
  },
  {
    company_id: 2,
    company_name: `${type}: Company 2`,
    company_title: `Title 2 (UserId: ${userId})`,
    company_avatar: null,
    is_visible: true,
  },
  {
    company_id: 3,
    company_name: `${type}: Company 3`,
    company_title: `Title 3 (UserId: ${userId})`,
    company_avatar: null,
    is_visible: true,
  },
]
