"use client"

import { CompanyDetails } from "@entities/company"
import { CurrentUser } from "@entities/session"
import { Settings } from "@features/manage-company"
import { AdminPanelSettings as AdminIcon, Groups as MemberIcon } from "@mui/icons-material"
import { Permission } from "../lib/model/Permission"
import { RequestFromUser } from "./RequestFromUser"

export function HeaderAction({
  company,
  currentUser,
  permission: { isOwner, isAdmin, isMember },
}: {
  company: CompanyDetails
  currentUser: CurrentUser
  permission: Permission
}) {
  if (isOwner) return <Settings />
  if (isAdmin) return <AdminIcon fontSize="large" />
  if (isMember) return <MemberIcon fontSize="large" />

  return <RequestFromUser companyId={company.company_id} userId={currentUser.user_id} />
}
