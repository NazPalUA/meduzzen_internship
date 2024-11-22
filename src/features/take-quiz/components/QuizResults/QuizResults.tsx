"use client"

import { EmojiEvents as TrophyIcon } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useRouter } from "@navigation"
import { useTranslations } from "next-intl"
import { SCORE_COLORS } from "../../constants"
import { getScoreCategory } from "../../utils/getScoreCategory"
import styles from "./QuizResults.module.scss"

export function QuizResults({ score, resetQuiz }: { score: number; resetQuiz: () => void }) {
  const t = useTranslations("TakeQuiz")
  const router = useRouter()

  const scoreCategory = getScoreCategory(score)
  const scoreColor = SCORE_COLORS[scoreCategory]

  return (
    <div className={styles.container}>
      <TrophyIcon className={styles.trophyIcon} style={{ color: scoreColor }} />
      <h2 className={styles.title}>{t("results.title")}</h2>
      <div className={styles.score} style={{ color: scoreColor }}>
        {score}%
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
