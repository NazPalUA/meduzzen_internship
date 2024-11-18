import { UserDataCompany } from "@features/user-data"

export function getCurrentUserRequest(companyId: number, userRequestsList: UserDataCompany[]) {
  return userRequestsList.find((company) => company.company_id === companyId)
}
