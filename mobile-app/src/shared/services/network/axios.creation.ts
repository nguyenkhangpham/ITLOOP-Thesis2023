import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { BASE_URL, TIME_OUT } from '../../../configs';
import storageServices from '../storage/storageServices';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(async request => {
  const { accessToken } = await storageServices.getToken();

  if (accessToken) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders;
  }

  return request;
});

export const ApiClient = {
  get: <T = any, R = AxiosResponse<T>>(
    url: string,
    option: AxiosRequestConfig = {},
  ) => axiosInstance.get<T, R>(url, option),
  post: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    payload: D,
    option: AxiosRequestConfig = {},
  ) => axiosInstance.post<T, R, D>(url, payload, option),
  put: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    payload: D,
    option: AxiosRequestConfig = {},
  ) => axiosInstance.put<T, R, D>(url, payload, option),
  patch: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    payload: D,
    option: AxiosRequestConfig = {},
  ) => axiosInstance.patch<T, R, D>(url, payload, option),
  delete: <T = any, R = AxiosResponse<T>>(
    url: string,
    option: AxiosRequestConfig = {},
  ) => axiosInstance.delete<T, R>(url, option),
};
