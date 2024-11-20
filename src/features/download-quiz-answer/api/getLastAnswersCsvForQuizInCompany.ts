import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"

export const { useLazyGetLastAnswersCsvForQuizInCompanyQuery } = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getLastAnswersCsvForQuizInCompany: build.query<string, { companyId: number; quizId: number }>({
      query: ({ companyId, quizId }) => ({
        url: API_ENDPOINTS.COMPANY_DATA.GET_LAST_ANSWERS_CSV_FOR_QUIZ(companyId, quizId),
        method: HttpMethod.GET,
        responseHandler: "text",
      }),
      providesTags: ["CompanyData"],
    }),
  }),
})
