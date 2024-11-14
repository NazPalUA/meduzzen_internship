"use client"

import { useGetUserCompaniesListQuery } from "@features/user-data"
import List from "@mui/material/List"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { CompanyItem } from "./CompanyItem"

export function CompaniesList({ user_id }: { user_id: number }) {
  const { data: companies, isLoading, isError } = useGetUserCompaniesListQuery(user_id.toString())
  const t = useTranslations("UserPage.companies")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!companies?.length) return <p>{t("noCompanies")}</p>

  return (
    <List>
      {companies.map((company) => (
        <CompanyItem key={company.company_id} company={company} />
      ))}
    </List>
  )
}
