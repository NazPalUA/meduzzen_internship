"use client"

import { useGetUserByIdQuery } from "@entities/user"
import { ErrorMessage } from "@shared/ui/ErrorMessage"
import { NoData } from "@shared/ui/NoData"
import { UserDetails } from "./UserDetails"
import { UserDetailsSkeleton } from "./UserDetailsSkeleton"

export function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useGetUserByIdQuery(userId)

  const user = data?.result

  if (isLoading) return <UserDetailsSkeleton />

  if (isError) return <ErrorMessage />

  if (!user) return <NoData />

  return <UserDetails user={user} />
}
