import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import { UserDataCompaniesListResponse, UserDataCompaniesListResponseSchema } from "../model"

const userDataApiSlice = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getUserCompaniesList: build.query<UserDataCompaniesListResponse["result"]["companies"], number>(
      {
        query: (userId) => ({
          url: API_ENDPOINTS.USER_DATA.GET_COMPANIES_LIST(userId),
          method: HttpMethod.GET,
        }),
        transformResponse: (response: unknown) => {
          return parseData(UserDataCompaniesListResponseSchema, response).result.companies
        },
        providesTags: ["UserData"],
      },
    ),

    getUserInvitesList: build.query<UserDataCompaniesListResponse["result"]["companies"], number>({
      query: (userId) => ({
        url: API_ENDPOINTS.USER_DATA.GET_INVITES_LIST(userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UserDataCompaniesListResponseSchema, response).result.companies
      },
      providesTags: ["UserData"],
    }),

    getUserRequestsList: build.query<UserDataCompaniesListResponse["result"]["companies"], number>({
      query: (userId) => ({
        url: API_ENDPOINTS.USER_DATA.GET_REQUESTS_LIST(userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UserDataCompaniesListResponseSchema, response).result.companies
      },
      providesTags: ["UserData"],
    }),
  }),
})

export const {
  useGetUserCompaniesListQuery,
  useGetUserInvitesListQuery,
  useGetUserRequestsListQuery,
} = userDataApiSlice
