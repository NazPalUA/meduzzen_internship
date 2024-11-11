import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import {
  CreateUserCredentials,
  CreateUserResponse,
  CreateUserResponseSchema,
  DeleteUserResponse,
  DeleteUserResponseSchema,
  UpdateUserAvatarCredentials,
  UpdateUserAvatarResponse,
  UpdateUserAvatarResponseSchema,
  UpdateUserInfoCredentials,
  UpdateUserInfoResponse,
  UpdateUserInfoResponseSchema,
  UpdateUserPasswordCredentials,
  UpdateUserPasswordResponse,
  UpdateUserPasswordResponseSchema,
  UserDetails,
  UserDetailsResponseSchema,
  UsersListResponse,
  UsersListResponseSchema,
} from "../model"

type UserListInput = {
  page: number
  page_size: number
}

const userApiSlice = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getAllUsers: build.query<UsersListResponse["result"], UserListInput>({
      query: ({ page, page_size }) => ({
        url: API_ENDPOINTS.USER.GET_ALL_USERS,
        method: HttpMethod.GET,
        params: { page, page_size },
      }),
      transformResponse: (response: unknown) => {
        return parseData(UsersListResponseSchema, response).result
      },
      providesTags: ["User"],
    }),

    getUserById: build.query<UserDetails, string>({
      query: (userId) => ({
        url: API_ENDPOINTS.USER.GET_USER_BY_ID(userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UserDetailsResponseSchema, response).result
      },
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),

    createUser: build.mutation<CreateUserResponse, CreateUserCredentials>({
      query: (userDetails) => ({
        url: API_ENDPOINTS.USER.CREATE_USER,
        method: HttpMethod.POST,
        body: userDetails,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CreateUserResponseSchema, response)
      },
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation<DeleteUserResponse, string>({
      query: (userId) => ({
        url: API_ENDPOINTS.USER.DELETE_USER(userId),
        method: HttpMethod.DELETE,
      }),
      transformResponse: (response: unknown) => {
        return parseData(DeleteUserResponseSchema, response)
      },
      invalidatesTags: ["User", "Session"],
    }),

    updateUserInfo: build.mutation<
      UpdateUserInfoResponse,
      { userId: string; userInfo: UpdateUserInfoCredentials }
    >({
      query: ({ userId, userInfo }) => ({
        url: API_ENDPOINTS.USER.UPDATE_USER_INFO(userId),
        method: HttpMethod.PUT,
        body: userInfo,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UpdateUserInfoResponseSchema, response)
      },
      invalidatesTags: (result, error, { userId }) => [{ type: "User", id: userId }, "Session"],
    }),

    updateUserPassword: build.mutation<
      UpdateUserPasswordResponse,
      { userId: string; passwordInfo: UpdateUserPasswordCredentials }
    >({
      query: ({ userId, passwordInfo }) => ({
        url: API_ENDPOINTS.USER.UPDATE_USER_PASSWORD(userId),
        method: HttpMethod.PUT,
        body: passwordInfo,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UpdateUserPasswordResponseSchema, response)
      },
    }),

    updateUserAvatar: build.mutation<
      UpdateUserAvatarResponse,
      { userId: string; avatar: UpdateUserAvatarCredentials }
    >({
      query: ({ userId, avatar }) => {
        const formData = new FormData()
        formData.append("file", avatar.file)

        return {
          url: API_ENDPOINTS.USER.UPDATE_USER_AVATAR(userId),
          method: HttpMethod.PUT,
          body: formData,
        }
      },
      transformResponse: (response: unknown) => {
        return parseData(UpdateUserAvatarResponseSchema, response)
      },
      invalidatesTags: (result, error, { userId }) => [{ type: "User", id: userId }, "Session"],
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
  useUpdateUserAvatarMutation,
} = userApiSlice
