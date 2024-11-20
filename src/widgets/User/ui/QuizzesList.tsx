"use client"

import { DownloadMyAnswers } from "@features/download-my-answers"
import { useGetUserQuizzesLastPassQuery } from "@features/user-data"
import List from "@mui/material/List"
import { LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { QuizItem } from "./QuizItem"

export function QuizzesList({ user_id }: { user_id: number }) {
  const { data: quizzes, isLoading, isError } = useGetUserQuizzesLastPassQuery(user_id)
  const t = useTranslations("UserPage.quizzes")

  if (isLoading) return <LoadingSpinner />
  // Server returns 400 if user has no quizzes
  if (isError || !quizzes?.length) return <p>{t("noQuizzes")}</p>

  return (
    <>
      <DownloadMyAnswers userId={user_id} />
      <List>
        {quizzes.map((quiz) => (
          <QuizItem key={quiz.quiz_id} userId={user_id} quiz={quiz} />
        ))}
      </List>
    </>
  )
}
