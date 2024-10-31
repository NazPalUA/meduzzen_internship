import axios from "axios"
import { Routes } from "../constants/routes"
import { getToken, removeToken } from "../utils/authToken"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.__isRetryRequest) {
      removeToken()

      if (typeof window !== "undefined") {
        window.location.href = Routes.LOGIN
      }
    }

    return Promise.reject(error)
  },
)
