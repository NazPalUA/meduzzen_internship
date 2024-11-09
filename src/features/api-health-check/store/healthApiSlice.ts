import { createApi } from "@reduxjs/toolkit/query/react"
import { API_ENDPOINTS } from "@shared/api"
import { baseQuery } from "@shared/store"
import { parseData } from "@shared/utils"
import { CheckHealthResponse, CheckHealthResponseSchema } from "../model"

export const healthApiSlice = createApi({
  baseQuery,
  reducerPath: "healthApi",
  tagTypes: ["Health"],
  endpoints: (build) => ({
    checkHealth: build.query<CheckHealthResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.COMMON.CHECK_STATUS,
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        return parseData(CheckHealthResponseSchema, response)
      },
      providesTags: ["Health"],
    }),
  }),
})

export const { useCheckHealthQuery } = healthApiSlice
