import React, { useState } from "react";
import type { CommentStore3 } from "../../../stores/useCommentStore";

import styles from "./CommentBox.module.scss";
import { getRelativeTime } from "../../../utils/date";
import { useCommentReplyStore } from "../../../stores/useCommentReplyStore";
import { useComment } from "../../../hooks/useComment";
import { usePendingStore } from "../../../stores/usePendingStore";
import { useProfileStore } from "../../../stores/useProfileStore";

const CommentBox = ({
  comment,
  depth = 0,
  parentId,
}: {
  comment: CommentStore3;
  depth?: number;
  parentId?: number;
}) => {
  const { isOn, isReply, targetId, setReplyOn, resetReply } =
    useCommentReplyStore();

  const [mode, setMode] = useState<"CONTENT" | "EDIT">("CONTENT");
  const [commentContents, setCommentContents] = useState("");

  const { setProfilePending } = usePendingStore();

  const { setMembers } = useProfileStore();

  const [commentContent, setCommentContent] = useState("");

  const { addCommentMutation, updateCommentMutation } = useComment(
    comment.feedId,
    comment.commentId
  );

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
      style={{ paddingLeft: `${depth * 40}px` }}
    >
      <div className={styles["comment__box__userInfo"]}>
        <div
          className={styles["comment__box__userInfo__profile"]}
          onClick={() => {
            setProfilePending(true);
            setMembers(comment.commentMemberResponseDto);
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
                setMode("EDIT");
                setCommentContents(comment.contents);
              }}
            >
              수정
            </button>
            <button>삭제</button>
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
                  updateCommentMutation.mutate(commentContents);
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
        <CommentBox
          key={child.commentId}
          comment={child}
          depth={depth + 1}
          parentId={comment.commentId}
        />
      ))}
    </div>
  );
};

export default CommentBox;
