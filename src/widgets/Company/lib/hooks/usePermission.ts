"use client"

import { useSession } from "@entities/session"
import { useGetUserCompaniesListQuery } from "@features/user-data"
import { Action } from "@shared/constants"
import { Permission } from "../model/Permission"

type UsePermissionReturn = {
  isLoading: boolean
  isError: boolean
  permission: Permission
}

export const usePermission = (companyId: number): UsePermissionReturn => {
  const { user, isLoading: isSessionLoading, isError: isSessionError } = useSession()

  const userId = user?.user_id?.toString()

  const {
    data: userCompanies,
    isLoading: isUserCompaniesLoading,
    isError: isUserCompaniesError,
  } = useGetUserCompaniesListQuery(userId!, { skip: !userId })

  const currentCompany = userCompanies?.find((company) => company.company_id === companyId)

  return {
    isLoading: isSessionLoading || isUserCompaniesLoading,
    isError: isSessionError || isUserCompaniesError,
    permission: {
      isOwner: currentCompany?.action === Action.OWNER,
      isAdmin: currentCompany?.action === Action.ADMIN,
      isMember: currentCompany?.action === Action.MEMBER,
      isOutsider: !currentCompany,
      action: currentCompany?.action || null,
    },
  }
}
