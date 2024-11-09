import { createApi } from "@reduxjs/toolkit/query/react"
import { API_ENDPOINTS, HttpMethod } from "@shared/api"
import { baseQuery } from "@shared/store"
import { parseData, removeToken, setToken } from "@shared/utils"
import {
  CurrentUser,
  GetMeResponseSchema,
  LoginCredentials,
  LoginResponse,
  LoginResponseSchema,
} from "../model"

export const sessionApiSlice = createApi({
  baseQuery,
  reducerPath: "sessionApi",
  tagTypes: ["Session"],
  endpoints: (build) => ({
    getSession: build.query<CurrentUser, void>({
      query: () => ({ url: API_ENDPOINTS.AUTH.GET_ME, method: HttpMethod.GET }),
      transformResponse: (response: unknown) => {
        return parseData(GetMeResponseSchema, response).result
      },
      providesTags: ["Session"],
    }),

    login: build.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: HttpMethod.POST,
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
