import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData, removeToken, setToken } from "@shared/utils"
import {
  CurrentUser,
  GetMeResponseSchema,
  LoginCredentials,
  LoginResponse,
  LoginResponseSchema,
} from "../model"

const sessionApiSlice = baseApi.injectEndpoints({
  overrideExisting: false,
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(baseApi.util.resetApiState())
        } catch {
          return
        }
      },
      invalidatesTags: ["Session"],
    }),
  }),
})

export const { useGetSessionQuery, useLoginMutation, useLogoutMutation } = sessionApiSlice
