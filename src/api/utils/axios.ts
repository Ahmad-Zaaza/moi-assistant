import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export function createAxiosInstance(
  baseURL: string,
  getAccessToken: () => string | undefined,
  logout: () => void
) {
  const axiosInstance = axios.create({
    baseURL,
  });

  const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    // add the bearer token to the outgoing requests
    config.headers.authorization = `Bearer ${getAccessToken()}`;
    return config;
  };
  const responseErrorInterceptor = (error: AxiosError) => {
    // logout if a 401 response is received
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  };
  axiosInstance.interceptors.request.use(requestInterceptor);
  axiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);

  return axiosInstance;
}
