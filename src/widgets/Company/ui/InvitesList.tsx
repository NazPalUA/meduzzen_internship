"use client"

import { useGetCompanyInvitesListQuery } from "@features/company-data"
import List from "@mui/material/List"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { InviteItem } from "./InviteItem"

export function InvitesList({ companyId }: { companyId: number }) {
  const { data: users, isLoading, isError } = useGetCompanyInvitesListQuery(companyId.toString())
  const t = useTranslations("CompanyPage.invites")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!users?.length) return <p>{t("noInvites")}</p>

  return (
    <List>
      {users.map((user) => (
        <InviteItem key={user.user_id} user={user} />
      ))}
    </List>
  )
}
