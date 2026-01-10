import { useState, useEffect, useRef } from "react";
import { useRootPosition } from "../../hooks/useRootPosition";
import Header from "../../layouts/Header";
import { useRootPositionStore } from "../../stores/rootPositionStore";
import styles from "./ChattingDetail.module.scss";
import { useParams } from "react-router-dom";
import { groupMessagesByDate } from "../../utils/date";
import { useUserInfo } from "../../stores/userStore";
import { useGroupChat } from "../../hooks/useGroupChat";

interface Message {
  roomId: string;
  message: string;
  sender: {
    id: string;
    nickname: string;
  };
  createdAt: string;
}

const ChattingDetail = () => {
  const { chatroomId } = useParams();
  const { nickname } = useUserInfo();
  const [changedMessage, setChangedMessage] = useState("");
  const { isConnected, messages, sendMessage } = useGroupChat();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useRootPosition();

  const { positionBottom, positionLeft } = useRootPositionStore();

  // 현재 방의 메시지만 필터링
  const roomMessages = messages.filter((msg) => msg.roomId === chatroomId);

  // 새로운 메시지가 들어오면 스크롤을 아래로
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages]);

  const handleSendMessage = () => {
    if (!changedMessage.trim() || !chatroomId) return;

    try {
      sendMessage(chatroomId, changedMessage);
      setChangedMessage("");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  return (
    <div className={styles["chatting__detail"]}>
      <Header title={`단체 채팅`} hasBackButton />
      <div className={styles["chatting__detail__main"]}>
        <div className={styles["chatting__detail__main__notice"]}>
          편안한 대화를 나눌 수 있도록 주의해주세요. <br />
          불편한 대화가 이어질 경우, 언제든지 나갈 수 있습니다.
        </div>
        {!isConnected && (
          <div className={styles["chatting__detail__main__notice"]}>
            채팅 연결 중입니다...
          </div>
        )}
        <div className={styles["chatting__detail__main__per__date"]}>
          {roomMessages.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: "#999",
              }}
            >
              아직 메시지가 없습니다.
            </div>
          ) : (
            Object.entries(groupMessagesByDate(roomMessages)).map(
              ([date, msgs]) => (
                <div
                  key={date}
                  className={
                    styles["chatting__detail__main__per__date__wrapper"]
                  }
                >
                  <div
                    className={
                      styles["chatting__detail__main__per__date__dater"]
                    }
                  >
                    {date.split("-")[0]}년&nbsp;{date.split("-")[1]}월&nbsp;
                    {date.split("-")[2]}일
                  </div>
                  <div
                    className={
                      styles[
                        "chatting__detail__main__per__date__message__wrapper"
                      ]
                    }
                  >
                    {(msgs as Message[]).map((msg: Message, idx: number) => (
                      <div
                        key={idx}
                        className={
                          styles["chatting__detail__main__per__date__message"]
                        }
                        style={{
                          alignSelf:
                            msg.sender.nickname === nickname ? "end" : "start",
                        }}
                      >
                        {msg.sender.nickname === nickname ? (
                          <div
                            className={
                              styles[
                                "chatting__detail__main__per__date__message__mine"
                              ]
                            }
                          >
                            <div
                              className={
                                styles[
                                  "chatting__detail__main__per__date__message__mine__time"
                                ]
                              }
                            >
                              {msg.createdAt.split("T")[1].split(":")[0]}:
                              {msg.createdAt.split("T")[1].split(":")[1]}
                            </div>
                            <div
                              className={
                                styles[
                                  "chatting__detail__main__per__date__message__mine__box"
                                ]
                              }
                            >
                              {msg.message}
                            </div>
                          </div>
                        ) : (
                          <div
                            className={
                              styles[
                                "chatting__detail__main__per__date__message__others"
                              ]
                            }
                          >
                            <div
                              className={
                                styles[
                                  "chatting__detail__main__per__date__message__others__info"
                                ]
                              }
                            >
                              <strong>{msg.sender.nickname}</strong>
                            </div>
                            <div
                              className={
                                styles[
                                  "chatting__detail__main__per__date__message__others__box"
                                ]
                              }
                            >
                              {msg.message}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          )}
          <div ref={messageEndRef} />
        </div>
      </div>
      <div
        className={styles["chatting__detail__chat"]}
        style={{
          bottom: `calc(100vh - ${positionBottom}px)`,
          left: `${positionLeft}px`,
        }}
      >
        <div className={styles["chatting__detail__chat__wrapper"]}>
          <textarea
            value={changedMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setChangedMessage(e.target.value)
            }
            placeholder="메시지를 입력하세요"
            disabled={!isConnected}
          />
          <button
            onClick={handleSendMessage}
            disabled={!isConnected || !changedMessage.trim()}
          >
            <img src="/submit.svg" alt="write" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattingDetail;
