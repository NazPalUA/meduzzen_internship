import { QuizDetails } from "@entities/quiz"
import { PersonPinCircleOutlined as AuthorIcon } from "@mui/icons-material"
import styles from "./AboutQuiz.module.scss"

export function AboutQuiz({ quiz }: { quiz: QuizDetails }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{quiz.quiz_title || quiz.quiz_name}</h2>
      <p className={styles.description}>{quiz.quiz_description}</p>
      <p className={styles.author}>
        <AuthorIcon />
        Created by {quiz.created_by.user_firstname} {quiz.created_by.user_lastname}
      </p>
    </div>
  )
}
