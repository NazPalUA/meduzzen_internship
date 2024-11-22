"use client"

import { useTakeQuizMutation } from "@entities/quiz"
import type { QuizDetails } from "@entities/quiz/model"
import { useToaster } from "@shared/hooks"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { render } from "../../utils/test-utils"
import { QuizForm } from "./QuizForm"

jest.mock("@entities/quiz", () => ({ useTakeQuizMutation: jest.fn() }))
jest.mock("@navigation", () => ({ useRouter: jest.fn() }))
jest.mock("@shared/hooks", () => ({ useToaster: jest.fn() }))

const mockQuiz: QuizDetails = {
  quiz_id: 1,
  quiz_name: "General Knowledge",
  quiz_title: "Sample Quiz",
  quiz_description: "A sample quiz for testing.",
  quiz_frequency: 5,
  created_by: {
    user_id: 1,
    user_email: "john.doe@example.com",
    user_firstname: "John",
    user_lastname: "Doe",
    user_avatar: null,
  },
  questions_list: [
    {
      question_id: 101,
      question_text: "What is the capital of France?",
      question_answers: ["Paris", "London", "Rome", "Berlin"],
    },
    {
      question_id: 102,
      question_text: "What is 2 + 2?",
      question_answers: ["3", "4", "5", "6"],
    },
  ],
}

describe("QuizForm Component", () => {
  let submitQuizMock: jest.Mock
  let toastErrorMock: jest.Mock

  beforeEach(() => {
    submitQuizMock = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({ result_score: 100 }),
    })
    ;(useTakeQuizMutation as jest.Mock).mockReturnValue([submitQuizMock, { isLoading: false }])

    toastErrorMock = jest.fn()
    ;(useToaster as jest.Mock).mockReturnValue({
      toastError: toastErrorMock,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("navigation buttons behave correctly based on question state", () => {
    render(<QuizForm quiz={mockQuiz} />)

    const prevButton = screen.getByRole("button", { name: /previous/i })
    const nextButton = screen.getByRole("button", { name: /next/i })
    expect(prevButton).toBeDisabled()
    expect(nextButton).toBeDisabled()

    fireEvent.click(screen.getByLabelText("Paris"))
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)
    expect(prevButton).toBeEnabled()
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument()
  })

  test("navigates to the previous question upon clicking Previous", () => {
    render(<QuizForm quiz={mockQuiz} />)

    fireEvent.click(screen.getByLabelText("Paris"))
    fireEvent.click(screen.getByRole("button", { name: /next/i }))

    fireEvent.click(screen.getByRole("button", { name: /previous/i }))

    expect(screen.getByText("What is the capital of France?")).toBeInTheDocument()
  })

  test("displays quiz results after successful submission", async () => {
    render(<QuizForm quiz={mockQuiz} />)

    fireEvent.click(screen.getByLabelText("Paris"))
    fireEvent.click(screen.getByRole("button", { name: /next/i }))
    fireEvent.click(screen.getByLabelText("4"))
    fireEvent.click(screen.getByRole("button", { name: /submit/i }))

    await screen.findByText("Quiz Results")
    expect(screen.getByText("100%")).toBeInTheDocument()
  })

  test("displays error message when quiz submission fails", async () => {
    submitQuizMock.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(new Error("Submission failed")),
    })
    render(<QuizForm quiz={mockQuiz} />)

    fireEvent.click(screen.getByLabelText("Paris"))
    fireEvent.click(screen.getByRole("button", { name: /next/i }))
    fireEvent.click(screen.getByLabelText("4"))
    fireEvent.click(screen.getByRole("button", { name: /submit/i }))

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalled()
    })
  })

  test("resets the quiz after viewing results", async () => {
    render(<QuizForm quiz={mockQuiz} />)

    fireEvent.click(screen.getByLabelText("Paris"))
    fireEvent.click(screen.getByRole("button", { name: /next/i }))
    fireEvent.click(screen.getByLabelText("4"))
    fireEvent.click(screen.getByRole("button", { name: /submit/i }))

    await screen.findByText("Quiz Results")

    fireEvent.click(screen.getByRole("button", { name: /retake quiz/i }))

    expect(screen.getByText("Sample Quiz")).toBeInTheDocument()
    expect(screen.getByText("A sample quiz for testing.")).toBeInTheDocument()
    expect(screen.getByText("What is the capital of France?")).toBeInTheDocument()
  })
})
