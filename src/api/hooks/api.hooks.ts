import { ApiService } from "../services/apiService";
import { createAxiosInstance } from "../utils/axios";

export const useApi = () => {
  return new ApiService({
    axiosInstance: createAxiosInstance(
      import.meta.env.VITE_API_BASE_URL,
      () => "",
      () => 0
    ),
  });
};
