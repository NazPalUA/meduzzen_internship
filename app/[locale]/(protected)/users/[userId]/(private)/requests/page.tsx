"use client"

import { UserRequests } from "@widgets/UserRequests"

type Params = {
  userId: string
}

export default function UserRequestsPage({ params }: { params: Params }) {
  const userId = Number(params.userId)

  return <UserRequests user_id={userId} />
}
