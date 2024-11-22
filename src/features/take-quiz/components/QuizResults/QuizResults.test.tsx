import { useRouter } from "@navigation"
import { fireEvent, screen } from "@testing-library/react"
import { render } from "../../utils/test-utils"
import { QuizResults } from "./QuizResults"

jest.mock("@navigation", () => ({
  useRouter: jest.fn(),
}))

describe("QuizResults Component", () => {
  const mockResetQuiz = jest.fn()
  const mockBack = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("renders result score and messages", () => {
    render(<QuizResults score={85} resetQuiz={mockResetQuiz} />)
    expect(screen.getByText("Quiz Results")).toBeInTheDocument()
    expect(screen.getByText("85%")).toBeInTheDocument()
    expect(screen.getByText("Excellent!")).toBeInTheDocument()
  })

  test("calls resetQuiz when 'Retake Quiz' button is clicked", () => {
    render(<QuizResults score={85} resetQuiz={mockResetQuiz} />)
    fireEvent.click(screen.getByRole("button", { name: /retake quiz/i }))
    expect(mockResetQuiz).toHaveBeenCalled()
  })

  test("navigates back when 'Back to Quizzes' button is clicked", () => {
    render(<QuizResults score={85} resetQuiz={mockResetQuiz} />)
    fireEvent.click(screen.getByRole("button", { name: /back to quizzes/i }))
    expect(mockBack).toHaveBeenCalled()
  })
})
