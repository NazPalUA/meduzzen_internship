"use client"

import type { FC } from "react"
import { useSession } from "../hooks/useSession"

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
  LoadingComponent?: FC
  ErrorComponent?: FC<{ error: any }>
}

export const SignedOut = ({
  children,
  fallback = null,
  LoadingComponent = () => <div>Loading...</div>,
  ErrorComponent = ({ error }) => <div>Error: {error?.message}</div>,
}: Props) => {
  const { isLoading, isError, isLoggedIn, error } = useSession()

  if (isLoading) {
    return <LoadingComponent />
  }

  if (isError) {
    return <ErrorComponent error={error} />
  }

  if (isLoggedIn) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
