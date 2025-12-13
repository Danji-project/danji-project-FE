import ReactDOM from "react-dom";
import { useEffect, useRef,useState } from "react";
import type { FeedDetail } from "../../hooks/useFeedDetail";

import styles from "./CommunityDetailContents.module.scss";
import SmallIcon from "../common/small-icon/SmallIcon";
import { useComment, useAddComment } from "../../hooks/useComment";
import {
  useCommentStore,
  type CommentStore3,
} from "../../stores/useCommentStore";
import CommentBox from "../common/comment-box/CommentBox";
import { usePendingStore } from "../../stores/usePendingStore";
import ProfileModal from "../common/profile-modal/ProfileModal";
import TextModal from "../common/text-modal/TextModal";
import { useModalTextStore } from "../../stores/useModalText";
import { useBookMark } from "../../hooks/useBookMark";
import { useReactMutate } from "../../hooks/useReactMutate";

const CommunityDetailContents = ({
  contentData,
}: {
  contentData: FeedDetail;
}) => {
  const feedId = contentData.data.feedId;
  const [commentText, setCommentText] = useState("");
  const {
    profilePending,
    modalPending,
    setModalPending,
    profileNick,
    profileImg,
  } = usePendingStore();
  
  const { FeedBookMarkMutate ,FeedBookMarkDeleteMutate} = useBookMark();

  const clickBookMark= () => {
    //console.log("book mark on!");
    if(feedId && !contentData?.data?.isBookmarked)
    {
      FeedBookMarkMutate(feedId);
    }
    else if(feedId && contentData?.data?.isBookmarked)
    {
      FeedBookMarkDeleteMutate(feedId);
    }
  };

  const { FeedReactMutate ,FeedReactDeleteMutate} = useReactMutate();

  const clickReact= () => {
    //console.log("book mark on!");
    if(feedId && !contentData?.data?.isReacted)
    {
      FeedReactMutate(feedId);
    }
    else if(feedId && contentData?.data?.isReacted)
    {
      FeedReactDeleteMutate(feedId);
    }
  };


  const { data: commentData } = useCommentStore();
  const { modalText } = useModalTextStore();
  useComment(feedId);

  const { addCommentMutation } = useAddComment(feedId);

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    addCommentMutation.mutate(
      {
        contents: commentText,
        parentId: null,
      },
      {
        onSuccess: () => {
          setCommentText("");
        },
      }
    );
  };

  return (
    <div className={styles["feed__detail__contents"]}>
      <h1 className={styles["feed__detail__contents__title"]}>
        {contentData.data.title}
      </h1>
      <div className={styles["feed__detail__contents__info"]}>
        <div className={styles["feed__detail__contents__info__author"]}>
          <span>작성자</span>
          <span>{contentData.data.feedMemberResponseDto.nickname}</span>
          <span>{contentData.data.createdAt.split("T")[0]}</span>
        </div>
        <div className={styles["feed__detail__contents__info__icons"]}>
          <SmallIcon
            iconSrc="/icons/seeSight.svg"
            number={contentData.data.viewCount}
          />
          <SmallIcon
            iconSrc="/icons/like.svg"
            number={contentData.data.reactionCount}
          />
          <SmallIcon
            iconSrc="/icons/bookmark.svg"
            number={contentData.data.bookmarkCount}
          />
          <SmallIcon
            iconSrc="/icons/comment.svg"
            number={contentData.data.commentCount}
          />
        </div>
      </div>
      <div className={styles["feed__detail__contents__box"]}>
        <p>{contentData.data.contents}</p>
      </div>
      {contentData.data.s3ObjectResponseDtoList && (
        <div className={styles["feed__detail__contents__image"]}>
          {contentData.data.s3ObjectResponseDtoList
            .slice(0, 4)
            .map((s3: any) => (
              <div
                key={s3.url}
                className={styles["feed__detail__contents__image__box"]}
              >
                <img src={s3.fullUrl} alt="s3" />
              </div>
            ))}
        </div>
      )}
      <div className={styles["feed__detail__contents__react"]}>
        <button onClick={clickReact}>
          <img src={"/icons/react.png"} alt="react" />
        </button>
        <button onClick={clickBookMark}>
          <img src={"/icons/bookmark_btn.png"} alt="bookmark" />
        </button>
      </div>
      <div className={styles["feed__detail__contents__comment"]}>
        <h1>댓글({contentData.data.commentCount})</h1>
        <div className={styles["feed__detail__contents__comment__input"]}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className={styles["feed__detail__contents__comment__textarea"]}
          />
          <button
            onClick={handleSubmitComment}
            disabled={!commentText.trim() || addCommentMutation.isPending}
            className={styles["feed__detail__contents__comment__submit"]}
          >
            {addCommentMutation.isPending ? "등록중..." : "등록"}
          </button>
        </div>
        <div className={styles["feed__detail__contents__comment__wrapper"]}>
          {commentData.content.map((com: CommentStore3) => (
            <CommentBox key={com.commentId} comment={com} />
          ))}
        </div>
      </div>

      {profilePending &&
        ReactDOM.createPortal(
          <ProfileModal nick={profileNick} img={profileImg} />,
          document.getElementById("root")!
        )}
      {modalPending &&
        ReactDOM.createPortal(
          <TextModal
            text={modalText}
            usingConfirm
            onConfirm={() => {
              setModalPending(false);
            }}
          />,
          document.getElementById("root")!
        )}
    </div>
  );
};

export default CommunityDetailContents;
