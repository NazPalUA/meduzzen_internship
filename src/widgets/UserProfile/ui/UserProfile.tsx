"use client"

import { useGetUserByIdQuery } from "@entities/user"
import { ErrorMessage } from "@shared/ui/ErrorMessage"
import { UserDetails } from "./UserDetails"
import { UserDetailsSkeleton } from "./UserDetailsSkeleton"

export function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useGetUserByIdQuery(userId)

  const user = data?.result

  if (isLoading) return <UserDetailsSkeleton />

  if (isError || !user) return <ErrorMessage />

  return <UserDetails user={user} />
}
