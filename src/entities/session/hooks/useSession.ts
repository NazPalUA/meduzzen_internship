"use client"

import { useRouter } from "@navigation"
import { Routes } from "@shared/constants/routes"
import { getToken } from "@shared/utils/authToken"
import { useEffect, useMemo } from "react"
import { CurrentUser } from "../model"
import { useGetSessionQuery } from "../store/sessionApiSlice"

interface UseSessionOptions {
  redirectToLogin?: boolean
}

interface UseSessionResult {
  user: CurrentUser | null
  isLoading: boolean
  isError: boolean
  error: any
  isLoggedIn: boolean
}

export const useSession = (options: UseSessionOptions = {}): UseSessionResult => {
  const { redirectToLogin = false } = options
  const router = useRouter()
  const { data, isLoading, isError, error } = useGetSessionQuery()

  const token = getToken()
  const isLoggedIn = Boolean(data?.result?.user_id && token)

  useEffect(() => {
    if (redirectToLogin && !isLoggedIn && !isLoading) {
      router.push(Routes.LOGIN)
    }
  }, [redirectToLogin, isLoggedIn, isLoading, router])

  const user = useMemo(() => data?.result || null, [data])

  return {
    user,
    isLoading,
    isError,
    error,
    isLoggedIn,
  }
}
