import { axiosInstance } from "@shared/api/axios"
import { API_ENDPOINTS } from "@shared/api/endpoints"
import { AxiosResponse } from "axios"

export const healthApi = {
  /**
   * Check if the API is operational
   */
  checkHealth: async (): Promise<AxiosResponse<string>> => {
    return axiosInstance.get(API_ENDPOINTS.COMMON.CHECK_STATUS)
  },
}
