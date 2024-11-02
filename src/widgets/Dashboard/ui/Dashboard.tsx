"use client"

import { useSession } from "@/src/entities/session"
import { ErrorMessage } from "@/src/shared/ui/ErrorMessage"
import { CurrentUser } from "./CurrentUser"
import { UserSkeleton } from "./UserSkeleton"

export function Dashboard() {
  const { user, isLoading, isError } = useSession()

  if (isLoading) return <UserSkeleton />
  if (isError || !user) return <ErrorMessage />

  return <CurrentUser user={user} />
}
