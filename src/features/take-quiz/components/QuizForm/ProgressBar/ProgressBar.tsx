import styles from "./ProgressBar.module.scss"

export function ProgressBar({
  currentQuestionIndex,
  totalQuestions,
}: {
  currentQuestionIndex: number
  totalQuestions: number
}) {
  return (
    <div className={styles.container}>
      <div
        className={styles.progress}
        style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
      />
    </div>
  )
}
