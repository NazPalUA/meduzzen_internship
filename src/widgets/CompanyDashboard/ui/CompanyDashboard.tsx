"use client"

import { useGetCompanyByIdQuery } from "@entities/company"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { Dashboard } from "./Dashboard"

export function CompanyDashboard({ companyId }: { companyId: string }) {
  const { data: company, isLoading, isError } = useGetCompanyByIdQuery(companyId)

  if (isLoading) return <LoadingSpinner />

  if (isError || !company) return <ErrorMessage />

  return <Dashboard company={company} />
}
