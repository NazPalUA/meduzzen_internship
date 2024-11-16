import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import {
  CompanyDataQuizzesListResponse,
  CompanyDataQuizzesListResponseSchema,
  CompanyDataUsersListResponse,
  CompanyDataUsersListResponseSchema,
} from "../model"

const companyDataApiSlice = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getCompanyMembersList: build.query<CompanyDataUsersListResponse["result"]["users"], number>({
      query: (userId) => ({
        url: API_ENDPOINTS.COMPANY_DATA.GET_MEMBERS_LIST(userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CompanyDataUsersListResponseSchema, response).result.users
      },
      providesTags: ["CompanyData"],
    }),

    getCompanyInvitesList: build.query<CompanyDataUsersListResponse["result"]["users"], number>({
      query: (userId) => ({
        url: API_ENDPOINTS.COMPANY_DATA.GET_INVITES_LIST(userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CompanyDataUsersListResponseSchema, response).result.users
      },
      providesTags: ["CompanyData"],
    }),

    getCompanyRequestsList: build.query<CompanyDataUsersListResponse["result"]["users"], number>({
      query: (userId) => ({
        url: API_ENDPOINTS.COMPANY_DATA.GET_REQUESTS_LIST(userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CompanyDataUsersListResponseSchema, response).result.users
      },
      providesTags: ["CompanyData"],
    }),

    getCompanyQuizzesList: build.query<CompanyDataQuizzesListResponse["result"]["quizzes"], number>(
      {
        query: (companyId) => ({
          url: API_ENDPOINTS.COMPANY_DATA.GET_QUIZZES_LIST(companyId),
          method: HttpMethod.GET,
        }),
        transformResponse: (response: unknown) => {
          return parseData(CompanyDataQuizzesListResponseSchema, response).result.quizzes
        },
        providesTags: ["CompanyData"],
      },
    ),
  }),
})

export const {
  useGetCompanyMembersListQuery,
  useGetCompanyInvitesListQuery,
  useGetCompanyRequestsListQuery,
  useGetCompanyQuizzesListQuery,
} = companyDataApiSlice
