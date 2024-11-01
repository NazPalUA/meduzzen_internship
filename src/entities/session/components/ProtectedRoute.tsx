"use client"

import { LoadingSpinner } from "@shared/ui/LoadingSpinner"
import { FC, ReactNode } from "react"
import { SignedIn } from "./SignedIn"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  LoadingComponent?: FC
  ErrorComponent?: FC<{ error: any }>
}

export const ProtectedRoute = ({
  children,
  fallback = null,
  LoadingComponent: CustomLoadingComponent,
  ErrorComponent,
}: Props) => {
  const loadingComponent = CustomLoadingComponent ? <CustomLoadingComponent /> : <LoadingSpinner />
  return (
    <SignedIn
      redirectToLogin
      fallback={fallback}
      LoadingComponent={() => loadingComponent}
      ErrorComponent={ErrorComponent}
    >
      {children}
    </SignedIn>
  )
}
