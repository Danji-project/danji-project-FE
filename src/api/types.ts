// API 관련 공통 타입

// API 응답 기본 포맷
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

// API Error 응답 타입
export interface ApiErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
