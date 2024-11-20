import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"

export const { useLazyGetLastAnswersCsvForUserQuery } = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getLastAnswersCsvForUser: build.query<string, { userId: number }>({
      query: ({ userId }) => ({
        url: API_ENDPOINTS.USER_DATA.GET_LAST_ANSWERS_CSV(userId),
        method: HttpMethod.GET,
        responseHandler: "text",
      }),
      providesTags: ["UserData"],
    }),
  }),
})
