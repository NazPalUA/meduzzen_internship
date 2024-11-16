"use client"

import { CompanyDetails } from "@entities/company"
import { useRedirectIfNoPermission } from "../lib/hooks/useRedirectIfNoPermission"
import { Permission } from "../lib/model/Permission"
import { RequestsList } from "./RequestsList"

export function TabRequests({
  company: { company_id },
  permission: { isOwner },
}: {
  company: CompanyDetails
  permission: Permission
}) {
  useRedirectIfNoPermission(!isOwner, company_id)
  if (!isOwner) return null

  return <RequestsList companyId={company_id} />
}
