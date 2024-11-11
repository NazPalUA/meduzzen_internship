"use client"

import { useGetUserByIdQuery } from "@entities/user"
import { ErrorMessage } from "@shared/components/ui"
import { UserDetails } from "./UserDetails"
import { UserDetailsSkeleton } from "./UserDetailsSkeleton"

export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId)

  if (isLoading) return <UserDetailsSkeleton />

  if (isError || !user) return <ErrorMessage />

  return <UserDetails user={user} />
}
