"use client"

import { useGetQuizzesLastPassInCompanyQuery } from "@features/company-data"
import { Chip } from "@mui/material"
import { formatDate } from "@shared/utils"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

export function MemberLastPass({ companyId, user_id }: { companyId: number; user_id: number }) {
  const t = useTranslations("CompanyPage.members")
  const {
    data: quizzesLastPassData,
    isLoading,
    isError,
  } = useGetQuizzesLastPassInCompanyQuery(companyId)

  const userQuizzesLastPass = useMemo(() => {
    return quizzesLastPassData?.find((pass) => pass.user_id === user_id)
  }, [quizzesLastPassData, user_id])

  const latestUserQuizPass = useMemo(() => {
    if (!userQuizzesLastPass || !userQuizzesLastPass.quizzes.length) return null

    return userQuizzesLastPass.quizzes.reduce((latestQuiz, currentQuiz) => {
      return new Date(currentQuiz.last_quiz_pass_at) > new Date(latestQuiz.last_quiz_pass_at)
        ? currentQuiz
        : latestQuiz
    })
  }, [userQuizzesLastPass])

  let lastPassLabel = "__ . __ . __ , __ : __"
  if (!isError && !isLoading && latestUserQuizPass)
    lastPassLabel = formatDate(latestUserQuizPass.last_quiz_pass_at)

  return (
    <Chip
      size="small"
      variant="outlined"
      label={<span>{`${t("lastPass")}: ${lastPassLabel}`}</span>}
      color="default"
    />
  )
}
