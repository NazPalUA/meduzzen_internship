import { createApi } from "@reduxjs/toolkit/query/react"
import { API_ENDPOINTS, baseQuery, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import {
  CompaniesListResponse,
  CompaniesListResponseSchema,
  CompanyDetails,
  CompanyDetailsResponseSchema,
  CreateCompanyCredentials,
  CreateCompanyResponse,
  CreateCompanyResponseSchema,
  DeleteCompanyResponse,
  DeleteCompanyResponseSchema,
  UpdateCompanyAvatarCredentials,
  UpdateCompanyAvatarResponse,
  UpdateCompanyAvatarResponseSchema,
  UpdateCompanyInfoCredentials,
  UpdateCompanyInfoResponse,
  UpdateCompanyInfoResponseSchema,
  UpdateCompanyVisibleCredentials,
  UpdateCompanyVisibleResponse,
  UpdateCompanyVisibleResponseSchema,
} from "../model"

type CompanyListInput = {
  page: number
  page_size: number
}

export const companyApiSlice = createApi({
  baseQuery,
  reducerPath: "companyApi",
  tagTypes: ["Company"],
  endpoints: (build) => ({
    getAllCompanies: build.query<CompaniesListResponse["result"], CompanyListInput>({
      query: ({ page, page_size }) => ({
        url: API_ENDPOINTS.COMPANY.GET_ALL_COMPANIES,
        method: HttpMethod.GET,
        params: { page, page_size },
      }),
      transformResponse: (response: unknown) => {
        return parseData(CompaniesListResponseSchema, response).result
      },
      providesTags: ["Company"],
    }),

    getCompanyById: build.query<CompanyDetails, string>({
      query: (companyId) => ({
        url: API_ENDPOINTS.COMPANY.GET_COMPANY_BY_ID(companyId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CompanyDetailsResponseSchema, response).result
      },
      providesTags: (result, error, companyId) => [{ type: "Company", id: companyId }],
    }),

    createCompany: build.mutation<CreateCompanyResponse, CreateCompanyCredentials>({
      query: (companyDetails) => ({
        url: API_ENDPOINTS.COMPANY.CREATE_COMPANY,
        method: HttpMethod.POST,
        body: companyDetails,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CreateCompanyResponseSchema, response)
      },
      invalidatesTags: ["Company"],
    }),

    deleteCompany: build.mutation<DeleteCompanyResponse, string>({
      query: (companyId) => ({
        url: API_ENDPOINTS.COMPANY.DELETE_COMPANY(companyId),
        method: HttpMethod.DELETE,
      }),
      transformResponse: (response: unknown) => {
        return parseData(DeleteCompanyResponseSchema, response)
      },
      invalidatesTags: ["Company"],
    }),

    updateCompanyInfo: build.mutation<
      UpdateCompanyInfoResponse,
      { companyId: string; companyInfo: UpdateCompanyInfoCredentials }
    >({
      query: ({ companyId, companyInfo }) => ({
        url: API_ENDPOINTS.COMPANY.UPDATE_COMPANY_INFO(companyId),
        method: HttpMethod.PUT,
        body: companyInfo,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UpdateCompanyInfoResponseSchema, response)
      },
      invalidatesTags: (result, error, { companyId }) => [{ type: "Company", id: companyId }],
    }),

    updateCompanyVisible: build.mutation<
      UpdateCompanyVisibleResponse,
      { companyId: string; visibleInfo: UpdateCompanyVisibleCredentials }
    >({
      query: ({ companyId, visibleInfo }) => ({
        url: API_ENDPOINTS.COMPANY.UPDATE_COMPANY_VISIBLE(companyId),
        method: HttpMethod.PUT,
        body: visibleInfo,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UpdateCompanyVisibleResponseSchema, response)
      },
      invalidatesTags: (result, error, { companyId }) => [{ type: "Company", id: companyId }],
    }),

    updateCompanyAvatar: build.mutation<
      UpdateCompanyAvatarResponse,
      { companyId: string; avatar: UpdateCompanyAvatarCredentials }
    >({
      query: ({ companyId, avatar }) => {
        const formData = new FormData()
        formData.append("file", avatar.file)

        return {
          url: API_ENDPOINTS.COMPANY.UPDATE_COMPANY_AVATAR(companyId),
          method: HttpMethod.PUT,
          body: formData,
        }
      },
      transformResponse: (response: unknown) => {
        return parseData(UpdateCompanyAvatarResponseSchema, response)
      },
      invalidatesTags: (result, error, { companyId }) => [{ type: "Company", id: companyId }],
    }),
  }),
})

export const {
  useGetCompanyByIdQuery,
  useGetAllCompaniesQuery,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateCompanyInfoMutation,
  useUpdateCompanyVisibleMutation,
  useUpdateCompanyAvatarMutation,
} = companyApiSlice
