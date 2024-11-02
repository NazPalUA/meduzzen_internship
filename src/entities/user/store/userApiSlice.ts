import { baseQuery } from "@/src/shared/store/baseQuery"
import { createApi } from "@reduxjs/toolkit/query/react"
import { API_ENDPOINTS } from "@shared/api/endpoints"
import { parseData } from "@shared/utils/parseData"
import { CreateUserCredentials, CreateUserResponse, CreateUserResponseSchema } from "../model"

export const userApiSlice = createApi({
  baseQuery,
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    createUser: build.mutation<CreateUserResponse, CreateUserCredentials>({
      query: (userDetails) => ({
        url: API_ENDPOINTS.USER.CREATE_USER,
        method: "POST",
        body: userDetails,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CreateUserResponseSchema, response)
      },
      invalidatesTags: ["User"],
    }),
  }),
})

export const { useCreateUserMutation } = userApiSlice
