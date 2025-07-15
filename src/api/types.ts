/**
 * API 관련 공통 타입 정의
 */

// API 응답의 기본 포맷
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

// 페이지네이션 관련 타입
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API 에러 응답 타입
export interface ApiErrorResponse {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// HTTP 상태 코드
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

// 공통 API 에러 코드
export enum ApiErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',
  SERVER_ERROR = 'SERVER_ERROR',
}
