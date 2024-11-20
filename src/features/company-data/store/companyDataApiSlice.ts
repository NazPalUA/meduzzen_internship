import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import {
  CompanyDataQuizzesListResponse,
  CompanyDataQuizzesListResponseSchema,
  CompanyDataUsersListResponse,
  CompanyDataUsersListResponseSchema,
} from "../model"
import {
  CompanyDataQuizzesLastPassInResponse,
  CompanyDataQuizzesLastPassInResponseSchema,
} from "../model/getQuizzesLastPassInCompany"
import {
  CompanyDataSummaryRatingAnalyticForUserResponse,
  CompanyDataSummaryRatingAnalyticForUserResponseSchema,
} from "../model/getSummaryRatingAnalyticForUser"
import {
  CompanyDataSummaryRatingAnalyticForUsersResponse,
  CompanyDataSummaryRatingAnalyticForUsersResponseSchema,
} from "../model/getSummaryRatingAnalyticForUsers"

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
    getSummaryRatingAnalyticForUsers: build.query<
      CompanyDataSummaryRatingAnalyticForUsersResponse["result"]["rating"],
      number
    >({
      query: (companyId) => ({
        url: API_ENDPOINTS.COMPANY_DATA.GET_SUMMARY_RATING_ANALYTIC_FOR_USERS(companyId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CompanyDataSummaryRatingAnalyticForUsersResponseSchema, response).result
          .rating
      },
      providesTags: ["CompanyData"],
    }),
    getSummaryRatingAnalyticForUser: build.query<
      CompanyDataSummaryRatingAnalyticForUserResponse["result"]["rating"],
      { companyId: number; userId: number }
    >({
      query: ({ companyId, userId }) => ({
        url: API_ENDPOINTS.COMPANY_DATA.GET_SUMMARY_RATING_ANALYTIC_FOR_USER(companyId, userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CompanyDataSummaryRatingAnalyticForUserResponseSchema, response).result
          .rating
      },
      providesTags: ["CompanyData"],
    }),
    getQuizzesLastPassInCompany: build.query<
      CompanyDataQuizzesLastPassInResponse["result"]["users"],
      number
    >({
      query: (companyId) => ({
        url: API_ENDPOINTS.COMPANY_DATA.GET_QUIZZES_LAST_PASS(companyId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CompanyDataQuizzesLastPassInResponseSchema, response).result.users
      },
      providesTags: ["CompanyData"],
    }),
  }),
})

export const {
  useGetCompanyMembersListQuery,
  useGetCompanyInvitesListQuery,
  useGetCompanyRequestsListQuery,
  useGetCompanyQuizzesListQuery,
  useGetSummaryRatingAnalyticForUsersQuery,
  useGetSummaryRatingAnalyticForUserQuery,
  useGetQuizzesLastPassInCompanyQuery,
} = companyDataApiSlice
