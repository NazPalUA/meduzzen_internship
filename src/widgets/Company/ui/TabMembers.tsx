"use client"

import { CompanyDetails } from "@entities/company"
import { AdminPanelSettings as AdminIcon } from "@mui/icons-material"
import { Switch } from "@mui/material"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useRedirectIfNoPermission } from "../lib/hooks/useRedirectIfNoPermission"
import { Permission } from "../lib/model/Permission"
import { MembersList } from "./MembersList"
import styles from "./Styles.module.scss"

export function TabMembers({
  company: { company_id },
  permission,
}: {
  company: CompanyDetails
  permission: Permission
}) {
  const [adminOnly, setAdminOnly] = useState(false)

  const t = useTranslations("CompanyPage.nav")

  useRedirectIfNoPermission(permission.isOutsider, company_id)
  if (permission.isOutsider) return null

  return (
    <div className={styles.members}>
      <div className={styles.members__adminOnly}>
        <Switch
          checked={adminOnly}
          onChange={(e) => setAdminOnly(e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
          id="adminOnly"
        />
        <label htmlFor="adminOnly" className={styles.members__adminOnlyLabel}>
          <AdminIcon color="info" />
          {t("showAdminsOnly")}
        </label>
      </div>
      <MembersList companyId={company_id} showAdminOnly={adminOnly} permission={permission} />
    </div>
  )
}
