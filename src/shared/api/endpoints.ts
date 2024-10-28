export const API_ENDPOINTS = {
	COMMON: {
		CHECK_STATUS: "/",
		GET_IMAGE: "/uploads/{filename}",
		GET_LOGS: "/get_system_logs",
		PING_APP: "/ping/{val}",
	},
	AUTH: {
		LOGIN: "/auth/login",
		GET_ME: "/auth/me",
	},
	USER: {
		GET_ALL_USERS: "/users",
		GET_USER_BY_ID: "/user/{user_id}",
		DELETE_USER: "/user/{user_id}",
		CREATE_USER: "/user",
		UPDATE_USER_INFO: "/user/{user_id}/update_info",
		UPDATE_USER_PASSWORD: "/user/{user_id}/update_password",
		UPDATE_USER_AVATAR: "/user/{user_id}/update_avatar",
	},
	COMPANY: {
		GET_ALL_COMPANIES: "/companies",
		GET_COMPANY_BY_ID: "/company/{company_id}",
		DELETE_COMPANY: "/company/{company_id}",
		CREATE_COMPANY: "/company",
		UPDATE_COMPANY_INFO: "/company/{company_id}/update_info",
		UPDATE_COMPANY_VISIBLE: "/company/{company_id}/update_visible",
		UPDATE_COMPANY_AVATAR: "/company/{company_id}/update_avatar",
	},
	QUESTION: {
		UPDATE_QUESTION_INFO: "/question/{question_id}/update_info",
		DELETE_QUESTION: "/question/{question_id}",
	},
	ACTION: {
		CREATE_ACTION_FROM_USER: "/action/create_from_user/company/{company_id}",
		CREATE_ACTION_FROM_COMPANY:
			"/action/create_from_company/{company_id}/user/{user_id}",
		ACCEPT_INVITE: "/action/{action_id}/accept_invite",
		ACCEPT_REQUEST: "/action/{action_id}/accept_request",
		DECLINE_ACTION: "/action/{action_id}/decline_action",
		ADD_TO_ADMIN: "/action/{action_id}/add_to_admin",
		REMOVE_FROM_ADMIN: "/action/{action_id}/remove_from_admin",
		ADD_TO_BLOCK: "/action/{action_id}/add_to_block",
		REMOVE_FROM_BLOCK: "/action/{action_id}/remove_from_block",
		LEAVE_COMPANY: "/action/{action_id}/leave_company",
	},
	QUIZ: {
		GET_QUIZ_BY_ID: "/quiz/{quiz_id}",
		DELETE_QUIZ: "/quiz/{quiz_id}",
		CREATE_QUIZ: "/quiz",
		UPDATE_QUIZ_INFO: "/quiz/{quiz_id}/update_info",
		ADD_QUESTION_TO_QUIZ: "/quiz/{quiz_id}/add_question",
		TAKE_QUIZ: "/quiz/{quiz_id}/take_quiz",
	},
	USER_DATA: {
		GET_COMPANIES_LIST: "/user/{user_id}/companies_list",
		GET_INVITES_LIST: "/user/{user_id}/invites_list",
		GET_REQUESTS_LIST: "/user/{user_id}/requests_list",
		GET_GLOBAL_RATING: "/user/{user_id}/global_rating",
		GET_GLOBAL_RATING_ANALYTIC: "/user/{user_id}/global_rating_analytic",
		GET_RATING_IN_COMPANY: "/user/{user_id}/rating_in_company/{company_id}",
		GET_RATING_ANALYTIC_IN_COMPANY:
			"/user/{user_id}/rating_analytic_in_company/{company_id}",
		GET_RATING_FOR_QUIZ: "/user/{user_id}/rating_for_quiz/{quiz_id}",
		GET_RATING_ANALYTIC_FOR_QUIZ:
			"/user/{user_id}/rating_analytic_for_quiz/{quiz_id}",
		GET_LAST_ANSWERS_LIST: "/user/{user_id}/last_answers_list",
		GET_LAST_ANSWERS_CSV: "/user/{user_id}/last_answers_csv",
		GET_QUIZZES_LAST_PASS: "/user/{user_id}/quizzes_last_pass",
		GET_NOTIFICATIONS_LIST: "/user/{user_id}/notifications_list",
		MARK_NOTIFICATION_AS_READ:
			"/user/{user_id}/mark_notification_as_read/{notification_id}",
	},
	COMPANY_DATA: {
		GET_MEMBERS_LIST: "/company/{company_id}/members_list",
		GET_INVITES_LIST: "/company/{company_id}/invites_list",
		GET_REQUESTS_LIST: "/company/{company_id}/requests_list",
		GET_BLOCKED_LIST: "/company/{company_id}/blocked_list",
		GET_QUIZZES_LIST: "/company/{company_id}/quizzes_list",
		GET_LAST_ANSWERS_LIST: "/company/{company_id}/last_answers_list",
		GET_LAST_ANSWERS_CSV: "/company/{company_id}/last_answers_csv",
		GET_LAST_ANSWERS_LIST_FOR_USER:
			"/company/{company_id}/last_answers_list_for_user/{user_id}",
		GET_LAST_ANSWERS_CSV_FOR_USER:
			"/company/{company_id}/last_answers_csv_for_user/{user_id}",
		GET_LAST_ANSWERS_LIST_FOR_QUIZ:
			"/company/{company_id}/last_answers_list_for_quiz/{quiz_id}",
		GET_LAST_ANSWERS_CSV_FOR_QUIZ:
			"/company/{company_id}/last_answers_csv_for_quiz/{quiz_id}",
		GET_SUMMARY_RATING_FOR_USERS:
			"/company/{company_id}/summary_rating_for_users",
		GET_SUMMARY_RATING_ANALYTIC_FOR_USERS:
			"/company/{company_id}/summary_rating_analytic_for_users",
		GET_SUMMARY_RATING_FOR_USER:
			"/company/{company_id}/summary_rating_for_user/{user_id}",
		GET_SUMMARY_RATING_ANALYTIC_FOR_USER:
			"/company/{company_id}/summary_rating_analytic_for_user/{user_id}",
		GET_SUMMARY_RATING_FOR_QUIZ:
			"/company/{company_id}/summary_rating_for_quiz/{quiz_id}",
		GET_SUMMARY_RATING_ANALYTIC_FOR_QUIZ:
			"/company/{company_id}/summary_rating_analytic_for_quiz/{quiz_id}",
		GET_QUIZZES_LAST_PASS: "/company/{company_id}/quizzes_last_pass",
	},
} as const
