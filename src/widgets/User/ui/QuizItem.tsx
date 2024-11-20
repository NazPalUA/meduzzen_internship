"use client"

import { useGetQuizByIdQuery } from "@entities/quiz"
import { UserDataQuizzesLastPass } from "@features/user-data"
import { Chip } from "@mui/material"
import MuiListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import { Avatar, ErrorMessage } from "@shared/components/ui"
import { formatDate } from "@shared/utils"
import { useTranslations } from "next-intl"
import { QuizShowAnalyticsButton } from "./QuizShowAnalyticsButton"

export function QuizItem({ userId, quiz }: { userId: number; quiz: UserDataQuizzesLastPass }) {
  const { data: quizData, isLoading, isError } = useGetQuizByIdQuery(quiz.quiz_id)
  const t = useTranslations("UserPage.quizzes")

  if (isError) {
    return <ErrorMessage />
  }

  const quizName = isLoading ? "..." : quizData?.quiz_name || "..."
  const quizTitle = isLoading ? "..." : quizData?.quiz_title || "..."
  const lastAttemptLabel = `${t("lastAttempt")}: ${formatDate(quiz.last_quiz_pass_at)}`

  return (
    <MuiListItem
      secondaryAction={
        <>
          <Chip
            size="small"
            variant="outlined"
            label={<span>{lastAttemptLabel}</span>}
            color="default"
          />
          <QuizShowAnalyticsButton userId={userId} quizDetails={quizData} />
        </>
      }
    >
      <ListItemAvatar>
        <Avatar alt={quizName} size="sm" />
      </ListItemAvatar>

      <ListItemText primary={quizName} secondary={quizTitle} />
    </MuiListItem>
  )
}
