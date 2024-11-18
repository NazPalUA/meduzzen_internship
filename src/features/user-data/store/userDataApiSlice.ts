import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import {
  UserDataCompaniesListResponse,
  UserDataCompaniesListResponseSchema,
  UserDataGlobalRatingResponse,
  UserDataGlobalRatingResponseSchema,
  UserDataRatingAnalyticForQuizResponse,
  UserDataRatingAnalyticForQuizResponseSchema,
} from "../model"
import {
  UserDataQuizzesLastPassResponse,
  UserDataQuizzesLastPassResponseSchema,
} from "../model/getQuizzesLastPass"

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
    getUserGlobalRating: build.query<UserDataGlobalRatingResponse["result"]["rating"], number>({
      query: (userId) => ({
        url: API_ENDPOINTS.USER_DATA.GET_GLOBAL_RATING(userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UserDataGlobalRatingResponseSchema, response).result.rating
      },
      providesTags: ["UserData"],
    }),
    getUserQuizzesLastPass: build.query<
      UserDataQuizzesLastPassResponse["result"]["quizzes"],
      number
    >({
      query: (userId) => ({
        url: API_ENDPOINTS.USER_DATA.GET_QUIZZES_LAST_PASS(userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UserDataQuizzesLastPassResponseSchema, response).result.quizzes
      },
      providesTags: ["UserData"],
    }),
    getUserRatingAnalyticForQuiz: build.query<
      UserDataRatingAnalyticForQuizResponse["result"]["rating"],
      { userId: number; quizId: number }
    >({
      query: ({ userId, quizId }) => ({
        url: API_ENDPOINTS.USER_DATA.GET_RATING_ANALYTIC_FOR_QUIZ(userId, quizId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UserDataRatingAnalyticForQuizResponseSchema, response).result.rating
      },
      providesTags: ["UserData"],
    }),
  }),
})

export const {
  useGetUserCompaniesListQuery,
  useGetUserInvitesListQuery,
  useGetUserRequestsListQuery,
  useGetUserGlobalRatingQuery,
  useGetUserQuizzesLastPassQuery,
  useGetUserRatingAnalyticForQuizQuery,
} = userDataApiSlice
