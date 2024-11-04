"use client"

import { LoadingSpinner } from "@shared/ui/LoadingSpinner"
import { FC, ReactNode } from "react"
import { SignedIn } from "./SignedIn"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  loading?: ReactNode
  ErrorComponent?: FC<{ error: any }>
}

export const ProtectedRoute = ({
  children,
  fallback = null,
  loading = <LoadingSpinner />,
  ErrorComponent,
}: Props) => {
  return (
    <SignedIn redirectToLogin fallback={fallback} loading={loading} ErrorComponent={ErrorComponent}>
      {children}
    </SignedIn>
  )
}
