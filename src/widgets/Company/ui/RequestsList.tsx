"use client"

import { useGetCompanyRequestsListQuery } from "@features/company-data"
import List from "@mui/material/List"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { RequestItem } from "./RequestItem"

export function RequestsList({ companyId }: { companyId: number }) {
  const { data: users, isLoading, isError } = useGetCompanyRequestsListQuery(companyId)
  const t = useTranslations("CompanyPage.requests")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!users?.length) return <p>{t("noRequests")}</p>

  return (
    <List>
      {users.map((user) => (
        <RequestItem key={user.user_id} user={user} />
      ))}
    </List>
  )
}
