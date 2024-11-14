"use client"

import { useGetUserInvitesListQuery } from "@features/user-data"
import List from "@mui/material/List"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { InviteItem } from "./InviteItem"

export function InvitesList({ user_id }: { user_id: number }) {
  const { data: companies, isLoading, isError } = useGetUserInvitesListQuery(user_id)
  const t = useTranslations("UserPage.invites")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!companies?.length) return <p>{t("noInvites")}</p>

  return (
    <List>
      {companies.map((company) => (
        <InviteItem key={company.company_id} company={company} />
      ))}
    </List>
  )
}
