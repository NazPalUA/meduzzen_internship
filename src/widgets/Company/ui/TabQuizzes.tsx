"use client"

import { CompanyDetails } from "@entities/company"
import { useRedirectIfNoPermission } from "../lib/hooks/useRedirectIfNoPermission"
import { Permission } from "../lib/model/Permission"
import { QuizCreate } from "./QuizCreate"
import { QuizzesList } from "./QuizzesList"
import { QuizzesShowAnalytics } from "./QuizzesShowAnalytics"
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

  const showActions = permission.isAdmin || permission.isOwner

  return (
    <div className={styles.invites}>
      {showActions && (
        <div className={styles.quizzes__actionsBtns}>
          <QuizCreate companyId={company_id} />
          <QuizzesShowAnalytics companyId={company_id} />
        </div>
      )}
      <QuizzesList companyId={company_id} permission={permission} />
    </div>
  )
}
