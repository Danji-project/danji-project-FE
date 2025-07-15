// API 엔드포인트 정의
export const API_ENDPOINTS = {
  // 인증 관련 엔드포인트
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/users',
    VERIFY_EMAIL: '/users/verify-email',
    KAKAO_LOGIN: '/users',
  },
  
  // 사용자 관련 엔드포인트
  USER: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    DELETE_ACCOUNT: '/users',
  },
  
  // 게시판 관련 엔드포인트
  BOARD: {
    LIST: '/boards',
    DETAIL: (id: string) => `/boards/${id}`,
    CREATE: '/boards',
    UPDATE: (id: string) => `/boards/${id}`,
    DELETE: (id: string) => `/boards/${id}`,
  },
  
  // 댓글 관련 엔드포인트
  COMMENT: {
    LIST: (boardId: string) => `/boards/${boardId}/comments`,
    CREATE: (boardId: string) => `/boards/${boardId}/comments`,
    UPDATE: (boardId: string, commentId: string) => `/boards/${boardId}/comments/${commentId}`,
    DELETE: (boardId: string, commentId: string) => `/boards/${boardId}/comments/${commentId}`,
  },
  
  // 반응(좋아요, 북마크 등) 관련 엔드포인트
  REACTION: {
    LIKE: (boardId: string) => `/boards/${boardId}/like`,
    BOOKMARK: (boardId: string) => `/boards/${boardId}/bookmark`,
  },

  // 검색 관련 엔드포인트
  SEARCH: {
    DANJI: '/search',
    POPULAR_KEYWORDS: '/search/popular-keywords',
    RECENT_KEYWORDS: '/search/recent-keywords',
    ADD_RECENT_KEYWORD: '/search/recent-keywords',
    RECENT_APARTMENT: '/search/recent-apartment',
  },
};
