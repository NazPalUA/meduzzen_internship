import { Quiz } from "@features/take-quiz"
import { Container } from "@shared/components/ui"

type Params = {
  quizId: string
}

export default function QuizPage({ params }: { params: Params }) {
  const { quizId } = params

  return (
    <Container>
      <Quiz quizId={quizId} />
    </Container>
  )
}
