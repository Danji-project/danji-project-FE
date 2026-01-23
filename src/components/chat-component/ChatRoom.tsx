import { useEffect, useRef, useState } from "react";
import { useChat } from "../../hooks/useChat";
import { useWebSocket } from "../../hooks/WebSocketContext";
import {
  useChatRoomStore,
  type ChatMessage,
} from "../../stores/useChatRoomStore";
import { timeAgo } from "../../utils/timeAgo";
import styles from "./ChatRoom.module.scss";

interface ChatRoomProps {
  chatroomId: number;
  onBack: () => void;
}

const ChatRoom = ({ chatroomId, onBack }: ChatRoomProps) => {
  const { getChatRoom, getChatRoomPending } = useChat();
  const { sendMessage, messages: wsMessages, subscribeRooms, isConnected } = useWebSocket();
  const { data: chatRoomData } = useChatRoomStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    getChatRoom.mutate({ chatroomId });
    setLocalMessages([]);
  }, [chatroomId]);

  // 채팅방 구독
  useEffect(() => {
    if (isConnected) {
      subscribeRooms([chatroomId]);
    }
  }, [chatroomId, isConnected]);

  // WebSocket 메시지가 오면 해당 채팅방의 메시지만 추가
  useEffect(() => {
    if (wsMessages.length === 0) return;

    const latestWsMessage = wsMessages.at(-1);
    if (!latestWsMessage) return;

    // WebSocket 메시지에서 roomId가 현재 채팅방과 일치하면 추가
    // chatroomId 또는 roomId 둘 다 체크
    const messageRoomId =
      latestWsMessage.roomId ??
      (latestWsMessage as { chatroomId?: number }).chatroomId;

    if (latestWsMessage.type === "MESSAGE" && messageRoomId === chatroomId) {
      const newMessage: ChatMessage = {
        id: `ws-${Date.now()}`,
        chatroomId: chatroomId,
        sender: {
          id: 0,
          nickname: latestWsMessage.sender || "Unknown",
          profileUrl: null,
        },
        message: latestWsMessage.message || latestWsMessage.content || "",
        imageUrl: "",
        createdAt: new Date().toISOString(),
      };

      setLocalMessages((prev) => {
        // 중복 체크
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
    }
  }, [wsMessages, chatroomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatRoomData?.chatMessageResponses, localMessages]);

  if (getChatRoomPending) {
    return (
      <div className={styles["chatroom"]}>
        <div className={styles["chatroom__header"]}>
          <button onClick={onBack} className={styles["chatroom__back"]}>
            ←
          </button>
          <span>로딩중...</span>
        </div>
      </div>
    );
  }

  if (!chatRoomData) {
    return (
      <div className={styles["chatroom"]}>
        <div className={styles["chatroom__header"]}>
          <button onClick={onBack} className={styles["chatroom__back"]}>
            ←
          </button>
          <span>채팅방을 찾을 수 없습니다.</span>
        </div>
      </div>
    );
  }

  const allMessages = [...chatRoomData.chatMessageResponses, ...localMessages];
  const sortedMessages = [...allMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <div className={styles["chatroom"]}>
      <div className={styles["chatroom__header"]}>
        <button onClick={onBack} className={styles["chatroom__back"]}>
          ←
        </button>
        <span className={styles["chatroom__title"]}>
          {chatRoomData.chatroomName}
        </span>
        <span className={styles["chatroom__member-count"]}>
          {chatRoomData.memberCount}명
        </span>
      </div>
      <div className={styles["chatroom__messages"]}>
        {sortedMessages.map((message: ChatMessage) => (
          <div key={message.id} className={styles["chatroom__message"]}>
            <div className={styles["chatroom__message__profile"]}>
              <img
                src={
                  message.sender.profileUrl
                    ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                      message.sender.profileUrl
                    : "/profile_imgSrc.jpg"
                }
                alt="profile"
              />
            </div>
            <div className={styles["chatroom__message__content"]}>
              <div className={styles["chatroom__message__header"]}>
                <span className={styles["chatroom__message__nickname"]}>
                  {message.sender.nickname}
                </span>
                <span className={styles["chatroom__message__time"]}>
                  {timeAgo(message.createdAt)}
                </span>
              </div>
              <div className={styles["chatroom__message__text"]}>
                {message.message}
              </div>
              {message.imageUrl && (
                <img
                  src={
                    "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                    message.imageUrl
                  }
                  alt="image"
                  className={styles["chatroom__message__image"]}
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles["chatroom__input"]}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputMessage.trim()) {
              // Optimistic Update: 즉시 로컬에 추가
              const newMessage: ChatMessage = {
                id: `local-${Date.now()}`,
                chatroomId: chatroomId,
                sender: {
                  id: 0,
                  nickname: "나",
                  profileUrl: null,
                },
                message: inputMessage.trim(),
                imageUrl: "",
                createdAt: new Date().toISOString(),
              };
              setLocalMessages((prev) => [...prev, newMessage]);

              sendMessage(chatroomId, inputMessage.trim());
              setInputMessage("");
            }
          }}
        />
        <button
          onClick={() => {
            if (inputMessage.trim()) {
              // Optimistic Update: 즉시 로컬에 추가
              const newMessage: ChatMessage = {
                id: `local-${Date.now()}`,
                chatroomId: chatroomId,
                sender: {
                  id: 0,
                  nickname: "나",
                  profileUrl: null,
                },
                message: inputMessage.trim(),
                imageUrl: "",
                createdAt: new Date().toISOString(),
              };
              setLocalMessages((prev) => [...prev, newMessage]);

              sendMessage(chatroomId, inputMessage.trim());
              setInputMessage("");
            }
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
