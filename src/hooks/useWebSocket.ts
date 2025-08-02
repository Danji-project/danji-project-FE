import { useEffect, useRef, useState, useCallback } from "react";
import { getWebSocketToken } from "../api/chatApi";
import { useUserInfo } from "../stores/userStore";

interface WebSocketMessage {
  type: "MESSAGE" | "SUBSCRIBE" | "SUBSCRIBE_RESPONSE";
  roomId?: number;
  message?: string;
  senderId?: number;
  senderName?: string;
  timestamp?: string;
  subscribedRooms?: number[];
}

interface UseWebSocketReturn {
  isConnected: boolean;
  sendMessage: (roomId: number, message: string) => void;
  subscribeToRoom: (roomId: number) => void;
  unsubscribeFromRoom: (roomId: number) => void;
  onMessage: (callback: (message: WebSocketMessage) => void) => void;
  onSubscribe: (callback: (rooms: number[]) => void) => void;
}

export const useWebSocket = (): UseWebSocketReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messageCallbacks = useRef<((message: WebSocketMessage) => void)[]>([]);
  const subscribeCallbacks = useRef<((rooms: number[]) => void)[]>([]);
  const user = useUserInfo();

  // WebSocket 연결
  const connect = useCallback(async () => {
    try {
      console.log("WebSocket 연결 시작...");

      // 토큰 발급
      const { token } = await getWebSocketToken();
      console.log("토큰 발급 성공:", token ? "토큰 있음" : "토큰 없음");

      // 토큰 검증
      if (!token) {
        throw new Error("토큰이 발급되지 않았습니다.");
      }

      // WebSocket 연결
      const wsUrl = `wss://danjitalk.duckdns.org/api/ws/chat?token=${token}`;
      console.log("WebSocket URL:", wsUrl);

      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket 연결됨");
        setIsConnected(true);

        // 구독 요청
        ws.send(JSON.stringify({ type: "SUBSCRIBE" }));
      };

      ws.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          console.log("WebSocket 메시지 수신:", data);

          if (data.type === "SUBSCRIBE_RESPONSE" && data.subscribedRooms) {
            // 구독된 채널 목록 처리
            subscribeCallbacks.current.forEach((callback) =>
              callback(data.subscribedRooms!)
            );
          } else if (data.type === "MESSAGE") {
            // 메시지 처리
            messageCallbacks.current.forEach((callback) => callback(data));
          }
        } catch (error) {
          console.error("WebSocket 메시지 파싱 오류:", error);
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket 연결 종료:", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });
        setIsConnected(false);
      };

      ws.onerror = (error) => {
        console.error("WebSocket 오류:", error);
        setIsConnected(false);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("WebSocket 연결 실패:", error);
    }
  }, []);

  // 연결 해제
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  // 메시지 전송
  const sendMessage = useCallback(
    (roomId: number, message: string) => {
      if (wsRef.current && isConnected) {
        const payload = {
          type: "MESSAGE",
          roomId,
          message,
        };
        wsRef.current.send(JSON.stringify(payload));
      }
    },
    [isConnected]
  );

  // 채팅방 구독
  const subscribeToRoom = useCallback(
    (roomId: number) => {
      if (wsRef.current && isConnected) {
        const payload = {
          type: "SUBSCRIBE",
          roomId,
        };
        wsRef.current.send(JSON.stringify(payload));
      }
    },
    [isConnected]
  );

  // 채팅방 구독 해제
  const unsubscribeFromRoom = useCallback(
    (roomId: number) => {
      if (wsRef.current && isConnected) {
        const payload = {
          type: "UNSUBSCRIBE",
          roomId,
        };
        wsRef.current.send(JSON.stringify(payload));
      }
    },
    [isConnected]
  );

  // 메시지 콜백 등록
  const onMessage = useCallback(
    (callback: (message: WebSocketMessage) => void) => {
      messageCallbacks.current.push(callback);
    },
    []
  );

  // 구독 콜백 등록
  const onSubscribe = useCallback((callback: (rooms: number[]) => void) => {
    subscribeCallbacks.current.push(callback);
  }, []);

  // 로그인 상태에 따라 연결/해제
  useEffect(() => {
    if (user.isLogin) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [user.isLogin, connect, disconnect]);

  return {
    isConnected,
    sendMessage,
    subscribeToRoom,
    unsubscribeFromRoom,
    onMessage,
    onSubscribe,
  };
};
