import { useGetQuizByIdQuery } from "@entities/quiz"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { render, screen } from "@testing-library/react"
import { QuizForm } from "../QuizForm/QuizForm"
import { Quiz } from "./Quiz"

jest.mock("@entities/quiz", () => ({ useGetQuizByIdQuery: jest.fn() }))

jest.mock("../QuizForm/QuizForm", () => ({
  QuizForm: jest.fn(() => <div>QuizForm Component</div>),
}))

jest.mock("@shared/components/ui", () => ({
  LoadingSpinner: jest.fn(() => <div>LoadingSpinner</div>),
  ErrorMessage: jest.fn(() => <div>ErrorMessage</div>),
}))

describe("Quiz Component", () => {
  const mockUseGetQuizByIdQuery = useGetQuizByIdQuery as jest.Mock

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("renders LoadingSpinner when loading", () => {
    mockUseGetQuizByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    })

    render(<Quiz quizId="1" />)

    expect(screen.getByText("LoadingSpinner")).toBeInTheDocument()
    expect(LoadingSpinner).toHaveBeenCalled()
  })

  test("renders ErrorMessage when there is an error", () => {
    mockUseGetQuizByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    })

    render(<Quiz quizId="1" />)

    expect(screen.getByText("ErrorMessage")).toBeInTheDocument()
    expect(ErrorMessage).toHaveBeenCalled()
  })

  test("renders ErrorMessage when data is undefined", () => {
    mockUseGetQuizByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    })

    render(<Quiz quizId="1" />)

    expect(screen.getByText("ErrorMessage")).toBeInTheDocument()
    expect(ErrorMessage).toHaveBeenCalled()
  })

  test("renders QuizForm with fetched data", () => {
    const mockData = {
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
      ],
    }

    mockUseGetQuizByIdQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    })

    render(<Quiz quizId="1" />)

    expect(screen.getByText("QuizForm Component")).toBeInTheDocument()
    expect(QuizForm).toHaveBeenCalledWith({ quiz: mockData }, {})
  })
})
