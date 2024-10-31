"use client"

import { useRouter } from "@navigation"
import { Routes } from "@shared/constants/routes"
import { getToken } from "@shared/utils/authToken"
import { useCallback, useEffect, useMemo } from "react"
import { CurrentUser } from "../model"
import { LoginCredentials } from "../model/Login"
import { useGetSessionQuery, useLoginMutation, useLogoutMutation } from "../store/sessionApiSlice"

interface UseSessionOptions {
  redirectToLogin?: boolean
}

interface UseSessionResult {
  user: CurrentUser | null
  isLoading: boolean
  isError: boolean
  error: any
  isLoggedIn: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

export const useSession = (options: UseSessionOptions = {}): UseSessionResult => {
  const { redirectToLogin = false } = options
  const router = useRouter()
  const { data, isLoading, isError, error } = useGetSessionQuery()
  const [loginMutation] = useLoginMutation()
  const [logoutMutation] = useLogoutMutation()

  const token = getToken()
  const isLoggedIn = Boolean(data?.result?.user_id && token)

  useEffect(() => {
    if (redirectToLogin && !isLoggedIn && !isLoading) {
      router.push(Routes.LOGIN)
    }
  }, [redirectToLogin, isLoggedIn, isLoading, router])

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        await loginMutation(credentials).unwrap()
      } catch (err) {
        console.error("Login failed:", err)
      }
    },
    [loginMutation],
  )

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap()
      router.push(Routes.LOGIN)
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }, [logoutMutation, router])

  const user = useMemo(() => data?.result || null, [data])

  return {
    user,
    isLoading,
    isError,
    error,
    isLoggedIn,
    login,
    logout,
  }
}
