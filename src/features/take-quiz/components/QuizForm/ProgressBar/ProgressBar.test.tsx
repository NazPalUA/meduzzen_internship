import { render } from "../../../utils/test-utils"
import { ProgressBar } from "./ProgressBar"
import styles from "./ProgressBar.module.scss"

test("renders progress bar with correct width", () => {
  const { container } = render(<ProgressBar currentQuestionIndex={1} totalQuestions={5} />)
  const progressElement = container.querySelector(`.${styles.progress}`)
  expect(progressElement).toHaveStyle("width: 40%")
})
