"use client"

import { useSession } from "@entities/session"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  params: { userId: string }
}

export default function UserPrivateLayout({ children, params }: Props) {
  const { user: sessionUser, isLoading, isError } = useSession()

  const isOwner = sessionUser?.user_id === Number(params.userId)

  if (isLoading) return <LoadingSpinner />

  if (isError || !isOwner) return <ErrorMessage />

  return children
}
