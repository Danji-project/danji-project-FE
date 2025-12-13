// API 응답의 기본 포맷
// API 관련 공통 타입

// API 응답 기본 포맷
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

// API Error 응답 타입
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
  VALIDATION_ERROR = "VALIDATION_ERROR",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  DUPLICATE_RESOURCE = "DUPLICATE_RESOURCE",
  SERVER_ERROR = "SERVER_ERROR",
}

// 단지 관련 타입
export interface Apartment {
  id: number;
  name: string;
  region: string;
  location: string;
  thumbnailFileUrl?: string;
  totalUnit?: number;
  buildingCount?: number;
  address: string;
  latitude?: number;
  longitude?: number;
}

// 아파트 상세 정보 타입 (BaseApartInfo)
export interface BaseApartInfo extends Apartment {
  apartDetailName: string;
  houseSize: number;
  totalCount: number;
  moveAbleMonth: number;
  isUseBookmark?: boolean;
  bookmark?: boolean;
  picture?: string[];
}

export interface ApartmentSearchResponse {
  apartments: Apartment[];
  total: number;
}

export interface RegisterApartmentRequest {
  apartmentId: number;
}

export interface MemberApartment {
  id: number;
  memberId: number;
  apartmentId: number;
  apartment: Apartment;
  createdAt: string;
}
