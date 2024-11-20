import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"

export const {
  useLazyGetLastAnswersCsvForCompanyQuery,
  useLazyGetLastAnswersCsvForCompanyMemberQuery,
} = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getLastAnswersCsvForCompany: build.query<string, { companyId: number }>({
      query: ({ companyId }) => ({
        url: API_ENDPOINTS.COMPANY_DATA.GET_LAST_ANSWERS_CSV(companyId),
        method: HttpMethod.GET,
        responseHandler: "text",
      }),
      providesTags: ["CompanyData"],
    }),
    getLastAnswersCsvForCompanyMember: build.query<string, { companyId: number; userId: number }>({
      query: ({ companyId, userId }) => ({
        url: API_ENDPOINTS.COMPANY_DATA.GET_LAST_ANSWERS_CSV_FOR_USER(companyId, userId),
        method: HttpMethod.GET,
        responseHandler: "text",
      }),
      providesTags: ["CompanyData"],
    }),
  }),
})
