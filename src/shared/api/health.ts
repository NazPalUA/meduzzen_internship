import { AxiosResponse } from "axios"
import axiosInstance from "./axios"
import { API_ENDPOINTS } from "./endpoints"

export const healthApi = {
	/**
	 * Check if the API is operational
	 */
	checkHealth: async (): Promise<AxiosResponse<string>> => {
		return axiosInstance.get(API_ENDPOINTS.COMMON.CHECK_STATUS)
	},
}
