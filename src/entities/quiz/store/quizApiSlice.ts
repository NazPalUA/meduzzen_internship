import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import {
  AddQuestionCredentials,
  AddQuestionResponse,
  AddQuestionResponseSchema,
  CreateQuizCredentials,
  CreateQuizResponse,
  CreateQuizResponseSchema,
  DeleteQuestionResponse,
  DeleteQuestionResponseSchema,
  DeleteQuizResponse,
  DeleteQuizResponseSchema,
  GetQuizByIdResponse,
  GetQuizByIdResponseSchema,
  TakeQuizResponse,
  TakeQuizResponseSchema,
  UpdateQuestionCredentials,
  UpdateQuestionResponse,
  UpdateQuestionResponseSchema,
  UpdateQuizInfoCredentials,
  UpdateQuizInfoResponse,
  UpdateQuizInfoResponseSchema,
} from "../model"

const quizApiSlice = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getQuizById: build.query<GetQuizByIdResponse["result"], number>({
      query: (quizId) => ({
        url: API_ENDPOINTS.QUIZ.GET_QUIZ_BY_ID(quizId),
        method: HttpMethod.GET,
      }),
      transformResponse: (response: unknown) => {
        return parseData(GetQuizByIdResponseSchema, response).result
      },
      providesTags: (result, error, quizId) => [{ type: "Quiz", id: quizId }],
    }),

    createQuiz: build.mutation<CreateQuizResponse["result"], CreateQuizCredentials>({
      query: (quizDetails) => ({
        url: API_ENDPOINTS.QUIZ.CREATE_QUIZ,
        method: HttpMethod.POST,
        body: quizDetails,
      }),
      transformResponse: (response: unknown) => {
        return parseData(CreateQuizResponseSchema, response).result
      },
      invalidatesTags: ["Quiz", "CompanyData"],
    }),

    updateQuizInfo: build.mutation<
      UpdateQuizInfoResponse["result"],
      { quizId: number; quizInfo: UpdateQuizInfoCredentials }
    >({
      query: ({ quizId, quizInfo }) => ({
        url: API_ENDPOINTS.QUIZ.UPDATE_QUIZ_INFO(quizId),
        method: HttpMethod.PUT,
        body: quizInfo,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UpdateQuizInfoResponseSchema, response).result
      },
      invalidatesTags: (result, error, { quizId }) => [{ type: "Quiz", id: quizId }, "CompanyData"],
    }),

    deleteQuiz: build.mutation<DeleteQuizResponse["result"], number>({
      query: (quizId) => ({
        url: API_ENDPOINTS.QUIZ.DELETE_QUIZ(quizId),
        method: HttpMethod.DELETE,
      }),
      transformResponse: (response: unknown) => {
        return parseData(DeleteQuizResponseSchema, response).result
      },
      invalidatesTags: (result, error, quizId) => [{ type: "Quiz", id: quizId }, "CompanyData"],
    }),

    addQuestionToQuiz: build.mutation<
      AddQuestionResponse["result"],
      { quizId: number; question: AddQuestionCredentials }
    >({
      query: ({ quizId, question }) => ({
        url: API_ENDPOINTS.QUIZ.ADD_QUESTION_TO_QUIZ(quizId),
        method: HttpMethod.POST,
        body: question,
      }),
      transformResponse: (response: unknown) => {
        return parseData(AddQuestionResponseSchema, response).result
      },
      invalidatesTags: (result, error, { quizId }) => [{ type: "Quiz", id: quizId }, "CompanyData"],
    }),

    takeQuiz: build.mutation<
      TakeQuizResponse["result"],
      { quizId: number; answers: Record<string, string> }
    >({
      query: ({ quizId, answers }) => ({
        url: API_ENDPOINTS.QUIZ.TAKE_QUIZ(quizId),
        method: HttpMethod.POST,
        body: { answers },
      }),
      transformResponse: (response: unknown) => {
        return parseData(TakeQuizResponseSchema, response).result
      },
      invalidatesTags: (result, error, { quizId }) => [
        { type: "Quiz", id: quizId },
        "CompanyData",
        "UserData",
      ],
    }),

    updateQuestion: build.mutation<
      UpdateQuestionResponse["result"],
      { questionId: number; quizId: number; questionInfo: UpdateQuestionCredentials }
    >({
      query: ({ questionId, questionInfo }) => ({
        url: API_ENDPOINTS.QUESTION.UPDATE_QUESTION_INFO(questionId),
        method: HttpMethod.PUT,
        body: questionInfo,
      }),
      transformResponse: (response: unknown) => {
        return parseData(UpdateQuestionResponseSchema, response).result
      },
      invalidatesTags: (result, error, { quizId }) => [{ type: "Quiz", id: quizId }, "CompanyData"],
    }),

    deleteQuestion: build.mutation<
      DeleteQuestionResponse["result"],
      { questionId: number; quizId: number }
    >({
      query: ({ questionId }) => ({
        url: API_ENDPOINTS.QUESTION.DELETE_QUESTION(questionId),
        method: HttpMethod.DELETE,
      }),
      transformResponse: (response: unknown) => {
        return parseData(DeleteQuestionResponseSchema, response).result
      },
      invalidatesTags: (result, error, { quizId }) => [{ type: "Quiz", id: quizId }, "CompanyData"],
    }),
  }),
})

export const {
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizInfoMutation,
  useDeleteQuizMutation,
  useAddQuestionToQuizMutation,
  useTakeQuizMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = quizApiSlice
