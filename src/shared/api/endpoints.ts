export const API_ENDPOINTS = {
  COMMON: {
    CHECK_STATUS: "/",
    GET_IMAGE: (filename: string) => `/uploads/${filename}/`,
    GET_LOGS: "/get_system_logs/",
    PING_APP: (val: string) => `/ping/${val}/`,
  },
  AUTH: {
    LOGIN: "/auth/login/",
    GET_ME: "/auth/me/",
  },
  USER: {
    GET_ALL_USERS: "/users/",
    GET_USER_BY_ID: (userId: string) => `/user/${userId}/`,
    DELETE_USER: (userId: string) => `/user/${userId}/`,
    CREATE_USER: "/user/",
    UPDATE_USER_INFO: (userId: string) => `/user/${userId}/update_info/`,
    UPDATE_USER_PASSWORD: (userId: string) => `/user/${userId}/update_password/`,
    UPDATE_USER_AVATAR: (userId: string) => `/user/${userId}/update_avatar/`,
  },
  COMPANY: {
    GET_ALL_COMPANIES: "/companies/",
    GET_COMPANY_BY_ID: (companyId: string) => `/company/${companyId}/`,
    DELETE_COMPANY: (companyId: string) => `/company/${companyId}/`,
    CREATE_COMPANY: "/company/",
    UPDATE_COMPANY_INFO: (companyId: string) => `/company/${companyId}/update_info/`,
    UPDATE_COMPANY_VISIBLE: (companyId: string) => `/company/${companyId}/update_visible/`,
    UPDATE_COMPANY_AVATAR: (companyId: string) => `/company/${companyId}/update_avatar/`,
  },
  QUESTION: {
    UPDATE_QUESTION_INFO: (questionId: string) => `/question/${questionId}/update_info/`,
    DELETE_QUESTION: (questionId: string) => `/question/${questionId}/`,
  },
  ACTION: {
    CREATE_ACTION_FROM_USER: (companyId: string) =>
      `/action/create_from_user/company/${companyId}/`,
    CREATE_ACTION_FROM_COMPANY: (companyId: string, userId: string) =>
      `/action/create_from_company/${companyId}/user/${userId}/`,
    ACCEPT_INVITE: (actionId: string) => `/action/${actionId}/accept_invite/`,
    ACCEPT_REQUEST: (actionId: string) => `/action/${actionId}/accept_request/`,
    DECLINE_ACTION: (actionId: string) => `/action/${actionId}/decline_action/`,
    ADD_TO_ADMIN: (actionId: string) => `/action/${actionId}/add_to_admin/`,
    REMOVE_FROM_ADMIN: (actionId: string) => `/action/${actionId}/remove_from_admin/`,
    ADD_TO_BLOCK: (actionId: string) => `/action/${actionId}/add_to_block/`,
    REMOVE_FROM_BLOCK: (actionId: string) => `/action/${actionId}/remove_from_block/`,
    LEAVE_COMPANY: (actionId: string) => `/action/${actionId}/leave_company/`,
  },
  QUIZ: {
    GET_QUIZ_BY_ID: (quizId: string) => `/quiz/${quizId}/`,
    DELETE_QUIZ: (quizId: string) => `/quiz/${quizId}/`,
    CREATE_QUIZ: "/quiz/",
    UPDATE_QUIZ_INFO: (quizId: string) => `/quiz/${quizId}/update_info/`,
    ADD_QUESTION_TO_QUIZ: (quizId: string) => `/quiz/${quizId}/add_question/`,
    TAKE_QUIZ: (quizId: string) => `/quiz/${quizId}/take_quiz/`,
  },
  USER_DATA: {
    GET_COMPANIES_LIST: (userId: string) => `/user/${userId}/companies_list/`,
    GET_INVITES_LIST: (userId: string) => `/user/${userId}/invites_list/`,
    GET_REQUESTS_LIST: (userId: string) => `/user/${userId}/requests_list/`,
    GET_GLOBAL_RATING: (userId: string) => `/user/${userId}/global_rating/`,
    GET_GLOBAL_RATING_ANALYTIC: (userId: string) => `/user/${userId}/global_rating_analytic/`,
    GET_RATING_IN_COMPANY: (userId: string, companyId: string) =>
      `/user/${userId}/rating_in_company/${companyId}/`,
    GET_RATING_ANALYTIC_IN_COMPANY: (userId: string, companyId: string) =>
      `/user/${userId}/rating_analytic_in_company/${companyId}/`,
    GET_RATING_FOR_QUIZ: (userId: string, quizId: string) =>
      `/user/${userId}/rating_for_quiz/${quizId}/`,
    GET_RATING_ANALYTIC_FOR_QUIZ: (userId: string, quizId: string) =>
      `/user/${userId}/rating_analytic_for_quiz/${quizId}/`,
    GET_LAST_ANSWERS_LIST: (userId: string) => `/user/${userId}/last_answers_list/`,
    GET_LAST_ANSWERS_CSV: (userId: string) => `/user/${userId}/last_answers_csv/`,
    GET_QUIZZES_LAST_PASS: (userId: string) => `/user/${userId}/quizzes_last_pass/`,
    GET_NOTIFICATIONS_LIST: (userId: string) => `/user/${userId}/notifications_list/`,
    MARK_NOTIFICATION_AS_READ: (userId: string, notificationId: string) =>
      `/user/${userId}/mark_notification_as_read/${notificationId}/`,
  },
  COMPANY_DATA: {
    GET_MEMBERS_LIST: (companyId: string) => `/company/${companyId}/members_list/`,
    GET_INVITES_LIST: (companyId: string) => `/company/${companyId}/invites_list/`,
    GET_REQUESTS_LIST: (companyId: string) => `/company/${companyId}/requests_list/`,
    GET_BLOCKED_LIST: (companyId: string) => `/company/${companyId}/blocked_list/`,
    GET_QUIZZES_LIST: (companyId: string) => `/company/${companyId}/quizzes_list/`,
    GET_LAST_ANSWERS_LIST: (companyId: string) => `/company/${companyId}/last_answers_list/`,
    GET_LAST_ANSWERS_CSV: (companyId: string) => `/company/${companyId}/last_answers_csv/`,
    GET_LAST_ANSWERS_LIST_FOR_USER: (companyId: string, userId: string) =>
      `/company/${companyId}/last_answers_list_for_user/${userId}/`,
    GET_LAST_ANSWERS_CSV_FOR_USER: (companyId: string, userId: string) =>
      `/company/${companyId}/last_answers_csv_for_user/${userId}/`,
    GET_LAST_ANSWERS_LIST_FOR_QUIZ: (companyId: string, quizId: string) =>
      `/company/${companyId}/last_answers_list_for_quiz/${quizId}/`,
    GET_LAST_ANSWERS_CSV_FOR_QUIZ: (companyId: string, quizId: string) =>
      `/company/${companyId}/last_answers_csv_for_quiz/${quizId}/`,
    GET_SUMMARY_RATING_FOR_USERS: (companyId: string) =>
      `/company/${companyId}/summary_rating_for_users/`,
    GET_SUMMARY_RATING_ANALYTIC_FOR_USERS: (companyId: string) =>
      `/company/${companyId}/summary_rating_analytic_for_users/`,
    GET_SUMMARY_RATING_FOR_USER: (companyId: string, userId: string) =>
      `/company/${companyId}/summary_rating_for_user/${userId}/`,
    GET_SUMMARY_RATING_ANALYTIC_FOR_USER: (companyId: string, userId: string) =>
      `/company/${companyId}/summary_rating_analytic_for_user/${userId}/`,
    GET_SUMMARY_RATING_FOR_QUIZ: (companyId: string, quizId: string) =>
      `/company/${companyId}/summary_rating_for_quiz/${quizId}/`,
    GET_SUMMARY_RATING_ANALYTIC_FOR_QUIZ: (companyId: string, quizId: string) =>
      `/company/${companyId}/summary_rating_analytic_for_quiz/${quizId}/`,
    GET_QUIZZES_LAST_PASS: (companyId: string) => `/company/${companyId}/quizzes_last_pass/`,
  },
} as const
