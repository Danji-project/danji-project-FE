import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import { type ApiResponse, type ApiErrorResponse, HttpStatus } from "./types";

// axios 기본 설정 (모든 axios 호출에 적용)
axios.defaults.withCredentials = true; // 쿠키 자동 전송을 위해 필요

// 기본 Axios 인스턴스 설정
const baseConfig: AxiosRequestConfig = {
  baseURL: "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 자동 전송을 위해 필요
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

  // 요청 인터셉터
  axiosInstance.interceptors.request.use(
    (config) => {
      // 쿠키 기반 인증이므로 Authorization 헤더 불필요 (쿠키가 자동으로 전송됨)
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => {
      // 응답 데이터 변환
      return { ...response, data: transformResponse<unknown>(response).data };
    },
    (error: AxiosError<ApiErrorResponse>) => {
      // 에러 처리 로직
      if (error.response) {
        // 서버에서 응답이 왔지만 에러 상태 코드인 경우
        const status = error.response.status;

        // 인증 관련 에러 처리
        if (status === HttpStatus.UNAUTHORIZED) {
          // 쿠키 기반 인증이므로 localStorage 제거 불필요
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }

        // 응답 형식 통일
        error.response.data = {
          ...error.response.data,
          status: status,
          message:
            error.response.data?.message || "요청 처리 중 오류가 발생했습니다.",
        };
      } else if (error.request) {
        // 요청은 보냈으나 응답을 받지 못한 경우 (네트워크 오류 등)
        console.error("Network error:", error.message);
        // 사용자 정의 에러 생성
        error.response = {
          data: {
            message: "서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.",
            status: 0,
          },
          status: 0,
          statusText: "Network Error",
          headers: {},
          config: error.config!,
        };
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// 기본 API 클라이언트 인스턴스
export const apiClient = createApiClient();

// 타입이 지정된 요청 메서드들
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
