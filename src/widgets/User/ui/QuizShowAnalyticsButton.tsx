"use client"

import { useDialog } from "@/src/shared/hooks"
import { QuizDetails } from "@entities/quiz"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import { Button } from "@mui/material"
import { useTranslations } from "next-intl"
import { QuizAnalyticsDialog } from "./QuizAnalyticsDialog"
import styles from "./Styles.module.scss"

export function QuizShowAnalyticsButton({
  userId,
  quizDetails,
}: {
  userId: number
  quizDetails?: QuizDetails
}) {
  const t = useTranslations("UserPage.quizzes")
  const { openDialog } = useDialog()

  if (!quizDetails) return null
  return (
    <Button
      variant="outlined"
      size="small"
      className={styles.showAnalyticsButton}
      aria-label={t("showAnalytics")}
      onClick={() =>
        openDialog(<QuizAnalyticsDialog userId={userId} quizDetails={quizDetails} />, {
          maxWidth: "lg",
        })
      }
    >
      <QueryStatsOutlinedIcon />
    </Button>
  )
}
