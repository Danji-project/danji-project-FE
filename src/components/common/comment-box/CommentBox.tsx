import React, { type Dispatch, type SetStateAction } from "react";
import type { CommentStore3 } from "../../../stores/useCommentStore";

import styles from "./CommentBox.module.scss";
import { getRelativeTime } from "../../../utils/date";

const CommentBox = ({
  comment,
  isChildren,
}: {
  comment: CommentStore3;
  isChildren?: boolean;
}) => {
  return (
    <div
      className={`${styles["comment__box"]} ${
        isChildren ? styles["comment__box__margin"] : ""
      }`}
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
        <button>댓글 쓰기</button>
      </div>
    </div>
  );
};

export default CommentBox;
