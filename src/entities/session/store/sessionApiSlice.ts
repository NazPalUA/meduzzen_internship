import { createApi } from "@reduxjs/toolkit/query/react"
import { API_ENDPOINTS } from "@shared/api/endpoints"
import { axiosBaseQuery } from "@shared/store/axiosBaseQuery"
import { removeToken, setToken } from "@shared/utils/authToken"
import { parseData } from "@shared/utils/parseData"
import {
  GetMeResponse,
  GetMeResponseSchema,
  LoginCredentials,
  LoginResponse,
  LoginResponseSchema,
} from "../model"

export const sessionApiSlice = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "sessionApi",
  tagTypes: ["Session"],
  endpoints: (build) => ({
    getSession: build.query<GetMeResponse, void>({
      query: () => ({ url: API_ENDPOINTS.AUTH.GET_ME, method: "GET" }),
      transformResponse: (response: unknown) => {
        return parseData(GetMeResponseSchema, response)
      },
      providesTags: ["Session"],
    }),

    login: build.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: unknown) => {
        const parsedResponse = parseData(LoginResponseSchema, response)
        const token = parsedResponse.result.access_token
        setToken(token)
        return parsedResponse
      },
      invalidatesTags: ["Session"],
    }),

    logout: build.mutation<{ success: boolean }, void>({
      queryFn: async () => {
        try {
          removeToken()
          return { data: { success: true } }
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : "Failed to logout",
            },
          }
        }
      },
      invalidatesTags: ["Session"],
    }),
  }),
})

export const { useGetSessionQuery, useLoginMutation, useLogoutMutation } = sessionApiSlice
