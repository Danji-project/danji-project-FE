import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { Client, type StompSubscription } from "@stomp/stompjs";

interface WebSocketMessage {
  type?: string;
  roomId?: number;
  chatroomId?: number;
  message?: string;
  content?: string;
  sender?: string;
}

interface WebSocketContextType {
  stompClient: Client | null;
  subscriptions: Map<string, StompSubscription>;
  isConnected: boolean;
  messages: WebSocketMessage[];
  addMessage: (message: WebSocketMessage) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const stompClient = useRef<Client | null>(null);
  const subscriptions = useRef(new Map<string, StompSubscription>());

  const addMessage = (message: WebSocketMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  // 1. 토큰 발급
  useEffect(() => {
    axios
      .post(`/api/ws/token`)
      .then((res) => setToken(res.data.data))
      .catch((e) => console.error("토큰 발급 실패", e));
  }, []);

  // 2. 핸드쉐이킹
  useEffect(() => {
    if (!token) return;

    stompClient.current = new Client({
      brokerURL: `wss://danjitalk.duckdns.org/api/ws/chat?token=${token}`,
      onConnect: () => {
        console.log("WebSocket Connected");
        setIsConnected(true);
      },
      onDisconnect: () => {
        console.log("WebSocket Disconnected");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("Stomp Error", frame.headers["message"]);
      },
      onWebSocketError: (event) => {
        console.error("WebSocket Error", event);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.current.activate();

    return () => {
      stompClient.current?.deactivate();
    };
  }, [token]);

  return (
    <WebSocketContext.Provider
      value={{
        stompClient: stompClient.current,
        subscriptions: subscriptions.current,
        isConnected,
        messages,
        addMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }

  const { stompClient, subscriptions, isConnected, messages, addMessage } =
    context;

  // 구독 목록 확인
  const getSubscribedChannels = (): string[] => {
    return Array.from(subscriptions.keys());
  };

  // 구독 해제 (roomId 또는 destination 문자열 모두 지원)
  const unsubscribe = (roomIdOrDestination: number | string) => {
    const destination =
      typeof roomIdOrDestination === "number"
        ? `/topic/chat/${roomIdOrDestination}`
        : roomIdOrDestination;
    const subscription = subscriptions.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      subscriptions.delete(destination);
    }
  };

  // 구독하기
  const subscribeRooms = (roomIds: number[]) => {
    if (!stompClient?.connected) {
      console.error("WebSocket not connected");
      return;
    }

    roomIds.forEach((roomId) => {
      const destination = `/topic/chat/${roomId}`;
      if (subscriptions.has(destination)) return;

      const subscription = stompClient.subscribe(destination, (message) => {
        const data = JSON.parse(message.body);
        console.log(`Room ${roomId} message:`, data);
        addMessage({ ...data, roomId });
      });
      subscriptions.set(destination, subscription);
    });
  };

  // 메시지 보내기
  const sendMessage = (roomId: number, message: string) => {
    if (!stompClient?.connected) {
      console.error("WebSocket not connected");
      return;
    }

    stompClient.publish({
      destination: `/pub/chat/${roomId}`,
      body: JSON.stringify({ message }),
    });
  };

  return {
    getSubscribedChannels,
    unsubscribe,
    subscribeRooms,
    sendMessage,
    isConnected,
    messages,
  };
};
