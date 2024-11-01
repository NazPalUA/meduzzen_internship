import { Middleware } from "@reduxjs/toolkit"
import { Routes } from "@shared/constants/routes"
import { removeToken } from "@shared/utils/authToken"

export const sessionMiddleware: Middleware = () => (next) => (action: any) => {
  if (action.type.endsWith("/rejected") && action.payload?.status === 401) {
    removeToken()
    if (typeof window !== "undefined") {
      window.location.href = Routes.LOGIN
    }
  }
  return next(action)
}
