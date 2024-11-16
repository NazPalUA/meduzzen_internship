"use client"

import { useGetCompanyMembersListQuery } from "@features/company-data"
import List from "@mui/material/List"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { Permission } from "../lib/model/Permission"
import { filterMembers } from "../lib/utils/filterMembers"
import { MemberItem } from "./MemberItem"

export function MembersList({
  companyId,
  showAdminOnly,
  permission,
}: {
  companyId: number
  showAdminOnly: boolean
  permission: Permission
}) {
  const { data, isLoading, isError } = useGetCompanyMembersListQuery(companyId)
  const t = useTranslations("CompanyPage.members")

  const members = filterMembers(data, showAdminOnly)

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!members?.length) return <p>{showAdminOnly ? t("noAdmins") : t("noMembers")}</p>

  return (
    <List>
      {members.map((member) => (
        <MemberItem key={member.user_id} member={member} permission={permission} />
      ))}
    </List>
  )
}
