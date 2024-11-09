"use client"

import { useGetCompanyByIdQuery } from "@entities/company"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { CompanyDetails } from "./CompanyDetails"

export function CompanyProfile({ companyId }: { companyId: string }) {
  const { data: company, isLoading, isError } = useGetCompanyByIdQuery(companyId)

  if (isLoading) return <LoadingSpinner />

  if (isError || !company) return <ErrorMessage />

  return <CompanyDetails company={company} />
}
