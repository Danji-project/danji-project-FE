import React, { useState, type Dispatch, type SetStateAction } from "react";
import type { CommentStore3 } from "../../../stores/useCommentStore";

import styles from "./CommentBox.module.scss";
import { getRelativeTime } from "../../../utils/date";
import { useCommentReplyStore } from "../../../stores/useCommentReplyStore";
import axios from "axios";
import { useComment } from "../../../hooks/useComment";

const CommentBox = ({
  comment,
  depth = 0,
  parentId,
}: {
  comment: CommentStore3;
  depth?: number;
  parentId?: number;
}) => {
  const { isOn, targetId, setReplyOn, resetReply } = useCommentReplyStore();

  const [commentContent, setCommentContent] = useState("");

  const { addCommentMutation } = useComment(comment.feedId);

  const handleReplyClick = () => {
    if (isOn && targetId === comment.commentId) resetReply();
    else setReplyOn(comment.commentId, depth);
  };

  const handleCommentContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const sendComment = async () => {
    addCommentMutation.mutate({ contents: commentContent, parentId });
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
        <div className={styles["comment__box__userInfo__profile"]}>
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
      <div className={styles["comment__box__content"]}>
        <p>{comment.contents}</p>
      </div>
      <div className={styles["comment__box__child__button"]}>
        <button onClick={handleReplyClick}>댓글 쓰기</button>
      </div>
      {/* 댓글 창 */}
      {isOn && targetId === comment.commentId && (
        <div className={styles["comment__box__child__textbox"]}>
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
