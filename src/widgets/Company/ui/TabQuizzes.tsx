"use client"

import { CompanyDetails } from "@entities/company"
import { useRedirectIfNoPermission } from "../lib/hooks/useRedirectIfNoPermission"
import { Permission } from "../lib/model/Permission"
import { QuizCreate } from "./QuizCreate"
import { QuizzesList } from "./QuizzesList"
import styles from "./Styles.module.scss"

export function TabQuizzes({
  company: { company_id },
  permission,
}: {
  company: CompanyDetails
  permission: Permission
}) {
  useRedirectIfNoPermission(permission.isOutsider, company_id)
  if (permission.isOutsider) return null

  const showCreateQuiz = permission.isAdmin || permission.isOwner

  return (
    <div className={styles.invites}>
      {showCreateQuiz && <QuizCreate companyId={company_id} />}
      <QuizzesList companyId={company_id} permission={permission} />
    </div>
  )
}
