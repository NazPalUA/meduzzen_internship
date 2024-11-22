"use client"

import { UserQuizzes } from "@widgets/UserQuizzes"

type Params = {
  userId: string
}

export default function UserQuizzesPage({ params }: { params: Params }) {
  const userId = Number(params.userId)

  return <UserQuizzes user_id={userId} />
}
