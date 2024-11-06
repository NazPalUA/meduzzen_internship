import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "@shared/utils/authToken"

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = getToken()
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})
