import { useTranslations } from "next-intl"
import styles from "./Question.module.scss"

type Props = {
  questionNumber: number
  totalQuestions: number
  questionText: string
}

export function Question({ questionNumber, totalQuestions, questionText }: Props) {
  const t = useTranslations("TakeQuiz")

  return (
    <div className={styles.container}>
      <h3 className={styles.counter}>
        {t("questionNumber", {
          number: questionNumber,
          total: totalQuestions,
        })}
      </h3>
      <p className={styles.question}>{questionText}</p>
    </div>
  )
}
