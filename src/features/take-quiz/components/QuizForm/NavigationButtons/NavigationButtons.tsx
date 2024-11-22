import { Button, CircularProgress } from "@mui/material"
import { useTranslations } from "next-intl"
import styles from "./NavigationButtons.module.scss"

type Props = {
  isFirstQuestion: boolean
  isLastQuestion: boolean
  isSubmitting: boolean
  isAnswerSelected: boolean
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => Promise<void>
}

export function NavigationButtons({
  isFirstQuestion,
  isLastQuestion,
  isSubmitting,
  isAnswerSelected,
  onPrevious,
  onNext,
  onSubmit,
}: Props) {
  const t = useTranslations("TakeQuiz")

  const disableProceed = !isAnswerSelected || isSubmitting

  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        variant="outlined"
        onClick={onPrevious}
        disabled={isFirstQuestion || isSubmitting}
      >
        {t("nav.previous")}
      </Button>

      {isLastQuestion ? (
        <Button
          className={styles.button}
          variant="contained"
          onClick={onSubmit}
          disabled={disableProceed}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
        >
          {t("nav.submit")}
        </Button>
      ) : (
        <Button
          className={styles.button}
          variant="contained"
          onClick={onNext}
          disabled={disableProceed}
        >
          {t("nav.next")}
        </Button>
      )}
    </div>
  )
}
