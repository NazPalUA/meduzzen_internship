"use client"

import { CircularProgress } from "@mui/material"
import type { FC, ReactNode } from "react"
import { useSession } from "../hooks/useSession"

interface Props {
  children: ReactNode
  redirectToLogin?: boolean
  fallback?: ReactNode
  loading?: ReactNode
  ErrorComponent?: FC<{ error: any }>
}

export const SignedIn = ({
  children,
  redirectToLogin = false,
  fallback = null,
  loading = <CircularProgress />,
  ErrorComponent = ({ error }) => <div>Error: {error?.message}</div>,
}: Props) => {
  const { isLoading, isError, isLoggedIn, error } = useSession({ redirectToLogin })

  if (isLoading) {
    return loading
  }

  if (isError) {
    return <ErrorComponent error={error} />
  }

  return isLoggedIn ? children : fallback
}
