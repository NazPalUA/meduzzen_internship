import { fireEvent, screen } from "@testing-library/react"
import { render } from "../../../utils/test-utils"
import { NavigationButtons } from "./NavigationButtons"

describe("NavigationButtons Component", () => {
  test("Previous button is disabled when on the first question", () => {
    render(
      <NavigationButtons
        isFirstQuestion={true}
        isLastQuestion={false}
        isSubmitting={false}
        isAnswerSelected={true}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )
    const prevButton = screen.getByRole("button", { name: /previous/i })
    expect(prevButton).toBeDisabled()
  })

  test("Previous button is enabled when not on the first question and not submitting", () => {
    render(
      <NavigationButtons
        isFirstQuestion={false}
        isLastQuestion={false}
        isSubmitting={false}
        isAnswerSelected={true}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )
    const prevButton = screen.getByRole("button", { name: /previous/i })
    expect(prevButton).toBeEnabled()
  })

  test("renders Next button and handles click", () => {
    const onNext = jest.fn()
    render(
      <NavigationButtons
        isFirstQuestion={false}
        isLastQuestion={false}
        isSubmitting={false}
        isAnswerSelected={true}
        onPrevious={jest.fn()}
        onNext={onNext}
        onSubmit={jest.fn()}
      />,
    )
    const nextButton = screen.getByRole("button", { name: /next/i })
    expect(nextButton).toBeEnabled()
    fireEvent.click(nextButton)
    expect(onNext).toHaveBeenCalled()
  })

  test("Next button is disabled when no answer is selected", () => {
    render(
      <NavigationButtons
        isFirstQuestion={false}
        isLastQuestion={false}
        isSubmitting={false}
        isAnswerSelected={false}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )
    const nextButton = screen.getByRole("button", { name: /next/i })
    expect(nextButton).toBeDisabled()
  })

  test("Next button is not rendered when on the last question", () => {
    render(
      <NavigationButtons
        isFirstQuestion={false}
        isLastQuestion={true}
        isSubmitting={false}
        isAnswerSelected={true}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )
  })

  test("renders Submit button and handles click", () => {
    const onSubmit = jest.fn()
    render(
      <NavigationButtons
        isFirstQuestion={false}
        isLastQuestion={true}
        isSubmitting={false}
        isAnswerSelected={true}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
        onSubmit={onSubmit}
      />,
    )
    const submitButton = screen.getByRole("button", { name: /submit/i })
    expect(submitButton).toBeEnabled()
    fireEvent.click(submitButton)
    expect(onSubmit).toHaveBeenCalled()
  })

  test("Submit button is not rendered when not on the last question", () => {
    render(
      <NavigationButtons
        isFirstQuestion={false}
        isLastQuestion={false}
        isSubmitting={false}
        isAnswerSelected={true}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )
    const submitButton = screen.queryByRole("button", { name: /submit/i })
    expect(submitButton).not.toBeInTheDocument()
  })

  test("Submit button is disabled when no answer is selected", () => {
    render(
      <NavigationButtons
        isFirstQuestion={false}
        isLastQuestion={true}
        isSubmitting={false}
        isAnswerSelected={false}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )
    const submitButton = screen.getByRole("button", { name: /submit/i })
    expect(submitButton).toBeDisabled()
  })

  test("buttons are disabled when submitting", () => {
    render(
      <NavigationButtons
        isFirstQuestion={false}
        isLastQuestion={true}
        isSubmitting={true}
        isAnswerSelected={true}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )
    const prevButton = screen.getByRole("button", { name: /previous/i })
    const submitButton = screen.getByRole("button", { name: /submit/i })

    expect(prevButton).toBeDisabled()
    expect(submitButton).toBeDisabled()
  })

  test("displays spinner when submitting", () => {
    render(
      <NavigationButtons
        isFirstQuestion={false}
        isLastQuestion={true}
        isSubmitting={true}
        isAnswerSelected={true}
        onPrevious={jest.fn()}
        onNext={jest.fn()}
        onSubmit={jest.fn()}
      />,
    )
    const submitButton = screen.getByRole("button", { name: /submit/i })
    expect(submitButton.querySelector("svg")).toBeInTheDocument()
  })
})
