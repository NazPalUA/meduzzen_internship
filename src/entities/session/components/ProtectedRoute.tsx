"use client"

import { SignedIn } from "./SignedIn"

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
  LoadingComponent?: React.FC
  ErrorComponent?: React.FC<{ error: any }>
}

export const ProtectedRoute = ({
  children,
  fallback = null,
  LoadingComponent,
  ErrorComponent,
}: Props) => {
  return (
    <SignedIn
      redirectToLogin
      fallback={fallback}
      LoadingComponent={LoadingComponent}
      ErrorComponent={ErrorComponent}
    >
      {children}
    </SignedIn>
  )
}
