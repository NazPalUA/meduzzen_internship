"use client"

import { useGetQuizzesLastPassInCompanyQuery } from "@features/company-data"
import { Chip } from "@mui/material"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { formatDate } from "../lib/utils/formatDate"

export function MemberLastPass({ companyId, user_id }: { companyId: number; user_id: number }) {
  const t = useTranslations("CompanyPage.members")

  const { data: lastPass, isLoading, isError } = useGetQuizzesLastPassInCompanyQuery(companyId)

  const userLastPass = useMemo(() => {
    return lastPass?.find((pass) => pass.user_id === user_id)
  }, [lastPass, user_id])

  const userLastPassQuiz = useMemo(() => {
    if (!userLastPass || !userLastPass.quizzes.length) return null

    return userLastPass.quizzes.reduce((latestQuiz, currentQuiz) => {
      return new Date(currentQuiz.last_quiz_pass_at) > new Date(latestQuiz.last_quiz_pass_at)
        ? currentQuiz
        : latestQuiz
    })
  }, [userLastPass])

  function getLastPassLabel(text: string) {
    return (
      <Chip
        size="small"
        variant="outlined"
        label={<span>{`${t("lastPass")}: ${text}`}</span>}
        color={"default"}
      />
    )
  }

  if (isLoading) return getLastPassLabel("...")
  if (isError || !userLastPassQuiz) return null

  return getLastPassLabel(formatDate(userLastPassQuiz.last_quiz_pass_at))
}
