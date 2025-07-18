import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import type { ApiResponse } from "./types";

// 기본 axios instance
const baseConfig = {
  baseUrl: "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

// 응답 데이터 변환 함수
const transformResponse = <T>(response: AxiosResponse): ApiResponse<T> => {
  return {
    data: response.data,
    status: response.status,
    success: response.status >= 200 && response.status < 300,
    message: response.data?.message,
  };
};

// API 클라이언트 생성
export const createApiClient = (
  config: AxiosRequestConfig = {}
): AxiosInstance => {
  const axiosInstance = axios.create({
    ...baseConfig,
    ...config,
  });

  return axiosInstance;
};

// 기본 API 클라이언트 인스턴스
export const apiClient = createApiClient();

// 타입이 지정된 요청 메소드들
export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<ApiResponse<T>>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<ApiResponse<T>>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<ApiResponse<T>>(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<ApiResponse<T>>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<ApiResponse<T>>(url, config),
};
