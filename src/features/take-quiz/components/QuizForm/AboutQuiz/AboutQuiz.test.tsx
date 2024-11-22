import { QuizDetails } from "@entities/quiz"
import { screen } from "@testing-library/react"
import { render } from "../../../utils/test-utils"
import { AboutQuiz } from "./AboutQuiz"

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
  questions_list: [],
}

test("renders quiz title, description, and author", () => {
  render(<AboutQuiz quiz={mockQuiz} />)
  expect(screen.getByText("Sample Quiz")).toBeInTheDocument()
  expect(screen.getByText("A sample quiz for testing.")).toBeInTheDocument()
  expect(screen.getByText("Created by John Doe")).toBeInTheDocument()
})
