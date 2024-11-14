"use client"

import { useGetCompanyByIdQuery } from "@entities/company"
import { useSession } from "@entities/session"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { usePermission } from "../lib/hooks/usePermission"
import { Dashboard } from "./Dashboard"

export function Company({ companyId }: { companyId: string }) {
  const { data: company, isLoading, isError } = useGetCompanyByIdQuery(companyId)
  const { user } = useSession()
  const {
    permission,
    isLoading: isPermissionLoading,
    isError: isPermissionError,
  } = usePermission(Number(companyId))

  if (!user) return null

  if (isLoading || isPermissionLoading) return <LoadingSpinner />

  if (isError || isPermissionError || !company) return <ErrorMessage />

  return <Dashboard company={company} currentUser={user} permission={permission} />
}
