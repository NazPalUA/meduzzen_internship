"use client"

import { QuizDetails } from "@entities/quiz"
import { useGetUserRatingAnalyticForQuizQuery } from "@features/user-data"
import { ContentDialog, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { QuizAnalytics } from "./QuizAnalytics"

export function QuizAnalyticsDialog({
  userId,
  quizDetails,
}: {
  userId: number
  quizDetails: QuizDetails
}) {
  const {
    data: ratingAnalytic,
    isLoading,
    isError,
  } = useGetUserRatingAnalyticForQuizQuery({
    userId,
    quizId: quizDetails.quiz_id,
  })

  const t = useTranslations("UserPage.quizzes")

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />
    if (isError) return <ErrorMessage />
    if (!ratingAnalytic?.length) return <p>{t("noAnalyticsData")}</p>
    return (
      <QuizAnalytics
        ratingAnalytic={ratingAnalytic}
        label={quizDetails.quiz_title || quizDetails.quiz_name}
      />
    )
  }

  return <ContentDialog title={quizDetails.quiz_name}>{renderContent()}</ContentDialog>
}
