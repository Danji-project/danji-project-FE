import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";
import { useChat } from "../../hooks/useChat";
import Header from "../../layouts/Header";
import ChatRequestModal from "../../components/chat/ChatRequestModal";
import styles from "./ChatPage.module.scss";
import type { ChatRoom, ChatRequest } from "../../api/chatApi";

const ChatPage = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const {
    directRooms,
    groupRooms,
    receivedRequests,
    sentRequests,
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
  } = useChat();

  const [selectedTab, setSelectedTab] = useState<
    "individual" | "group" | "received" | "sent"
  >("individual");
  const [searchText, setSearchText] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isChatRequestModalOpen, setIsChatRequestModalOpen] = useState(false);
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
  }, []);

  // 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedRoomId) {
      // WebSocket을 통해 메시지 전송
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

  // 채팅 요청 처리
  const handleApproveRequest = async (requestId: number) => {
    try {
      await approveRequest(requestId);
    } catch (error) {
      console.error("채팅 요청 승인 실패:", error);
    }
  };

  const handleRejectRequest = async (requestId: number) => {
    try {
      await rejectRequest(requestId);
    } catch (error) {
      console.error("채팅 요청 거절 실패:", error);
    }
  };

  const handleCancelRequest = async (requestId: number) => {
    try {
      await cancelRequest(requestId);
    } catch (error) {
      console.error("채팅 요청 취소 실패:", error);
    }
  };

  const handleSendChatRequest = async (receiverId: number, message: string) => {
    try {
      await sendChatRequestAction(receiverId, message);
    } catch (error) {
      console.error("채팅 요청 전송 실패:", error);
      throw error;
    }
  };

  // 로그인하지 않은 사용자인 경우 아무것도 렌더링하지 않음
  if (!user.isLogin) {
    return null;
  }

  // 필터링된 채팅방 목록 (안전 처리 추가)
  const filteredDirectRooms = Array.isArray(directRooms)
    ? directRooms.filter((room) =>
        room.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const filteredGroupRooms = Array.isArray(groupRooms)
    ? groupRooms.filter((room) =>
        room.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const filteredReceivedRequests = Array.isArray(receivedRequests)
    ? receivedRequests.filter((request) =>
        request.message.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const filteredSentRequests = Array.isArray(sentRequests)
    ? sentRequests.filter((request) =>
        request.message.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className={styles["chat-page"]}>
      <Header title="채팅" hasBackButton={true} />

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

        {/* 검색바 및 채팅 요청 버튼 */}
        <div className={styles["search-container"]}>
          <div className={styles["search-wrapper"]}>
            <input
              type="text"
              placeholder="채팅방 또는 연락처 검색"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles["search-input"]}
            />
            <button
              className={styles["new-chat-button"]}
              onClick={() => setIsChatRequestModalOpen(true)}
            >
              새 채팅
            </button>
          </div>
        </div>

        {/* 1:1 채팅 목록 */}
        {selectedTab === "individual" && (
          <div className={styles["chat-rooms"]}>
            {isLoading ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>⏳</div>
                <h3>로딩 중...</h3>
              </div>
            ) : filteredDirectRooms.length === 0 ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>💬</div>
                <h3>1:1 채팅이 없습니다</h3>
                <p>새로운 1:1 대화를 시작해보세요</p>
              </div>
            ) : (
              filteredDirectRooms.map((room) => (
                <div key={room.id} className={styles["chat-room-item"]}>
                  <div className={styles["room-avatar"]}>
                    <img
                      src={
                        room.participants[0]?.profileImage ||
                        "/profile_imgSrc.jpg"
                      }
                      alt={room.name}
                    />
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
                        {room.lastMessage || "메시지가 없습니다"}
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
            {isLoading ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>⏳</div>
                <h3>로딩 중...</h3>
              </div>
            ) : filteredGroupRooms.length === 0 ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>👥</div>
                <h3>단체 채팅이 없습니다</h3>
                <p>단체 채팅방을 만들어보세요</p>
              </div>
            ) : (
              filteredGroupRooms.map((room) => (
                <div key={room.id} className={styles["chat-room-item"]}>
                  <div className={styles["room-avatar"]}>
                    <img src="/profile_imgSrc.jpg" alt={room.name} />
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
                        {room.lastMessage || "메시지가 없습니다"}
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

        {/* 받은 요청 목록 */}
        {selectedTab === "received" && (
          <div className={styles["chat-rooms"]}>
            {isLoading ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>⏳</div>
                <h3>로딩 중...</h3>
              </div>
            ) : filteredReceivedRequests.length === 0 ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>📥</div>
                <h3>받은 요청이 없습니다</h3>
                <p>다른 사용자의 채팅 요청을 기다려보세요</p>
              </div>
            ) : (
              filteredReceivedRequests.map((request) => (
                <div key={request.id} className={styles["chat-room-item"]}>
                  <div className={styles["room-avatar"]}>
                    <img src="/profile_imgSrc.jpg" alt="요청자" />
                  </div>
                  <div className={styles["room-info"]}>
                    <div className={styles["room-header"]}>
                      <h4>채팅 요청</h4>
                      <span className={styles["last-time"]}>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles["room-footer"]}>
                      <p className={styles["last-message"]}>
                        {request.message}
                      </p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => handleApproveRequest(request.id)}
                          style={{
                            padding: "4px 8px",
                            fontSize: "12px",
                            backgroundColor: "#2773e6",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          승인
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          style={{
                            padding: "4px 8px",
                            fontSize: "12px",
                            backgroundColor: "#ff4757",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          거절
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 보낸 요청 목록 */}
        {selectedTab === "sent" && (
          <div className={styles["chat-rooms"]}>
            {isLoading ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>⏳</div>
                <h3>로딩 중...</h3>
              </div>
            ) : filteredSentRequests.length === 0 ? (
              <div className={styles["empty-state"]}>
                <div className={styles["empty-icon"]}>📤</div>
                <h3>보낸 요청이 없습니다</h3>
                <p>채팅 요청을 보내보세요</p>
              </div>
            ) : (
              filteredSentRequests.map((request) => (
                <div key={request.id} className={styles["chat-room-item"]}>
                  <div className={styles["room-avatar"]}>
                    <img src="/profile_imgSrc.jpg" alt="수신자" />
                  </div>
                  <div className={styles["room-info"]}>
                    <div className={styles["room-header"]}>
                      <h4>채팅 요청</h4>
                      <span className={styles["last-time"]}>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles["room-footer"]}>
                      <p className={styles["last-message"]}>
                        {request.message}
                      </p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <span style={{ fontSize: "12px", color: "#666" }}>
                          {request.status === "PENDING" && "대기 중"}
                          {request.status === "APPROVED" && "승인됨"}
                          {request.status === "REJECTED" && "거절됨"}
                        </span>
                        {request.status === "PENDING" && (
                          <button
                            onClick={() => handleCancelRequest(request.id)}
                            style={{
                              padding: "4px 8px",
                              fontSize: "12px",
                              backgroundColor: "#ff4757",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            취소
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
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
              disabled={!newMessage.trim() || !selectedRoomId}
            >
              전송
            </button>
          </div>
        </div>

        {/* 채팅 요청 모달 */}
        <ChatRequestModal
          isOpen={isChatRequestModalOpen}
          onClose={() => setIsChatRequestModalOpen(false)}
          onSendRequest={handleSendChatRequest}
        />
      </div>
    </div>
  );
};

export default ChatPage;
