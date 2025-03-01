import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import {
  type ActionWithIdResponse,
  ActionWithIdResponseSchema,
  type ActionWithoutIdResponse,
  ActionWithoutIdResponseSchema,
} from "../model"

const actionApiSlice = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    createActionFromUser: build.mutation<ActionWithIdResponse["result"], number>({
      query: (companyId) => ({
        url: API_ENDPOINTS.ACTION.CREATE_ACTION_FROM_USER(companyId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(ActionWithIdResponseSchema, response).result
      },
      invalidatesTags: ["CompanyData", "UserData"],
    }),

    createActionFromCompany: build.mutation<
      ActionWithIdResponse["result"],
      { companyId: number; userId: number }
    >({
      query: ({ companyId, userId }) => ({
        url: API_ENDPOINTS.ACTION.CREATE_ACTION_FROM_COMPANY(companyId, userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(ActionWithIdResponseSchema, response).result
      },
      invalidatesTags: ["CompanyData", "UserData"],
    }),

    acceptActionInvite: build.mutation<ActionWithIdResponse["result"], number>({
      query: (actionId) => ({
        url: API_ENDPOINTS.ACTION.ACCEPT_INVITE(actionId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(ActionWithIdResponseSchema, response).result
      },
      invalidatesTags: ["CompanyData", "UserData"],
    }),

    acceptActionRequest: build.mutation<ActionWithIdResponse["result"], number>({
      query: (actionId) => ({
        url: API_ENDPOINTS.ACTION.ACCEPT_REQUEST(actionId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(ActionWithIdResponseSchema, response).result
      },
      invalidatesTags: ["CompanyData", "UserData"],
    }),

    declineAction: build.mutation<ActionWithoutIdResponse["result"], number>({
      query: (actionId) => ({
        url: API_ENDPOINTS.ACTION.DECLINE_ACTION(actionId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(ActionWithoutIdResponseSchema, response).result
      },
      invalidatesTags: ["CompanyData", "UserData"],
    }),

    addToAdmin: build.mutation<ActionWithIdResponse["result"], number>({
      query: (actionId) => ({
        url: API_ENDPOINTS.ACTION.ADD_TO_ADMIN(actionId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(ActionWithIdResponseSchema, response).result
      },
      invalidatesTags: ["CompanyData", "UserData"],
    }),

    removeFromAdmin: build.mutation<ActionWithIdResponse["result"], number>({
      query: (actionId) => ({
        url: API_ENDPOINTS.ACTION.REMOVE_FROM_ADMIN(actionId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(ActionWithIdResponseSchema, response).result
      },
      invalidatesTags: ["CompanyData", "UserData"],
    }),

    leaveCompany: build.mutation<ActionWithoutIdResponse["result"], number>({
      query: (actionId) => ({
        url: API_ENDPOINTS.ACTION.LEAVE_COMPANY(actionId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(ActionWithoutIdResponseSchema, response).result
      },
      invalidatesTags: ["CompanyData", "UserData"],
    }),
  }),
})

export const {
  useLeaveCompanyMutation,
  useCreateActionFromUserMutation,
  useAcceptActionInviteMutation,
  useAcceptActionRequestMutation,
  useCreateActionFromCompanyMutation,
  useDeclineActionMutation,
  useAddToAdminMutation,
  useRemoveFromAdminMutation,
} = actionApiSlice
