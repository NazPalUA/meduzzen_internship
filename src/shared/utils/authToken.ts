import { Routes } from "@shared/constants"
import { jwtDecode } from "jwt-decode"

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      if (isTokenExpired(token)) {
        removeToken()
        window.location.href = Routes.LOGIN
        return null
      }
      return token
    }
  }
  return null
}

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
  }
}

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
  }
}

function isTokenExpired(token: string): boolean {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token)
    return decodedToken.exp < Date.now() / 1000
  } catch {
    return true
  }
}
