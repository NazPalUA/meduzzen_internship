"use client"

import { useTakeQuizMutation } from "@entities/quiz/"
import type { QuizDetails } from "@entities/quiz/model"
import { useToaster } from "@shared/hooks"
import { useState } from "react"
import { QuizResults } from "../QuizResults/QuizResults"
import { AboutQuiz } from "./AboutQuiz/AboutQuiz"
import { AnswerOptions } from "./AnswerOptions/AnswerOptions"
import { NavigationButtons } from "./NavigationButtons/NavigationButtons"
import { ProgressBar } from "./ProgressBar/ProgressBar"
import { Question } from "./Question/Question"
import styles from "./QuizForm.module.scss"

export function QuizForm({ quiz }: { quiz: QuizDetails }) {
  const [submitQuiz, { isLoading: isSubmittingQuiz }] = useTakeQuizMutation()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [quizResult, setQuizResult] = useState<number | null>(null)

  const { toastError } = useToaster()

  const currentQuestionData = quiz.questions_list[currentQuestionIndex]
  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex === quiz.questions_list.length - 1
  const isAnswerSelected = Boolean(answers[currentQuestionData.question_id.toString()])

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionData.question_id.toString()]: value,
    }))
  }

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (!isLastQuestion && isAnswerSelected) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const result = await submitQuiz({
        quizId: quiz.quiz_id,
        answers,
      }).unwrap()
      setQuizResult(result.result_score)
    } catch {
      toastError()
    }
  }

  function resetQuiz() {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setQuizResult(null)
  }

  if (quizResult !== null) {
    return <QuizResults score={quizResult} resetQuiz={resetQuiz} />
  }

  return (
    <div className={styles.form}>
      <AboutQuiz quiz={quiz} />

      <ProgressBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quiz.questions_list.length}
      />

      <Question
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={quiz.questions_list.length}
        questionText={currentQuestionData.question_text}
      />

      <AnswerOptions
        answers={currentQuestionData.question_answers}
        selectedAnswer={answers[currentQuestionData.question_id.toString()] || ""}
        handleAnswerChange={handleAnswerChange}
      />

      <NavigationButtons
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        isSubmitting={isSubmittingQuiz}
        isAnswerSelected={isAnswerSelected}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
