import React, { useState } from "react";
import type { CommentStore3 } from "../../../stores/useCommentStore";

import styles from "./CommentBox.module.scss";
import { getRelativeTime } from "../../../utils/date";
import { useCommentReplyStore } from "../../../stores/useCommentReplyStore";
import {
  useAddComment,
  useDeleteComment,
  useUpdateComment,
} from "../../../hooks/useComment";
import { usePendingStore } from "../../../stores/usePendingStore";
import { useUserInfo } from "../../../stores/userStore";
import { useModalTextStore } from "../../../stores/useModalText";

const CommentBox = ({
  comment,
  depth = 0,
}: {
  comment: CommentStore3;
  depth?: number;
}) => {
  const { isOn, isReply, targetId, setReplyOn, resetReply } =
    useCommentReplyStore();

  const { isLogin, nickname } = useUserInfo();

  const [mode, setMode] = useState<"CONTENT" | "EDIT">("CONTENT");
  const [commentContents, setCommentContents] = useState("");

  const {
    setProfilePending,
    setModalPending,
    setProfileNick,
    setProfileImg,
    setProfileId,
  } = usePendingStore();
  const { setModalText, setModalTitle } = useModalTextStore();

  const [commentContent, setCommentContent] = useState("");

  const { updateMutate } = useUpdateComment(comment.feedId, comment.commentId);

  const { deleteCommentMutation } = useDeleteComment(
    comment.feedId,
    comment.commentId
  );

  const { addCommentMutation } = useAddComment(comment.feedId);

  const handleReplyClick = () => {
    if (isOn && targetId === comment.commentId) resetReply();
    else setReplyOn(comment.commentId, depth, true);
  };

  const handleCommentContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const sendComment = async () => {
    addCommentMutation.mutate({
      contents: commentContent,
      parentId: comment.commentId,
    });
    resetReply();
  };

  return (
    <div
      className={`${styles["comment__box"]} ${
        depth > 0 ? styles["comment__box__child"] : ""
      }`}
    >
      <div className={styles["comment__box__userInfo"]}>
        <div
          className={styles["comment__box__userInfo__profile"]}
          onClick={() => {
            setProfilePending(true);
            setProfileImg(
              comment.commentMemberResponseDto.fileId
                ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                    comment.commentMemberResponseDto.fileId
                : "/profile_imgSrc.jpg"
            );
            setProfileNick(comment.commentMemberResponseDto.nickname);
            setProfileId(comment.commentMemberResponseDto.memberId);
          }}
        >
          <img
            src={
              comment.commentMemberResponseDto.fileId
                ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                  comment.commentMemberResponseDto.fileId
                : "/profile_imgSrc.jpg"
            }
            alt="profile"
          />
        </div>
        <div className={styles["comment__box__userInfo__info"]}>
          <span>{comment.commentMemberResponseDto.nickname}</span>
          <div>{getRelativeTime(comment.createdAt)}</div>
        </div>
      </div>
      <div className={styles["comment__box__userInfo__dot__button"]}>
        <button
          onClick={() => {
            setReplyOn(comment.commentId, depth, false);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {isOn && targetId === comment.commentId && !isReply && (
          <div className={styles["comment__box__userInfo__dot__button__menu"]}>
            <button
              onClick={() => {
                resetReply();
                if (
                  isLogin &&
                  nickname === comment.commentMemberResponseDto.nickname
                ) {
                  setMode("EDIT");
                  setCommentContents(comment.contents);
                } else {
                  setModalPending(true);
                  setModalText("수정 권한이 없는 사용자입니다.");
                  setModalTitle("메시지");
                }
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                resetReply();
                if (
                  !isLogin ||
                  comment.commentMemberResponseDto.nickname !== nickname
                ) {
                  setModalPending(true);
                  setModalText("삭제 권한이 없는 사용자입니다.");
                } else {
                  deleteCommentMutation.mutate();
                }
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      <div className={styles["comment__box__content"]}>
        {mode === "CONTENT" && <p>{comment.contents}</p>}
        {mode === "EDIT" && (
          <>
            <textarea
              value={commentContents}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setCommentContents(e.target.value);
              }}
            />
            <div className={styles["comment__box__content__btn"]}>
              <button
                onClick={() => {
                  updateMutate.mutate(commentContents);
                  setMode("CONTENT");
                  setCommentContents("");
                }}
              >
                수정하기
              </button>
              <button
                onClick={() => {
                  setMode("CONTENT");
                  setCommentContents("");
                }}
              >
                수정취소
              </button>
            </div>
          </>
        )}
      </div>
      <div className={styles["comment__box__child__button"]}>
        <button onClick={handleReplyClick}>댓글 쓰기</button>
      </div>
      {/* 댓글 창 */}
      {isOn && targetId === comment.commentId && isReply && (
        <div className={styles["comment__box__child__textbox"]}>
          <div className={styles["comment__box__child__setting"]}>
            {comment.commentMemberResponseDto.nickname}에게 대댓글 쓰는 중...
          </div>
          <textarea onChange={handleCommentContent} />
          <button disabled={!commentContent} onClick={sendComment}>
            보내기
          </button>
        </div>
      )}

      {/* 재귀 랜더링 */}
      {comment.childrenCommentDto?.map((child: CommentStore3) => (
        <CommentBox key={child.commentId} comment={child} depth={depth + 1} />
      ))}
    </div>
  );
};

export default CommentBox;
