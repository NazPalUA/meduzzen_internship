"use client"

import { useLogoutMutation } from "@/src/entities/session"
import { Routes } from "@/src/shared/constants/routes"
import { useRouter } from "@navigation"
import { useEffect } from "react"

export default function LogoutPage() {
  const [logout] = useLogoutMutation()
  const router = useRouter()

  useEffect(() => {
    logout()
    router.push(Routes.HOME)
  }, [logout, router])

  return null
}
