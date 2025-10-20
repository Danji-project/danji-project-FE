import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

// 채팅 요청 인터페이스
export interface ChatRequest {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

// 채팅방 인터페이스
export interface ChatRoom {
  id: number;
  name: string;
  type: "DIRECT" | "GROUP";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  participants: ChatParticipant[];
}

// 채팅 참여자 인터페이스
export interface ChatParticipant {
  id: number;
  nickname: string;
  profileImage?: string;
}

// 메시지 인터페이스
export interface ChatMessage {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
}

// 사용자 검색 결과 인터페이스
export interface UserSearchResult {
  id: number;
  nickname: string;
  name: string;
  profileImage?: string;
  apartmentName?: string;
}

// 1대1 채팅 요청
export const sendChatRequest = async (receiverId: number, message: string) => {
  const response = await axios.post(
    `/api${API_ENDPOINTS.CHAT.REQUEST}`,
    {
      receiverId,
      message,
    },
    { withCredentials: true }
  );
  return response.data;
};

// 채팅 요청 승인
export const approveChatRequest = async (requestId: number) => {
  const response = await axios.post(
    `${API_ENDPOINTS.CHAT.APPROVE_REQUEST}/${requestId}/approve`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

// 채팅 요청 거절
export const rejectChatRequest = async (requestId: number) => {
  const response = await axios.delete(
    `${API_ENDPOINTS.CHAT.REJECT_REQUEST}/${requestId}/reject`,
    { withCredentials: true }
  );
  return response.data;
};

// 보낸 채팅 취소
export const cancelChatRequest = async (requestId: number) => {
  const response = await axios.delete(
    `${API_ENDPOINTS.CHAT.CANCEL_REQUEST}/${requestId}`,
    { withCredentials: true }
  );
  return response.data;
};

// 받은 채팅 요청 목록 조회
export const getReceivedChatRequests = async (): Promise<ChatRequest[]> => {
  const response = await axios.get(`${API_ENDPOINTS.CHAT.RECEIVED_REQUESTS}`, {
    withCredentials: true,
  });
  // API 응답 구조에 따라 data 필드에서 배열을 추출
  return response.data?.data || response.data || [];
};

// 보낸 채팅 요청 목록 조회
export const getSentChatRequests = async (): Promise<ChatRequest[]> => {
  const response = await axios.get(`${API_ENDPOINTS.CHAT.SENT_REQUESTS}`, {
    withCredentials: true,
  });
  // API 응답 구조에 따라 data 필드에서 배열을 추출
  return response.data?.data || response.data || [];
};

// 1대1 채팅 목록 조회
export const getDirectChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await axios.get(`${API_ENDPOINTS.CHAT.DIRECT_ROOMS}`, {
    withCredentials: true,
  });
  // API 응답 구조에 따라 data 필드에서 배열을 추출
  return response.data?.data || response.data || [];
};

// 단체 채팅 목록 조회
export const getGroupChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await axios.get(`${API_ENDPOINTS.CHAT.GROUP_ROOMS}`, {
    withCredentials: true,
  });
  // API 응답 구조에 따라 data 필드에서 배열을 추출
  return response.data?.data || response.data || [];
};

// 채팅방 상세 조회
export const getChatRoomDetail = async (roomId: number): Promise<ChatRoom> => {
  const response = await axios.get(
    `${API_ENDPOINTS.CHAT.ROOM_DETAIL}/${roomId}`,
    { withCredentials: true }
  );
  return response.data;
};

// 임시 토큰 발급
export const getWebSocketToken = async (): Promise<{ token: string }> => {
  console.log("WebSocket 토큰 발급 시작...");

  try {
    // /api/ws/token 엔드포인트 시도 (프록시를 통해 https://danjitalk.duckdns.org/api/ws/token로 전달)
    console.log("토큰 발급 엔드포인트 시도: /api/ws/token");
    const response = await axios.post(
      "/api/ws/token",
      {},
      { withCredentials: true }
    );
    console.log("토큰 발급 응답:", response.data);

    // API 응답 구조에 따라 토큰 추출
    let token: string;
    if (typeof response.data === "string") {
      // 응답이 문자열인 경우
      token = response.data;
    } else if (response.data?.token) {
      // 응답이 { token: "..." } 형태인 경우
      token = response.data.token;
    } else if (response.data?.data?.token) {
      // 응답이 { data: { token: "..." } } 형태인 경우
      token = response.data.data.token;
    } else if (response.data?.data) {
      // 응답이 { data: "..." } 형태인 경우
      token = response.data.data;
    } else {
      console.error("토큰을 찾을 수 없습니다. 응답 구조:", response.data);
      throw new Error("토큰을 찾을 수 없습니다.");
    }

    console.log("추출된 토큰:", token ? "토큰 있음" : "토큰 없음");
    return { token };
  } catch (error: any) {
    console.error("WebSocket 토큰 발급 실패:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error("WebSocket 토큰을 발급받을 수 없습니다.");
  }
};
