import { API_ENDPOINTS, baseApi, HttpMethod } from "@shared/api"
import { parseData } from "@shared/utils"
import {
  GetNotificationsListResponseSchema,
  MarkNotificationAsReadResponseSchema,
  Notification,
} from "../model"

export const { useGetNotificationsListQuery, useMarkNotificationAsReadMutation } =
  baseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (build) => ({
      getNotificationsList: build.query<Notification[], number>({
        query: (userId) => ({
          url: API_ENDPOINTS.USER_DATA.GET_NOTIFICATIONS_LIST(userId),
          method: HttpMethod.GET,
        }),
        transformResponse: (response: unknown) => {
          return parseData(GetNotificationsListResponseSchema, response).result.notifications
        },
        providesTags: ["UserData"],
      }),

      markNotificationAsRead: build.mutation<number, { notificationId: number; userId: number }>({
        query: ({ notificationId, userId }) => ({
          url: API_ENDPOINTS.USER_DATA.MARK_NOTIFICATION_AS_READ(userId, notificationId),
          method: HttpMethod.GET,
        }),
        transformResponse: (response: unknown) => {
          return parseData(MarkNotificationAsReadResponseSchema, response).result.notification_id
        },
        invalidatesTags: ["UserData"],
      }),
    }),
  })
