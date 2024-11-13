"use client"

import { useGetCompanyByIdQuery } from "@entities/company"
import { useSession } from "@entities/session"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { Dashboard } from "./Dashboard"

export function Company({ companyId }: { companyId: string }) {
  const { data: company, isLoading, isError } = useGetCompanyByIdQuery(companyId)
  const { user } = useSession()

  // TODO: check if user is admin of the company
  const admin = user?.user_id === company?.company_owner.user_id

  if (!user) return null

  if (isLoading) return <LoadingSpinner />

  if (isError || !company) return <ErrorMessage />

  return <Dashboard company={company} admin={admin} user={user} />
}
