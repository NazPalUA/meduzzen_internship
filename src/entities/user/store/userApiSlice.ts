import { createApi } from "@reduxjs/toolkit/query/react"
import { API_ENDPOINTS } from "@shared/api/endpoints"
import { axiosBaseQuery } from "@shared/store/axiosBaseQuery"
import { parseData } from "@shared/utils/parseData"
import {
  CreateUserCredentials,
  CreateUserResponse,
  CreateUserResponseSchema,
  UserDetailsResponse,
  UserDetailsResponseSchema,
  UsersListResponse,
  UsersListResponseSchema,
} from "../model"

type UserListInput = {
  page: number
  page_size: number
}

export const userApiSlice = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getAllUsers: build.query<UsersListResponse, UserListInput>({
      query: ({ page, page_size }) => ({
        url: API_ENDPOINTS.USER.GET_ALL_USERS,
        method: "GET",
        params: { page, page_size },
      }),
      transformResponse: (response: unknown) => {
        return parseData(UsersListResponseSchema, response)
      },
      providesTags: ["User"],
    }),

    getUserById: build.query<UserDetailsResponse, string>({
      query: (userId) => ({
        url: API_ENDPOINTS.USER.GET_USER_BY_ID.replace("{user_id}", userId),
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        return parseData(UserDetailsResponseSchema, response)
      },
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),

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

export const { useGetUserByIdQuery, useGetAllUsersQuery, useCreateUserMutation } = userApiSlice
