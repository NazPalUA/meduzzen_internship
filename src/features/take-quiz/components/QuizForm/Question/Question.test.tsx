import { screen } from "@testing-library/react"
import { render } from "../../../utils/test-utils"
import { Question } from "./Question"

test("renders question number and text", () => {
  render(
    <Question
      questionNumber={1}
      totalQuestions={5}
      questionText="What is the capital of France?"
    />,
  )
  expect(screen.getByText("Question 1 of 5")).toBeInTheDocument()
  expect(screen.getByText("What is the capital of France?")).toBeInTheDocument()
})
