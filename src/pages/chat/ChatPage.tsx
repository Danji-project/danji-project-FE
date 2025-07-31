import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";
import Header from "../../layouts/Header";
import styles from "./ChatPage.module.scss";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatar: string;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const [selectedTab, setSelectedTab] = useState<
    "individual" | "group" | "received" | "sent"
  >("individual");
  const [searchText, setSearchText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }
  }, [user.isLogin, navigate]);

  // 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: user.nickname || user.name || "나",
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages((prev) => [...prev, message]);
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

  // 로그인하지 않은 사용자인 경우 아무것도 렌더링하지 않음
  if (!user.isLogin) {
    return null;
  }

  return (
    <div className={styles["chat-page"]}>
      <Header title="채팅" type="main" hasBackButton={true} />

      <div className={styles["chat-container"]}>
        {/* 탭 네비게이션 */}
        <div className={styles["tab-navigation"]}>
          <button
            className={`${styles["tab-button"]} ${
              selectedTab === "individual" ? styles["active"] : ""
            }`}
            onClick={() => setSelectedTab("individual")}
          >
            1:1 채팅
          </button>
          <button
            className={`${styles["tab-button"]} ${
              selectedTab === "group" ? styles["active"] : ""
            }`}
            onClick={() => setSelectedTab("group")}
          >
            단체 채팅
          </button>
          <button
            className={`${styles["tab-button"]} ${
              selectedTab === "received" ? styles["active"] : ""
            }`}
            onClick={() => setSelectedTab("received")}
          >
            받은 요청
          </button>
          <button
            className={`${styles["tab-button"]} ${
              selectedTab === "sent" ? styles["active"] : ""
            }`}
            onClick={() => setSelectedTab("sent")}
          >
            보낸 요청
          </button>
        </div>

        {/* 검색바 */}
        <div className={styles["search-container"]}>
          <input
            type="text"
            placeholder="채팅방 또는 연락처 검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={styles["search-input"]}
          />
        </div>

        {/* 1:1 채팅 목록 */}
        {selectedTab === "individual" && (
          <div className={styles["chat-rooms"]}>
            {chatRooms.length === 0 ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>💬</div>
                <h3>1:1 채팅이 없습니다</h3>
                <p>새로운 1:1 대화를 시작해보세요</p>
              </div>
            ) : (
              chatRooms.map((room) => (
                <div key={room.id} className={styles["chat-room-item"]}>
                  <div className={styles["room-avatar"]}>
                    <img src={room.avatar} alt={room.name} />
                  </div>
                  <div className={styles["room-info"]}>
                    <div className={styles["room-header"]}>
                      <h4>{room.name}</h4>
                      <span className={styles["last-time"]}>
                        {room.lastMessageTime}
                      </span>
                    </div>
                    <div className={styles["room-footer"]}>
                      <p className={styles["last-message"]}>
                        {room.lastMessage}
                      </p>
                      {room.unreadCount > 0 && (
                        <span className={styles["unread-count"]}>
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 단체 채팅 목록 */}
        {selectedTab === "group" && (
          <div className={styles["chat-rooms"]}>
            <div className={styles["empty-state"]}>
              <div className={styles["empty-icon"]}>👥</div>
              <h3>단체 채팅이 없습니다</h3>
              <p>단체 채팅방을 만들어보세요</p>
            </div>
          </div>
        )}

        {/* 받은 요청 목록 */}
        {selectedTab === "received" && (
          <div className={styles["chat-rooms"]}>
            <div className={styles["empty-state"]}>
              <div className={styles["empty-icon"]}>📥</div>
              <h3>받은 요청이 없습니다</h3>
              <p>다른 사용자의 채팅 요청을 기다려보세요</p>
            </div>
          </div>
        )}

        {/* 보낸 요청 목록 */}
        {selectedTab === "sent" && (
          <div className={styles["chat-rooms"]}>
            <div className={styles["empty-state"]}>
              <div className={styles["empty-icon"]}>📤</div>
              <h3>보낸 요청이 없습니다</h3>
              <p>채팅 요청을 보내보세요</p>
            </div>
          </div>
        )}

        {/* 메시지 입력 영역 */}
        <div className={styles["message-input-container"]}>
          <div className={styles["message-input-wrapper"]}>
            <input
              type="text"
              placeholder="메시지를 입력하세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles["message-input"]}
            />
            <button
              onClick={handleSendMessage}
              className={styles["send-button"]}
              disabled={!newMessage.trim()}
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
