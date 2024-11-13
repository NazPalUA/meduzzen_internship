"use client"

import { useSession } from "@entities/session"
import { useGetUserByIdQuery } from "@entities/user"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { Dashboard } from "./Dashboard"

export function User({ userId }: { userId: string }) {
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId)
  const { user: sessionUser } = useSession()

  const isOwner = sessionUser?.user_id === user?.user_id

  if (isLoading) return <LoadingSpinner />

  if (isError || !user) return <ErrorMessage />

  return <Dashboard user={user} isOwner={isOwner} />
}
