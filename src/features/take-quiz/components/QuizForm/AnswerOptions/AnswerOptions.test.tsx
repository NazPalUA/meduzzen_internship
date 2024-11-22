import { fireEvent, screen } from "@testing-library/react"
import { render } from "../../../utils/test-utils"
import { AnswerOptions } from "./AnswerOptions"

const mockAnswers = ["Paris", "London", "Rome", "Berlin"]

test("renders answer options and handles selection", () => {
  const handleAnswerChange = jest.fn()
  render(
    <AnswerOptions
      answers={mockAnswers}
      selectedAnswer=""
      handleAnswerChange={handleAnswerChange}
    />,
  )

  mockAnswers.forEach((answer) => {
    expect(screen.getByLabelText(answer)).toBeInTheDocument()
  })

  fireEvent.click(screen.getByLabelText("Paris"))
  expect(handleAnswerChange).toHaveBeenCalledWith("Paris")
})
