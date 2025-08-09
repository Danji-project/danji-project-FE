import { useMemo, useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Header from "../../layouts/Header";
import styles from "./ChatPage.module.scss";

type ChatParticipant = {
  id: number;
  name: string;
  avatarUrl?: string;
};

type ChatRoom = {
  id: number;
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  participants: ChatParticipant[];
  type: "dm" | "group";
};

type ChatMessage = {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
};

type ReceivedRequest = {
  id: number;
  name: string;
  avatarUrl?: string;
  timeLabel: string;
  text: string;
};

type SentRequest = {
  id: number;
  name: string;
  avatarUrl?: string;
  timeLabel: string;
  text: string;
  status: "pending";
};

const mockRooms: ChatRoom[] = [
  {
    id: 1,
    name: "관리사무소",
    lastMessage: "민원 접수되었습니다.",
    lastMessageTime: "오전 10:24",
    unreadCount: 2,
    participants: [{ id: 1, name: "관리자" }],
    type: "dm",
  },
  {
    id: 2,
    name: "501동 이웃방",
    lastMessage: "오늘 모임 있어요!",
    lastMessageTime: "어제",
    unreadCount: 0,
    participants: [
      { id: 2, name: "김이웃" },
      { id: 3, name: "박이웃" },
    ],
    type: "group",
  },
  {
    id: 3,
    name: "관리사무소 공지",
    lastMessage: "이번 주 소독 일정 안내",
    lastMessageTime: "2일 전",
    unreadCount: 1,
    participants: [
      { id: 1, name: "관리자" },
      { id: 4, name: "입주민" },
      { id: 5, name: "입주민" },
    ],
    type: "group",
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: 101,
    roomId: 1,
    senderId: 1,
    senderName: "관리자",
    text: "안녕하세요. 무엇을 도와드릴까요?",
    timestamp: new Date().toISOString(),
    isOwn: false,
  },
  {
    id: 102,
    roomId: 1,
    senderId: 999,
    senderName: "나",
    text: "엘리베이터 점검 일정이 궁금합니다.",
    timestamp: new Date().toISOString(),
    isOwn: true,
  },
];

const mockReceived: ReceivedRequest[] = [
  {
    id: 1,
    name: "한예빈",
    timeLabel: "3분 전",
    text: "아파트 관련해서 정보 좀 얻고자 연락드렸어요. 혹시 아파트 도서관 사용을 위해 정액권을 끊어야 하나요?",
  },
  {
    id: 2,
    name: "이진아",
    timeLabel: "3분 전",
    text: "안녕하세요!",
  },
];

const mockSent: SentRequest[] = [
  {
    id: 1,
    name: "한예빈",
    timeLabel: "3분 전",
    text: "아파트 관련해서 정보 좀 얻고자 연락드렸어요. 혹시 아파트 도서관 사용을 위해 정액권을 끊어야 하나요?",
    status: "pending",
  },
  {
    id: 2,
    name: "이진아",
    timeLabel: "3분 전",
    text: "안녕하세요!",
    status: "pending",
  },
];

const ChatPage = () => {
  const [view, setView] = useState<"list" | "room">("list");
  const [rooms] = useState<ChatRoom[]>(mockRooms);
  const [tab, setTab] = useState<"individual" | "group" | "received" | "sent">(
    "individual"
  );
  const [activeRoomId, setActiveRoomId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const [received, setReceived] = useState<ReceivedRequest[]>(mockReceived);
  const [sent, setSent] = useState<SentRequest[]>(mockSent);

  const activeRoom = useMemo(
    () => rooms.find((r) => r.id === activeRoomId) || null,
    [rooms, activeRoomId]
  );

  const dmRooms = useMemo(() => rooms.filter((r) => r.type === "dm"), [rooms]);
  const groupRooms = useMemo(
    () => rooms.filter((r) => r.type === "group"),
    [rooms]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, view]);

  const enterRoom = (roomId: number) => {
    setActiveRoomId(roomId);
    setMessages(mockMessages.filter((m) => m.roomId === roomId));
    setView("room");
  };

  const leaveRoom = () => {
    setView("list");
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || !activeRoomId) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      roomId: activeRoomId,
      senderId: 999,
      senderName: "나",
      text,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  // 검색 기능은 요구사항에서 제외되었습니다.

  return (
    <div className={styles.chatPage}>
      <Header title="채팅" hasBackButton={true} />

      {view === "list" && (
        <div className={styles.listPane}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${
                tab === "individual" ? styles.active : ""
              }`}
              onClick={() => setTab("individual")}
            >
              1:1 채팅
            </button>
            <button
              className={`${styles.tabButton} ${
                tab === "group" ? styles.active : ""
              }`}
              onClick={() => setTab("group")}
            >
              단체 채팅
            </button>
            <button
              className={`${styles.tabButton} ${
                tab === "received" ? styles.active : ""
              }`}
              onClick={() => setTab("received")}
            >
              받은 요청
            </button>
            <button
              className={`${styles.tabButton} ${
                tab === "sent" ? styles.active : ""
              }`}
              onClick={() => setTab("sent")}
            >
              보낸 요청
            </button>
          </div>
          {tab === "individual" && (
            <>
              {dmRooms.length === 0 ? (
                <div className={styles.emptyState}>
                  <div>💬</div>
                  <p>채팅방이 없습니다</p>
                </div>
              ) : (
                <ul className={styles.roomList}>
                  {dmRooms.map((room) => (
                    <li
                      key={room.id}
                      className={styles.dmItem}
                      onClick={() => enterRoom(room.id)}
                    >
                      <div className={styles.avatar}>
                        <img src="/profile_imgSrc.jpg" alt={room.name} />
                      </div>
                      <div className={styles.roomMeta}>
                        <div className={styles.metaRow}>
                          <h4 className={styles.name}>{room.name}</h4>
                          <span className={styles.time}>
                            {room.lastMessageTime}
                          </span>
                        </div>
                        <p className={styles.messageText}>
                          {room.lastMessage || "메시지가 없습니다"}
                        </p>
                      </div>
                      <button
                        className={styles.menuButton}
                        aria-label="메뉴"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <BsThreeDotsVertical />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {tab === "group" && (
            <>
              {groupRooms.length === 0 ? (
                <div className={styles.emptyState}>
                  <div>👥</div>
                  <p>단체 채팅이 없습니다</p>
                </div>
              ) : (
                <ul className={styles.roomList}>
                  {groupRooms.map((room) => (
                    <li
                      key={room.id}
                      className={styles.dmItem}
                      onClick={() => enterRoom(room.id)}
                    >
                      <div className={styles.groupAvatarStack}>
                        <img src="/profile_imgSrc.jpg" alt="member-1" />
                        <img src="/profile_imgSrc.jpg" alt="member-2" />
                      </div>
                      <div className={styles.roomMeta}>
                        <div className={styles.metaRow}>
                          <h4 className={styles.name}>{room.name}</h4>
                          <span className={styles.time}>
                            {room.lastMessageTime}
                          </span>
                        </div>
                        <p className={styles.messageText}>
                          {room.lastMessage ||
                            `${room.participants.length}명 참여중`}
                        </p>
                      </div>
                      <button
                        className={styles.menuButton}
                        aria-label="메뉴"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <BsThreeDotsVertical />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {tab === "received" && (
            <>
              {received.length === 0 ? (
                <div className={styles.emptyState}>
                  <div>📥</div>
                  <p>받은 요청이 없습니다</p>
                </div>
              ) : (
                <ul className={styles.requestList}>
                  {received.map((r) => (
                    <li key={r.id} className={styles.requestItem}>
                      <div className={styles.avatar}>
                        <img src="/profile_imgSrc.jpg" alt={r.name} />
                      </div>
                      <div className={styles.requestBody}>
                        <div className={styles.requestHeader}>
                          <strong className={styles.requestName}>
                            {r.name}
                          </strong>
                          <span className={styles.requestTime}>
                            {r.timeLabel}
                          </span>
                        </div>
                        <p className={styles.requestText}>{r.text}</p>
                        <div className={styles.requestActions}>
                          <button
                            className={styles.rejectBtn}
                            onClick={() =>
                              setReceived((prev) =>
                                prev.filter((x) => x.id !== r.id)
                              )
                            }
                          >
                            거절
                          </button>
                          <span>|</span>
                          <button
                            className={styles.acceptBtn}
                            onClick={() =>
                              setReceived((prev) =>
                                prev.filter((x) => x.id !== r.id)
                              )
                            }
                          >
                            수락
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {tab === "sent" && (
            <>
              {sent.length === 0 ? (
                <div className={styles.emptyState}>
                  <div>📤</div>
                  <p>보낸 요청이 없습니다</p>
                </div>
              ) : (
                <ul className={styles.requestList}>
                  {sent.map((s) => (
                    <li key={s.id} className={styles.requestItem}>
                      <div className={styles.avatar}>
                        <img src="/profile_imgSrc.jpg" alt={s.name} />
                      </div>
                      <div className={styles.requestBody}>
                        <div className={styles.requestHeader}>
                          <strong className={styles.requestName}>
                            {s.name}
                          </strong>
                          <span className={styles.requestTime}>
                            {s.timeLabel}
                          </span>
                        </div>
                        <p className={styles.requestText}>{s.text}</p>
                        <div className={styles.requestActions}>
                          <span className={styles.pendingLabel}>대기중</span>
                          <span>|</span>
                          <button
                            className={styles.cancelBtn}
                            onClick={() =>
                              setSent((prev) =>
                                prev.filter((x) => x.id !== s.id)
                              )
                            }
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}

      {view === "room" && activeRoom && (
        <div className={styles.roomPane}>
          <div className={styles.roomHeader}>
            <button className={styles.backBtn} onClick={leaveRoom}>
              ←
            </button>
            <div className={styles.roomTitle}>
              <h3>{activeRoom.name}</h3>
              <span>{activeRoom.participants.length}명</span>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.message} ${
                  m.isOwn ? styles.own : styles.other
                }`}
              >
                <div className={styles.bubble}>
                  <p>{m.text}</p>
                  <span className={styles.msgTime}>
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className={styles.inputBar}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button disabled={!input.trim()} onClick={sendMessage}>
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
