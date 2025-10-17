import React, { useEffect, useState } from "react";
import type { FeedDetail } from "../../hooks/useFeedDetail";

import styles from "./CommunityDetailContents.module.scss";
import SmallIcon from "../common/small-icon/SmallIcon";
import { useComment } from "../../hooks/useComment";
import {
  useCommentStore,
  type CommentStore3,
} from "../../stores/useCommentStore";
import CommentBox from "../common/comment-box/CommentBox";

const CommunityDetailContents = ({
  contentData,
}: {
  contentData: FeedDetail | null;
}) => {
  const feedId = contentData?.data?.feedId;

  const { data: commentData } = useCommentStore();

  useComment(feedId!);

  if (!feedId) return <div>대기중...</div>;

  return (
    <div className={styles["feed__detail__contents"]}>
      <h1 className={styles["feed__detail__contents__title"]}>
        {contentData?.data.title}
      </h1>
      <div className={styles["feed__detail__contents__info"]}>
        <div className={styles["feed__detail__contents__info__author"]}>
          <span>작성자</span>
          <span>{contentData?.data.feedMemberResponseDto.nickname}</span>
          <span>{contentData?.data.createdAt.split("T")[0]}</span>
        </div>
        <div className={styles["feed__detail__contents__info__icons"]}>
          <SmallIcon
            iconSrc="/icons/seeSight.svg"
            number={contentData?.data.viewCount!}
          />
          <SmallIcon
            iconSrc="/icons/like.svg"
            number={contentData?.data.reactionCount!}
          />
          <SmallIcon
            iconSrc="/icons/seeSight.svg"
            number={contentData?.data.viewCount!}
          />
          <SmallIcon
            iconSrc="/icons/seeSight.svg"
            number={contentData?.data.viewCount!}
          />
        </div>
      </div>
      <div className={styles["feed__detail__contents__box"]}>
        <p>{contentData?.data.contents}</p>
      </div>
      {contentData?.data.s3ObjectResponseDtoList && (
        <div className={styles["feed__detail__contents__image"]}>
          {contentData?.data.s3ObjectResponseDtoList
            .slice(0, 4)
            .map((s3: any) => (
              <div className={styles["feed__detail__contents__image__box"]}>
                <img src={s3.fullUrl} alt="s3" />
              </div>
            ))}
        </div>
      )}
      <div className={styles["feed__detail__contents__react"]}>
        <button>
          <img src={"/icons/react.png"} alt="react" />
        </button>
        <button>
          <img src={"/icons/bookmark_btn.png"} alt="bookmark" />
        </button>
      </div>
      <div className={styles["feed__detail__contents__comment"]}>
        <h1>댓글({commentData.content.length})</h1>
        <div className={styles["feed__detail__contents__comment__wrapper"]}>
          {commentData.content.map((com: CommentStore3) => (
            <>
              <CommentBox comment={com} />
              {com.childrenCommentDto.map((children: CommentStore3) => (
                <CommentBox comment={children} isChildren />
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailContents;
