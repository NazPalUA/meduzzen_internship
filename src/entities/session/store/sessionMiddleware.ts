import { Middleware } from "@reduxjs/toolkit"
import { removeToken } from "@shared/utils/authToken"

export const sessionMiddleware: Middleware = () => (next) => (action: any) => {
  if (action.type.endsWith("/rejected") && action.payload?.status === 401) {
    removeToken()
  }
  return next(action)
}
