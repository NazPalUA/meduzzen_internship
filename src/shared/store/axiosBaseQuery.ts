import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import type { AxiosError, AxiosRequestConfig } from "axios"
import { axiosInstance } from "../api/axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: API_URL || "" },
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig["method"]
      body?: AxiosRequestConfig["data"]
      params?: AxiosRequestConfig["params"]
      headers?: AxiosRequestConfig["headers"]
    },
    unknown,
    unknown
  > =>
  async ({ url, method, body, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
