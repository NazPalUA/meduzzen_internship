"use client"

import { useGetQuizByIdQuery } from "@entities/quiz"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { QuizForm } from "./QuizForm"

export function Quiz({ quizId }: { quizId: string }) {
  const { data, isLoading, isError } = useGetQuizByIdQuery(Number(quizId))

  if (isLoading) return <LoadingSpinner />
  if (isError || !data) return <ErrorMessage />

  return <QuizForm quiz={data} />
}
