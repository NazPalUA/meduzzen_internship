"use client"

import { useGetUserRequestsListQuery } from "@features/user-data"
import List from "@mui/material/List"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { RequestItem } from "./RequestItem"

export function RequestsList({ user_id }: { user_id: number }) {
  const { data: companies, isLoading, isError } = useGetUserRequestsListQuery(user_id)
  const t = useTranslations("UserPage.requests")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!companies?.length) return <p>{t("noRequests")}</p>

  return (
    <List>
      {companies.map((company) => (
        <RequestItem key={company.company_id} company={company} />
      ))}
    </List>
  )
}
