import { useState } from "react";
import { useRootPosition } from "../../hooks/useRootPosition";
import Header from "../../layouts/Header";
import { useRootPositionStore } from "../../stores/rootPositionStore";
import { useChatDetailStore, type Response } from "../../stores/useChatDetail";
import styles from "./ChattingDetail.module.scss";
import { chatDetailList, useChat } from "../../hooks/useChat";
import { useParams } from "react-router-dom";
import { groupMessagesByDate } from "../../utils/date";
import { useUserInfo } from "../../stores/userStore";

const ChattingDetail = () => {
  const { chatroomId } = useParams();
  const { chatDatas } = useChatDetailStore();
  const { nickname } = useUserInfo();
  const [changedMessage, setChangedMessage] = useState("");
  const { sendMessages } = useChat("aa");
  const { detailFunction } = chatDetailList();

  useRootPosition();

  const { positionBottom, positionLeft } = useRootPositionStore();

  return (
    <div className={styles["chatting__detail"]}>
      <Header title={chatDatas.chatroomName} hasBackButton />
      <div className={styles["chatting__detail__main"]}>
        <div className={styles["chatting__detail__main__notice"]}>
          대화는 상대방이 수락하면 시작됩니다. <br />
          불편한 대화가 이어질 경우, 언제든지 종료될 수 있으니 <br />
          함께 편안한 대화를 나눌 수 있도록 주의해주세요.
        </div>
        <div className={styles["chatting__detail__main__per__date"]}>
          {Object.entries(
            groupMessagesByDate(chatDatas.chatMessageResponses)
          ).map(([date, msgs]) => (
            <div
              key={date}
              className={styles["chatting__detail__main__per__date__wrapper"]}
            >
              <div
                className={styles["chatting__detail__main__per__date__dater"]}
              >
                {date.split("-")[0]}년&nbsp;{date.split("-")[1]}월&nbsp;
                {date.split("-")[2]}일
              </div>
              <div
                className={
                  styles["chatting__detail__main__per__date__message__wrapper"]
                }
              >
                {msgs.map((msg: Response, idx: number) => (
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
                              "chatting__detail__main__per__date__message__others__profile"
                            ]
                          }
                        >
                          <img
                            src={
                              msg.sender.profileUrl
                                ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                                  msg.sender.profileUrl
                                : "/profile_imgSrc.jpg"
                            }
                            alt="profile"
                          />
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
          ))}
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
          />
          <button
            onClick={() => {
              sendMessages({ roomId: chatroomId!, message: changedMessage });
              setChangedMessage("");
              detailFunction.mutate(Number(chatroomId));
            }}
          >
            <img src="/submit.svg" alt="write" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattingDetail;
