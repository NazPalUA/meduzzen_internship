"use client"

import { useGetUserByIdQuery } from "@entities/user"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { UserInfo } from "@widgets/UserInfo"

type Params = {
  userId: string
}

export default function UserProfile({ params }: { params: Params }) {
  const { userId } = params

  const { data: user, isLoading, isError } = useGetUserByIdQuery(Number(userId))

  if (isLoading) return <LoadingSpinner />

  if (isError || !user) return <ErrorMessage />

  return <UserInfo user={user} />
}
