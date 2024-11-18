"use client"

import { useGetUserQuizzesLastPassQuery } from "@features/user-data"
import List from "@mui/material/List"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { QuizItem } from "./QuizItem"

export function QuizzesList({ user_id }: { user_id: number }) {
  const { data: quizzes, isLoading, isError } = useGetUserQuizzesLastPassQuery(user_id)
  const t = useTranslations("UserPage.quizzes")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!quizzes?.length) return <p>{t("noQuizzes")}</p>

  return (
    <List>
      {quizzes.map((quiz) => (
        <QuizItem key={quiz.quiz_id} userId={user_id} quiz={quiz} />
      ))}
    </List>
  )
}
