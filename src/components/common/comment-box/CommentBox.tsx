import { useEffect, useState } from "react";
import {
  useCommentStore,
  type CommentItem,
} from "../../../stores/useCommentStore";
import { useModalTextStore } from "../../../stores/useModalText";
import { usePendingStore } from "../../../stores/usePendingStore";
import { timeAgo } from "../../../utils/timeAgo";
import styles from "./CommentBox.module.scss";
import WriteBox from "../write-box/WriteBox";
import { TfiAlignJustify } from "react-icons/tfi";
import ButtonList from "../combobox/ButtonList";
import { useParams } from "react-router";
import { useComment } from "../../../hooks/useComment";

const CommentBox = ({
  content,
  isParent = true,
  depth = 0,
}: {
  content: CommentItem;
  isParent?: boolean;
  depth?: number;
}) => {
  const { setModalPending } = usePendingStore();
  const { setProfileImage, setProfileNickname, setReceiverId } =
    useModalTextStore();
  const {
    setButtonMode,
    buttonMode,
    editingCommentId,
    setEditingCommentId,
    setDeletingCommentId,
  } = useCommentStore();
  const [writed, setWrited] = useState<boolean>(false);
  const [isButtonOpen, setIsButtonOpen] = useState<boolean>(false);
  const [buttonState, setButtonState] = useState<string>("");

  const isEditing =
    buttonMode === "EDIT" && editingCommentId === content.commentId;

  useEffect(() => {
    if (buttonState === "수정" && editingCommentId === null) {
      setButtonMode("EDIT");
      setEditingCommentId(content.commentId);
    } else if (buttonState === "수정" && editingCommentId !== null) {
      setButtonState("");
    } else if (buttonState === "삭제") {
      setModalPending(true);
      setDeletingCommentId(content.commentId);
      setButtonMode("");
    }
  }, [buttonState]);

  return (
    <div className={styles["comment__box"]}>
      {content.isAuthor && (
        <div className={styles["comment__button"]}>
          <button onClick={() => setIsButtonOpen(true)}>
            <TfiAlignJustify />
          </button>
          {isButtonOpen && (
            <ButtonList
              list={["수정", "삭제"]}
              setIsOpen={setIsButtonOpen}
              setState={setButtonState}
            />
          )}
        </div>
      )}
      <div className={styles["comment__box__profile"]}>
        <button
          className={styles["comment__box__profile__wrapper"]}
          onClick={() => {
            if (content.isAuthor) {
              return;
            }
            setModalPending(true);
            setProfileImage(
              content.commentMemberResponseDto.fileId
                ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                    content.commentMemberResponseDto.fileId
                : "/profile_imgSrc.jpg",
            );
            setProfileNickname(content.commentMemberResponseDto.nickname);
            setReceiverId(content.commentMemberResponseDto.memberId);
          }}
        >
          <img
            src={
              content.commentMemberResponseDto.fileId
                ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                  content.commentMemberResponseDto.fileId
                : "/profile_imgSrc.jpg"
            }
            alt="comment-profile"
          />
        </button>
        <div className={styles["comment__box__profile__info"]}>
          <span>{content.commentMemberResponseDto.nickname}</span>
          <span>{timeAgo(content.createdAt)}</span>
        </div>
      </div>
      {isEditing ? (
        <WriteBox
          parentId={null}
          setWrited={setWrited}
          isEdit={true}
          commentId={content.commentId}
          defaultValue={content.contents}
          setButtonState={setButtonState}
        />
      ) : (
        <div className={styles["comment__box__content"]}>
          {content.contents}
        </div>
      )}
      <button onClick={() => setWrited((prev) => !prev)}>댓글 쓰기</button>
      {writed && (
        <WriteBox parentId={content.commentId} setWrited={setWrited} />
      )}
      {content.childrenCommentDto.length > 0 && (
        <div className={styles["children__comment__wrapper"]}>
          {content.childrenCommentDto.map((commentDto: CommentItem) => (
            <div
              className={styles["children__comment__inner"]}
              key={commentDto.commentId}
              style={{ paddingLeft: `${depth! * 5}px` }}
            >
              <img src={"/icons/cm_child.svg"} alt="comment-child" />
              <CommentBox
                key={commentDto.commentId}
                content={commentDto}
                isParent={content.childrenCommentDto.length > 0}
                depth={depth! + 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
