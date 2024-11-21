"use client"

import { EmojiEvents as TrophyIcon } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useRouter } from "@navigation"
import { useTranslations } from "next-intl"
import styles from "./QuizResults.module.scss"

const SCORE_COLORS = {
  excellent: "var(--mui-palette-success-main)",
  good: "var(--mui-palette-warning-main)",
  needsPractice: "var(--mui-palette-error-main)",
} as const

const SCORE_RANGE = {
  excellent: 80,
  good: 60,
  needsPractice: 0,
} as const

type ScoreCategory = keyof typeof SCORE_COLORS

export function QuizResults({
  result_score,
  resetQuiz,
}: {
  result_score: number
  resetQuiz: () => void
}) {
  const t = useTranslations("TakeQuiz")
  const router = useRouter()

  const getScoreCategory = (): ScoreCategory => {
    if (result_score >= SCORE_RANGE.excellent) return "excellent"
    if (result_score >= SCORE_RANGE.good) return "good"
    return "needsPractice"
  }

  const scoreCategory = getScoreCategory()
  const scoreColor = SCORE_COLORS[scoreCategory]

  return (
    <div className={styles.results}>
      <TrophyIcon className={styles.trophyIcon} style={{ color: scoreColor }} />
      <h2>{t("results.title")}</h2>
      <div className={styles.score} style={{ color: scoreColor }}>
        {result_score}%
      </div>
      <p className={styles.message}>{t(`results.${scoreCategory}`)}</p>
      <div className={styles.actions}>
        <Button variant="contained" color="primary" onClick={() => router.back()}>
          {t("results.backToQuizzes")}
        </Button>
        <Button variant="contained" color="success" onClick={resetQuiz}>
          {t("results.retakeQuiz")}
        </Button>
      </div>
    </div>
  )
}
