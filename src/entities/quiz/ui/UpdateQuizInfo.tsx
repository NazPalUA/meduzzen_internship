"use client "

import { UpdateQuizInfoCredentials, useGetQuizByIdQuery } from "@entities/quiz"
import { ContentDialog, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { UpdateQuizInfoForm } from "./UpdateQuizInfoForm"

export function UpdateQuizInfo({ quizId }: { quizId: number }) {
  const { data, isLoading, isError } = useGetQuizByIdQuery(quizId)

  if (isLoading) return <LoadingSpinner />
  if (isError || !data) return <ErrorMessage />

  const quizData: UpdateQuizInfoCredentials = {
    quiz_name: data.quiz_name,
    quiz_title: data.quiz_title || "",
    quiz_description: data.quiz_description || "",
    quiz_frequency: data.quiz_frequency,
  }

  return (
    <ContentDialog>
      <UpdateQuizInfoForm quizId={quizId} quizData={quizData} />
    </ContentDialog>
  )
}
