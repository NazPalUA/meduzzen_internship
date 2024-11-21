import { type Question } from "@entities/quiz"
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import styles from "./AnswerOptions.module.scss"

export function AnswerOptions({
  currentQuestion,
  selectedAnswer,
  handleAnswerChange,
}: {
  currentQuestion: Question
  selectedAnswer: string
  handleAnswerChange: (value: string) => void
}) {
  return (
    <FormControl component="fieldset" className={styles.container}>
      <RadioGroup value={selectedAnswer} onChange={(e) => handleAnswerChange(e.target.value)}>
        {currentQuestion.question_answers.map((answer, index) => (
          <FormControlLabel
            key={index}
            value={answer}
            control={<Radio />}
            label={answer}
            className={styles.answer}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
