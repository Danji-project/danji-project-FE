import { useEffect, useState } from "react";
import ButtonList from "../../components/common/combobox/ButtonList";
import SmallIcon from "../../components/common/small-icon/SmallIcon";
import { type FeedDetail } from "../../stores/useFeedDetailStore";
import styles from "./CommunityDetailContents.module.scss";
import { useNavigate } from "react-router-dom";
import { useFeedRegisterStore } from "../../stores/useFeedRegisterStore";
import { urlToFile } from "../../utils/urlToFile";
import { usePendingStore } from "../../stores/usePendingStore";
import TextModal from "../../components/common/text-modal/TextModal";
import { useModalTextStore } from "../../stores/useModalText";
import { useFeedRegister } from "../../hooks/useFeedRegister";
import axios from "axios";
import { useFeedDetail } from "../../hooks/useFeedDetail";
import CommentInput from "./CommentInput";
import CommentWrapper from "./CommentWrapper";
import { useComment } from "../../hooks/useComment";
import { useCommentStore } from "../../stores/useCommentStore";

const CommunityDetailContents = ({
  feedDetailData,
  id,
  feedId,
}: {
  feedDetailData: FeedDetail;
  id: string;
  feedId: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [page] = useState(0);
  const { postFeedDelete } = useFeedRegister(Number(id));
  const { fetchFeedDetail } = useFeedDetail(Number(feedId));
  const { getComment, writeComment } = useComment(Number(feedId), page);
  const { data: commentData } = useCommentStore();
  const { setMode, setTitle, setContent, setFile, setFeedId } =
    useFeedRegisterStore();
  const { modalPending, setModalPending } = usePendingStore();
  const { modalText, setModalText, setModalTitle } = useModalTextStore();
  const [btn, setBtn] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getComment.mutate({ page: 0 });
  }, [feedId]);

  useEffect(() => {
    if (btn === "수정") {
      setMode("EDIT");
      setTitle(feedDetailData?.title);
      setContent(feedDetailData?.contents);
      setFeedId(Number(feedId));
      const loadFiles = async () => {
        if (feedDetailData?.s3ObjectResponseDtoList) {
          const files = await Promise.all(
            feedDetailData.s3ObjectResponseDtoList.map((item, index) =>
              urlToFile(item.fullUrl, `image-${index}`),
            ),
          );
          setFile(files);
        }
      };
      loadFiles();
      navigate(`/apart-info/${id}/write`);
    }
    if (btn === "삭제") {
      setModalPending(true);
      setModalTitle("경고");
      setModalText("정말 삭제하시겠습니까?");
    }
  }, [btn, id]);

  const onReact = async () => {
    if (feedDetailData.isAuthor) {
      setModalPending(true);
      setModalTitle("오류");
      setModalText("자신은 자신의 게시물에 좋아요를 누를 수 없어요");
      return;
    }

    try {
      if (feedDetailData.isReacted) {
        await axios.delete(`/api/community/${feedId}/reactions`);
      } else {
        await axios.post(`/api/community/${feedId}/reactions`);
      }
      fetchFeedDetail();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {modalPending &&
        (isConfirmed ? (
          <TextModal
            text={modalText}
            onConfirm={() => {
              setModalPending(false);
              navigate(`/apart-info/${id}`);
              setIsConfirmed(false);
            }}
            usingConfirm
          />
        ) : (
          <TextModal
            text={modalText}
            actionText={"확인"}
            onCancel={() => {
              setModalPending(false);
              setBtn(null);
            }}
            onSend={() => {
              postFeedDelete.mutate({ feedId: Number(feedId) });
              setIsConfirmed(true);
            }}
            usingConfirm={
              modalText === "자신은 자신의 게시물에 좋아요를 누를 수 없어요"
            }
          />
        ))}
      <div className={styles["community__detail__contents"]}>
        <h2>{feedDetailData?.title}</h2>
        {feedDetailData.isAuthor && (
          <div className={styles["community__detail__contents__dot"]}>
            <button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <img src={"/icons/dot_button.svg"} alt="dot-button" />
            </button>
            {isOpen && (
              <ButtonList
                list={["수정", "삭제"]}
                setIsOpen={setIsOpen}
                setState={setBtn}
              />
            )}
          </div>
        )}
        <div className={styles["community__detail__contents__info"]}>
          <div className={styles["community__detail__contents__author"]}>
            <span>작성자</span>
            <span>{feedDetailData?.feedMemberResponseDto.nickname}</span>
            <span>{feedDetailData?.createdAt.split("T")[0]}</span>
          </div>
          <div className={styles["community__detail__contents__icon"]}>
            <SmallIcon
              iconSrc={"/icons/seeSight.svg"}
              number={feedDetailData?.viewCount ? feedDetailData.viewCount : 0}
            />
            <SmallIcon
              iconSrc={"/icons/like.svg"}
              number={feedDetailData?.reactionCount}
            />
            <SmallIcon
              iconSrc={"/icons/bookmark.svg"}
              number={feedDetailData?.bookmarkCount}
            />
            <SmallIcon
              iconSrc={"/icons/comment.svg"}
              number={
                feedDetailData?.commentCount ? feedDetailData.commentCount : 0
              }
            />
          </div>
        </div>
        <div className={styles["community__detail__contents__content"]}>
          {feedDetailData?.contents}
        </div>
        <div className={styles["community__detail__contents__r__and__b"]}>
          <button onClick={onReact}>
            {feedDetailData?.isReacted ? (
              <img src="/icons/react_on.svg" alt="react-on" />
            ) : (
              <img src="/icons/react.png" alt="react-off" />
            )}
          </button>
          <button>
            <img src="/icons/bookmarks.png" alt="bookmark" />
          </button>
        </div>
      </div>
      <CommentInput onWrite={writeComment} />
      <CommentWrapper commentData={commentData} />
    </>
  );
};

export default CommunityDetailContents;
