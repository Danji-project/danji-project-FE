import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import axios from "axios";
import { Client, type IMessage } from "@stomp/stompjs";
import { useMutation } from "@tanstack/react-query";
import { useReceivedRequest, useSendRequest } from "../stores/useRequest";
import { useNavigate } from "react-router-dom";
import { useModalTextStore } from "../stores/useModalText";
import { usePendingStore } from "../stores/usePendingStore";
import { useChatListStore } from "../stores/useChatList";
import { useChatDetailStore } from "../stores/useChatDetail";

interface Message {
  roomId: string;
  from?: string;
  message: string;
}

export interface SentData {
  code: number;
  data: SentData2[];
}

export interface SentData2 {
  message: string;
  memberInformation: MemberInfo;
  requestId: number;
  status: string;
  createdAt: string;
}

export interface MemberInfo {
  id: number;
  nickname: string;
  profileUrl: string;
}

export const useChat = (userId: string | null) => {
  const [connected, setConnected] = useState(false);
  const [rooms, setRooms] = useState<string[] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userId) return;

    const connect = async () => {
      // 임시 토큰 발급
      try {
        const res = await axios.post(`/api/ws/token`);
        const token = res.data.data;

        const client = new Client({
          brokerURL: `/api/ws/chat?token=${token}`,
          reconnectDelay: 5000,
          onConnect: () => {
            console.log("connected to stomp");
            setConnected(true);

            client.subscribe("/subscribe", (msg: IMessage) => {
              const data = JSON.parse(msg.body);
              console.log("구독 리스트 수신 : " + data.rooms);
              setRooms(data.rooms);

              data.rooms.forEach((roomId: string) => {
                client.subscribe(
                  `/topic/chat/${roomId}`,
                  (message: IMessage) => {
                    const data = JSON.parse(message.body);
                    setMessages((prev) => [...prev, data]);
                  }
                );
              });
            });

            client.publish({
              destination: "/subscribe",
              body: JSON.stringify({ userId }),
            });
          },
          onDisconnect: () => {
            console.log("disconnected");
            setConnected(false);
          },
          onStompError: (frame) => {
            console.log("frame header : " + frame.headers["headers"]);
          },
        });

        client.activate();
        clientRef.current = client;
      } catch (e: any) {
        console.error("토큰 발급 에러 : " + e.message);
      }
    };

    connect();

    return () => {
      clientRef.current?.deactivate();
    };
  }, [userId]);

  // 채팅 메시지 보내기
  const sendMessages = ({
    roomId,
    message,
  }: {
    roomId: string;
    message: string;
  }) => {
    if (!clientRef.current || !connected) return;
    clientRef.current.publish({
      destination: `/pub/chat/${roomId}`,
      body: JSON.stringify({ message }),
    });
  };

  return { connected, rooms, messages, sendMessages };
};

// 1:1 채팅 요청하기
export const requestDirectChat = ({
  setIsFinal,
}: {
  setIsFinal: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { setModalText, setModalTitle } = useModalTextStore();
  const { setProfilePending, setModalPending } = usePendingStore();

  const requestFunction = useMutation({
    mutationFn: async ({
      receiverId,
      messages,
    }: {
      receiverId: number;
      messages: string;
    }) => {
      const res = await axios.post("/api/chat/request", {
        receiverId,
        message: messages,
      });
    },
    onSuccess: () => {
      navigate("/chat-page");
      setIsFinal(false);
      setProfilePending(false);
    },
    onError: (e: any) => {
      if (e.status === 409) {
        setIsFinal(false);
        setModalText("이미 1:1 채팅을 신청하였습니다.");
        setModalTitle("에러");
        setProfilePending(false);
        setModalPending(true);
      }
    },
  });

  return {
    requestFunction,
    requestPending: requestFunction.isPending,
  };
};

// 보낸 채팅 목록 조회
export const sendList = () => {
  const { setData } = useSendRequest();
  const sendFunction = useMutation<SentData>({
    mutationFn: async () => {
      const res = await axios.get("/api/chat/request/sent");
      setData(res.data);
      return res.data;
    },
  });

  return { sendFunction, sendPending: sendFunction.isPending };
};

// 받은 채팅 목록 조회
export const receivedList = () => {
  const { setData } = useReceivedRequest();

  const receivedFunction = useMutation<SentData>({
    mutationFn: async () => {
      const res = await axios.get(`/api/chat/request/received`);
      setData(res.data);
      return res.data;
    },
  });

  return { receivedFunction, receivedPending: receivedFunction.isPending };
};

// 보낸 요청 취소
export const cancelSend = () => {
  const { sendFunction } = sendList();

  const cancelFunction = useMutation({
    mutationFn: async (requestId: number) => {
      const res = await axios.delete(`/api/chat/request/${requestId}`);
    },
    onSuccess: () => {
      sendFunction.mutate();
    },
  });

  return { cancelFunction, cancelPending: cancelFunction.isPending };
};

// 받은 요청 수락
export const approveReceived = () => {
  const { sendFunction } = sendList();

  const approvedFunction = useMutation({
    mutationFn: async (requestId: number) => {
      const res = await axios.post(`/api/chat/request/${requestId}/approve`);
    },
    onSuccess: () => {
      sendFunction.mutate();
    },
  });

  return { approvedFunction, approvedPending: approvedFunction.isPending };
};

// 1:1 채팅 리스트
export const directChattingList = () => {
  const { setData } = useChatListStore();

  const directChatFunction = useMutation({
    mutationFn: async () => {
      const res = await axios.get(`/api/chat/direct`);
      setData(res.data);
      return res.data;
    },
  });

  return {
    directChatFunction,
    directChatPending: directChatFunction.isPending,
  };
};

// 채팅 상세
export const chatDetailList = () => {
  const { setDatas } = useChatDetailStore();

  const detailFunction = useMutation({
    mutationFn: async (id: number) => {
      const res = await axios.get(`/api/chat/room/${id}`);
      setDatas(res.data);
      return res.data;
    },
  });

  return { detailFunction, chatDetailPending: detailFunction.isPending };
};
