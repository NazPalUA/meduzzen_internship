"use client"

import { UserInvites } from "@widgets/UserInvites"

type Params = {
  userId: string
}

export default function UserInvitesPage({ params }: { params: Params }) {
  const userId = Number(params.userId)

  return <UserInvites user_id={userId} />
}
