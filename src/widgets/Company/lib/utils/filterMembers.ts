import { CompanyDataUser } from "@features/company-data"
import { Action } from "@shared/constants"

export function filterMembers(
  users: CompanyDataUser[] | undefined,
  showAdminOnly: boolean,
): CompanyDataUser[] | undefined {
  const filteredMembers = showAdminOnly
    ? users?.filter((user) => user.action === Action.ADMIN)
    : users

  return filteredMembers || []
}
