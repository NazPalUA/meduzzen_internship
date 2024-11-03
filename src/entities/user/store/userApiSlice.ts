import { baseQuery } from "@/src/shared/store/baseQuery"
import { createApi } from "@reduxjs/toolkit/query/react"
import { API_ENDPOINTS } from "@shared/api/endpoints"
import { parseData } from "@shared/utils/parseData"
import {
  CreateUserCredentials,
  CreateUserResponse,
  CreateUserResponseSchema,
  DeleteUserResponse,
  DeleteUserResponseSchema,
  UpdateUserInfoCredentials,
  UpdateUserInfoResponse,
  UpdateUserInfoResponseSchema,
  UpdateUserPasswordCredentials,
  UpdateUserPasswordResponse,
  UpdateUserPasswordResponseSchema,
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
  baseQuery,
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

    deleteUser: build.mutation<DeleteUserResponse, string>({
      query: (userId) => ({
        url: API_ENDPOINTS.USER.DELETE_USER.replace("{user_id}", userId),
        method: "DELETE",
      }),
      transformResponse: (response: unknown) => {
        return parseData(DeleteUserResponseSchema, response)
      },
      invalidatesTags: ["User"],
    }),

    updateUserInfo: build.mutation<
      UpdateUserInfoResponse,
      { userId: string; userInfo: UpdateUserInfoCredentials }
    >({
      query: ({ userId, userInfo }) => ({
        url: API_ENDPOINTS.USER.UPDATE_USER_INFO.replace("{user_id}", userId),
        method: "PUT",
        body: userInfo,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UpdateUserInfoResponseSchema, response)
      },
      invalidatesTags: (result, error, { userId }) => [{ type: "User", id: userId }],
    }),

    updateUserPassword: build.mutation<
      UpdateUserPasswordResponse,
      { userId: string; passwordInfo: UpdateUserPasswordCredentials }
    >({
      query: ({ userId, passwordInfo }) => ({
        url: API_ENDPOINTS.USER.UPDATE_USER_PASSWORD.replace("{user_id}", userId),
        method: "PUT",
        body: passwordInfo,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UpdateUserPasswordResponseSchema, response)
      },
      invalidatesTags: (result, error, { userId }) => [{ type: "User", id: userId }],
    }),
  }),
})

export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
} = userApiSlice
