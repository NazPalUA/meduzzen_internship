"use client"

import { useSession } from "@entities/session"
import { useGetUserByIdQuery } from "@entities/user"
import { Container, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { LayoutUserProfile } from "@widgets/LayoutUserProfile"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  params: { userId: string }
}

export default function UserLayout({ children, params }: Props) {
  const { data: user, isLoading, isError } = useGetUserByIdQuery(Number(params.userId))
  const { user: sessionUser } = useSession()

  if (isLoading) return <LoadingSpinner />

  if (isError || !user) {
    return (
      <Container>
        <ErrorMessage />
      </Container>
    )
  }

  const isOwner = sessionUser?.user_id === user.user_id

  return (
    <Container>
      <LayoutUserProfile user={user} isOwner={isOwner}>
        {children}
      </LayoutUserProfile>
    </Container>
  )
}
