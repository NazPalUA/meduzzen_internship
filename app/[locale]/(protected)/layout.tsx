import { ProtectedRoute } from "@entities/session"
import "@shared/styles/globals.css"

import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function ProtectedLayout({ children }: Props) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}
