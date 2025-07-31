import { useState, useRef, useEffect } from "react";
import { useUserInfo } from "../../stores/userStore";
import { useChat } from "../../hooks/useChat";
import type { ChatRoom as ChatRoomType } from "../../api/chatApi";
import styles from "./ChatRoom.module.scss";

interface ChatRoomProps {
  room: ChatRoomType;
  onBack: () => void;
}

const ChatRoom = ({ room, onBack }: ChatRoomProps) => {
  const user = useUserInfo();
  const { sendMessage, subscribeToRoom } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 채팅방 구독
  useEffect(() => {
    subscribeToRoom(room.id);
  }, [room.id, subscribeToRoom]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(room.id, newMessage);
      setNewMessage("");
    }
  };

  // Enter 키로 메시지 전송
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatRoom}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ←
        </button>
        <div className={styles.roomInfo}>
          <h3>{room.name}</h3>
          <span className={styles.participantCount}>
            {room.participants.length}명
          </span>
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💬</div>
            <h3>메시지가 없습니다</h3>
            <p>첫 번째 메시지를 보내보세요!</p>
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.isOwn ? styles.ownMessage : styles.otherMessage
                }`}
              >
                <div className={styles.messageContent}>
                  <p>{message.message}</p>
                  <span className={styles.timestamp}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 메시지 입력 */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.messageInput}
          />
          <button
            onClick={handleSendMessage}
            className={styles.sendButton}
            disabled={!newMessage.trim()}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
