"use client"

import { CircularProgress } from "@mui/material"
import type { FC, ReactNode } from "react"
import { useSession } from "../hooks/useSession"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  loading?: ReactNode
  ErrorComponent?: FC<{ error: any }>
}

export const SignedOut = ({
  children,
  fallback = null,
  loading = <CircularProgress />,
  ErrorComponent = ({ error }) => <div>Error: {error?.message}</div>,
}: Props) => {
  const { isLoading, isError, isLoggedIn, error } = useSession()

  if (isLoading) {
    return loading
  }

  if (isError) {
    return <ErrorComponent error={error} />
  }

  return isLoggedIn ? fallback : children
}
