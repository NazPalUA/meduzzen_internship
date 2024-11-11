"use client"

import { useLogoutMutation } from "@entities/session"
import { useRouter } from "@navigation"
import { Routes } from "@shared/constants"
import { useEffect } from "react"

export default function LogoutPage() {
  const [logout] = useLogoutMutation()
  const router = useRouter()

  useEffect(() => {
    logout()
    router.push(Routes.LOGIN)
  }, [logout, router])

  return null
}
