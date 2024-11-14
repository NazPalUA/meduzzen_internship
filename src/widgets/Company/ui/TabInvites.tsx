"use client"

import { CompanyDetails } from "@entities/company"
import { useRedirectIfNoPermission } from "../lib/hooks/useRedirectIfNoPermission"
import { Permission } from "../lib/model/Permission"
import { InviteFromCompany } from "./InviteFromCompany"
import { InvitesList } from "./InvitesList"
import styles from "./Styles.module.scss"

export function TabInvites({
  company: { company_id },
  permission: { isOwner },
}: {
  company: CompanyDetails
  permission: Permission
}) {
  useRedirectIfNoPermission(!isOwner, company_id)
  if (!isOwner) return null

  return (
    <div className={styles.invites}>
      <InviteFromCompany companyId={company_id} />
      <InvitesList companyId={company_id} />
    </div>
  )
}
