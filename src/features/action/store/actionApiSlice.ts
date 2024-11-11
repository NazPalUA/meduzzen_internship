import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import { LeaveCompanyResponse, LeaveCompanyResponseSchema } from "../model"
import {
  CreateActionFromUserResponse,
  CreateActionFromUserResponseSchema,
} from "../model/createActionFromUser"

const actionApiSlice = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    createActionFromUser: build.mutation<CreateActionFromUserResponse["result"], string>({
      query: (companyId) => ({
        url: API_ENDPOINTS.ACTION.CREATE_ACTION_FROM_USER(companyId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CreateActionFromUserResponseSchema, response).result
      },
    }),

    leaveCompany: build.mutation<LeaveCompanyResponse["result"], string>({
      query: (actionId) => ({
        url: API_ENDPOINTS.ACTION.LEAVE_COMPANY(actionId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        console.log(response)
        return parseData(LeaveCompanyResponseSchema, response).result
      },
    }),
  }),
})

export const { useLeaveCompanyMutation, useCreateActionFromUserMutation } = actionApiSlice
