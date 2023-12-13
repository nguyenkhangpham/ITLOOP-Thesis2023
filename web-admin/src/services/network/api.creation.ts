import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { BASE_URL, TIME_OUT } from "configs";
import { CLI_COOKIE_KEYS, CliCookieService } from "services/cli-cookie";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});

axiosInstance.interceptors.request.use(async (request) => {
  const accessToken = CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN) || "";

  if (accessToken) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${accessToken.toString()}`,
    } as AxiosRequestHeaders;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      CliCookieService.set(CLI_COOKIE_KEYS.ACCESS_TOKEN, "");
      window.location.pathname = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export const ApiClient = {
  get: <T = any, R = AxiosResponse<T>>(
    url: string,
    option: AxiosRequestConfig = {}
  ) => axiosInstance.get<T, R>(url, option),
  post: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    payload: D,
    option: AxiosRequestConfig = {}
  ) => axiosInstance.post<T, R, D>(url, payload, option),
  put: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    payload: D,
    option: AxiosRequestConfig = {}
  ) => axiosInstance.put<T, R, D>(url, payload, option),
  patch: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    payload: D,
    option: AxiosRequestConfig = {}
  ) => axiosInstance.patch<T, R, D>(url, payload, option),
  delete: <T = any, R = AxiosResponse<T>>(
    url: string,
    option: AxiosRequestConfig = {}
  ) => axiosInstance.delete<T, R>(url, option),
};
