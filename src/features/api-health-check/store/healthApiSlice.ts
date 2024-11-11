import { API_ENDPOINTS, baseApi } from "@shared/api"
import { parseData } from "@shared/utils"
import { CheckHealthResponse, CheckHealthResponseSchema } from "../model"

const healthApiSlice = baseApi.injectEndpoints({
  overrideExisting: false,
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
