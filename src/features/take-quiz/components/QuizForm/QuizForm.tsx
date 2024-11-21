"use client"

import { QuizDetails, useTakeQuizMutation } from "@entities/quiz"
import { PersonPinCircleOutlined as AuthorIcon } from "@mui/icons-material"
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { QuizResults } from "../QuizResults/QuizResults"
import styles from "./QuizForm.module.scss"

export function QuizForm({ quiz }: { quiz: QuizDetails }) {
  const [submitQuiz, { isLoading: isSubmittingQuiz }] = useTakeQuizMutation()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [quizResult, setQuizResult] = useState<number | null>(null)

  const t = useTranslations("TakeQuiz")

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [quiz.questions_list[currentQuestion].question_id.toString()]: value,
    }))
  }

  function resetQuiz() {
    setCurrentQuestion(0)
    setAnswers({})
    setQuizResult(null)
  }

  const handleSubmit = async () => {
    try {
      const result = await submitQuiz({
        quizId: quiz.quiz_id,
        answers,
      }).unwrap()
      setQuizResult(result.result_score)
    } catch (error) {
      console.error(error)
    }
  }

  if (quizResult !== null) {
    return <QuizResults result_score={quizResult} resetQuiz={resetQuiz} />
  }

  const currentQuestionData = quiz.questions_list[currentQuestion]
  const isLastQuestion = currentQuestion === quiz.questions_list.length - 1

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h2>{quiz.quiz_title || quiz.quiz_name}</h2>
        <p>{quiz.quiz_description}</p>
        <p className={styles.author}>
          <AuthorIcon />
          Created by {quiz.created_by.user_firstname} {quiz.created_by.user_lastname}
        </p>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${((currentQuestion + 1) / quiz.questions_list.length) * 100}%` }}
        />
      </div>

      <div className={styles.questionContainer}>
        <h3>
          {t("questionNumber", { number: currentQuestion + 1, total: quiz.questions_list.length })}
        </h3>
        <p className={styles.questionText}>{currentQuestionData.question_text}</p>

        <FormControl component="fieldset" className={styles.answers}>
          <RadioGroup
            value={answers[currentQuestionData.question_id.toString()] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
          >
            {currentQuestionData.question_answers.map((answer, index) => (
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
      </div>

      <div className={styles.navigation}>
        <Button
          variant="outlined"
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={currentQuestion === 0 || isSubmittingQuiz}
        >
          {t("nav.previous")}
        </Button>

        {isLastQuestion ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmittingQuiz || !answers[currentQuestionData.question_id.toString()]}
            startIcon={isSubmittingQuiz ? <CircularProgress size={16} /> : undefined}
          >
            {t("nav.submit")}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            disabled={!answers[currentQuestionData.question_id.toString()]}
          >
            {t("nav.next")}
          </Button>
        )}
      </div>
    </div>
  )
}
