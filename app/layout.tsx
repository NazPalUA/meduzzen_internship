import "@compose/styles/globals.css"
import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Meduzzen Internship",
  description: "Meduzzen Internship Project",
}

type Props = {
  children: ReactNode
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children
}
