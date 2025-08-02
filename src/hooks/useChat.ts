import { useState, useEffect, useCallback } from "react";
import { useWebSocket } from "./useWebSocket";
import {
  getDirectChatRooms,
  getGroupChatRooms,
  getReceivedChatRequests,
  getSentChatRequests,
  sendChatRequest,
  approveChatRequest,
  rejectChatRequest,
  cancelChatRequest,
} from "../api/chatApi";
import type { ChatRoom, ChatRequest, ChatMessage } from "../api/chatApi";
import { useUserInfo } from "../stores/userStore";

interface UseChatReturn {
  // 채팅방 목록
  directRooms: ChatRoom[];
  groupRooms: ChatRoom[];

  // 채팅 요청
  receivedRequests: ChatRequest[];
  sentRequests: ChatRequest[];

  // 메시지
  messages: ChatMessage[];

  // 로딩 상태
  isLoading: boolean;
  isConnected: boolean;

  // 액션 함수들
  loadDirectRooms: () => Promise<void>;
  loadGroupRooms: () => Promise<void>;
  loadReceivedRequests: () => Promise<void>;
  loadSentRequests: () => Promise<void>;
  sendChatRequestAction: (receiverId: number, message: string) => Promise<void>;
  approveRequest: (requestId: number) => Promise<void>;
  rejectRequest: (requestId: number) => Promise<void>;
  cancelRequest: (requestId: number) => Promise<void>;
  sendMessage: (roomId: number, message: string) => void;
  subscribeToRoom: (roomId: number) => void;
}

export const useChat = (): UseChatReturn => {
  const [directRooms, setDirectRooms] = useState<ChatRoom[]>([]);
  const [groupRooms, setGroupRooms] = useState<ChatRoom[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<ChatRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ChatRequest[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useUserInfo();
  const {
    isConnected,
    sendMessage: wsSendMessage,
    subscribeToRoom: wsSubscribeToRoom,
    onMessage,
    onSubscribe,
  } = useWebSocket();

  // 1:1 채팅방 목록 로드
  const loadDirectRooms = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getDirectChatRooms();
      // API 응답이 배열이 아닐 경우를 대비한 안전 처리
      const rooms = Array.isArray(response) ? response : [];
      setDirectRooms(rooms);
    } catch (error) {
      console.error("1:1 채팅방 목록 로드 실패:", error);
      setDirectRooms([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 단체 채팅방 목록 로드
  const loadGroupRooms = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getGroupChatRooms();
      // API 응답이 배열이 아닐 경우를 대비한 안전 처리
      const rooms = Array.isArray(response) ? response : [];
      setGroupRooms(rooms);
    } catch (error) {
      console.error("단체 채팅방 목록 로드 실패:", error);
      setGroupRooms([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 받은 채팅 요청 목록 로드
  const loadReceivedRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getReceivedChatRequests();
      // API 응답이 배열이 아닐 경우를 대비한 안전 처리
      const requests = Array.isArray(response) ? response : [];
      setReceivedRequests(requests);
    } catch (error) {
      console.error("받은 채팅 요청 목록 로드 실패:", error);
      setReceivedRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 보낸 채팅 요청 목록 로드
  const loadSentRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getSentChatRequests();
      // API 응답이 배열이 아닐 경우를 대비한 안전 처리
      const requests = Array.isArray(response) ? response : [];
      setSentRequests(requests);
    } catch (error) {
      console.error("보낸 채팅 요청 목록 로드 실패:", error);
      setSentRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 채팅 요청 보내기
  const sendChatRequestAction = useCallback(
    async (receiverId: number, message: string) => {
      try {
        await sendChatRequest(receiverId, message);
        // 보낸 요청 목록 새로고침
        await loadSentRequests();
      } catch (error) {
        console.error("채팅 요청 전송 실패:", error);
        throw error;
      }
    },
    [loadSentRequests]
  );

  // 채팅 요청 승인
  const approveRequest = useCallback(
    async (requestId: number) => {
      try {
        await approveChatRequest(requestId);
        // 받은 요청 목록 새로고침
        await loadReceivedRequests();
        // 1:1 채팅방 목록 새로고침
        await loadDirectRooms();
      } catch (error) {
        console.error("채팅 요청 승인 실패:", error);
        throw error;
      }
    },
    [loadReceivedRequests, loadDirectRooms]
  );

  // 채팅 요청 거절
  const rejectRequest = useCallback(
    async (requestId: number) => {
      try {
        await rejectChatRequest(requestId);
        // 받은 요청 목록 새로고침
        await loadReceivedRequests();
      } catch (error) {
        console.error("채팅 요청 거절 실패:", error);
        throw error;
      }
    },
    [loadReceivedRequests]
  );

  // 채팅 요청 취소
  const cancelRequest = useCallback(
    async (requestId: number) => {
      try {
        await cancelChatRequest(requestId);
        // 보낸 요청 목록 새로고침
        await loadSentRequests();
      } catch (error) {
        console.error("채팅 요청 취소 실패:", error);
        throw error;
      }
    },
    [loadSentRequests]
  );

  // 메시지 전송
  const sendMessage = useCallback(
    (roomId: number, message: string) => {
      wsSendMessage(roomId, message);
    },
    [wsSendMessage]
  );

  // 채팅방 구독
  const subscribeToRoom = useCallback(
    (roomId: number) => {
      wsSubscribeToRoom(roomId);
    },
    [wsSubscribeToRoom]
  );

  // WebSocket 메시지 처리
  useEffect(() => {
    const handleMessage = (data: any) => {
      if (data.type === "MESSAGE" && data.roomId && data.message) {
        const newMessage: ChatMessage = {
          id: Date.now(),
          roomId: data.roomId,
          senderId: data.senderId || 0,
          senderName: data.senderName || "알 수 없음",
          message: data.message,
          timestamp: data.timestamp || new Date().toISOString(),
          isOwn: data.senderId === user.memberApartmentId,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    onMessage(handleMessage);
  }, [onMessage, user.memberApartmentId]);

  // 구독된 채팅방 처리
  useEffect(() => {
    const handleSubscribe = (rooms: number[]) => {
      console.log("구독된 채팅방:", rooms);
      // 필요한 경우 채팅방 목록 새로고침
      loadDirectRooms();
      loadGroupRooms();
    };

    onSubscribe(handleSubscribe);
  }, [onSubscribe, loadDirectRooms, loadGroupRooms]);

  // 초기 데이터 로드
  useEffect(() => {
    if (user.isLogin) {
      loadDirectRooms();
      loadGroupRooms();
      loadReceivedRequests();
      loadSentRequests();
    }
  }, [
    user.isLogin,
    loadDirectRooms,
    loadGroupRooms,
    loadReceivedRequests,
    loadSentRequests,
  ]);

  return {
    directRooms,
    groupRooms,
    receivedRequests,
    sentRequests,
    messages,
    isLoading,
    isConnected,
    loadDirectRooms,
    loadGroupRooms,
    loadReceivedRequests,
    loadSentRequests,
    sendChatRequestAction,
    approveRequest,
    rejectRequest,
    cancelRequest,
    sendMessage,
    subscribeToRoom,
  };
};
