"use client"

import { useGetCompanyQuizzesListQuery } from "@features/company-data"
import List from "@mui/material/List"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { Permission } from "../lib/model/Permission"
import { QuizItem } from "./QuizItem"

export function QuizzesList({
  companyId,
  permission,
}: {
  companyId: number
  permission: Permission
}) {
  const { data: quizzes, isLoading, isError } = useGetCompanyQuizzesListQuery(companyId)

  const t = useTranslations("CompanyPage.quizzes")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!quizzes?.length) return <p>{t("noQuizzes")}</p>

  return (
    <List>
      {quizzes.map((quiz) => (
        <QuizItem key={quiz.quiz_id} quiz={quiz} permission={permission} />
      ))}
    </List>
  )
}
