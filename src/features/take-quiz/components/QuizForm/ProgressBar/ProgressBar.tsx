import styles from "./ProgressBar.module.scss"

export function ProgressBar({
  currentQuestion,
  totalQuestions,
}: {
  currentQuestion: number
  totalQuestions: number
}) {
  return (
    <div className={styles.container}>
      <div
        className={styles.progress}
        style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
      />
    </div>
  )
}
