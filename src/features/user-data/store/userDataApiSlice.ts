import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import { UserCompaniesListResponse, UserCompaniesListResponseSchema } from "../model"

const userDataApiSlice = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getUserCompaniesList: build.query<UserCompaniesListResponse["result"]["companies"], string>({
      query: (userId) => ({
        url: API_ENDPOINTS.USER_DATA.GET_COMPANIES_LIST(userId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UserCompaniesListResponseSchema, response).result.companies
      },
      providesTags: ["UserData"],
    }),
  }),
})

export const { useGetUserCompaniesListQuery } = userDataApiSlice
