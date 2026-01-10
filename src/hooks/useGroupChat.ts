import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { chatWSManager } from "../utils/websocket";

interface ChatMessage {
  roomId: string;
  message: string;
  sender: {
    id: string;
    nickname: string;
  };
  createdAt: string;
}

export const useGroupChat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // WebSocket 연결 초기화
  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        // 임시 토큰 발급
        const tokenResponse = await axios.get("/api/auth/token");
        const token = tokenResponse.data.data.token;

        // WebSocket 연결
        const connected = await chatWSManager.connect(token);
        setIsConnected(connected);

        if (connected) {
          // 메시지 수신 리스너
          chatWSManager.onMessage((message: ChatMessage) => {
            setMessages((prev) => [...prev, message]);
          });

          // 구독 리스너
          chatWSManager.onSubscribe((roomIds: string[]) => {
            setRooms(roomIds);
          });
        }
      } catch (err) {
        console.error("WebSocket 초기화 실패:", err);
        setError("채팅 연결에 실패했습니다.");
      }
    };

    initializeWebSocket();

    return () => {
      chatWSManager.disconnect();
    };
  }, []);

  // 메시지 전송
  const sendMessage = useCallback(
    (roomId: string, message: string) => {
      if (!isConnected) {
        setError("채팅 연결이 끊어졌습니다.");
        return;
      }

      try {
        chatWSManager.sendMessage(roomId, message);
      } catch (err) {
        console.error("메시지 전송 실패:", err);
        setError("메시지 전송에 실패했습니다.");
      }
    },
    [isConnected]
  );

  // 특정 방의 메시지만 필터링
  const getRoomMessages = useCallback(
    (roomId: string): ChatMessage[] => {
      return messages.filter((msg) => msg.roomId === roomId);
    },
    [messages]
  );

  return {
    isConnected,
    messages,
    rooms,
    error,
    sendMessage,
    getRoomMessages,
  };
};
