import { useState } from "react";
import CommentBox from "../../components/common/comment-box/CommentBox";
import TextModal from "../../components/common/text-modal/TextModal";
import {
  useCommentStore,
  type CommentItem,
} from "../../stores/useCommentStore";
import { useModalTextStore } from "../../stores/useModalText";
import { usePendingStore } from "../../stores/usePendingStore";
import styles from "./CommentWrapper.module.scss";
import { useComment } from "../../hooks/useComment";
import { useParams } from "react-router";
import { useChat } from "../../hooks/useChat";

const CommentWrapper = ({
  commentData,
}: {
  commentData: { content: CommentItem[]; page: number; size: number };
}) => {
  const { feedId } = useParams<{ id: string; feedId: string }>();
  const { modalPending, setModalPending } = usePendingStore();
  const { setProfileImage, setProfileNickname, receiverId, setReceiverId } =
    useModalTextStore();
  const [isConverSend, setIsConverSend] = useState<boolean>(false);
  const { buttonMode, deletingCommentId, setDeletingCommentId, setButtonMode } =
    useCommentStore();
  const { deleteComment } = useComment(Number(feedId), 0);
  const { sendChatPurpose } = useChat();
  const [textAreaContent, setTextAreaContent] = useState<string>("");

  const getTotalCommentCount = (comments: CommentItem[]): number => {
    return comments.reduce((total, comment) => {
      return total + 1 + getTotalCommentCount(comment.childrenCommentDto);
    }, 0);
  };

  const handleDeleteConfirm = () => {
    if (deletingCommentId !== null) {
      deleteComment.mutate({ commentId: deletingCommentId });
    }
    setDeletingCommentId(null);
    setModalPending(false);
  };

  const handleDeleteCancel = () => {
    setDeletingCommentId(null);
    setModalPending(false);
  };

  return (
    <>
      {deletingCommentId !== null && (
        <TextModal
          text="정말 삭제하시겠습니까?"
          onCancel={handleDeleteCancel}
          onSend={handleDeleteConfirm}
          actionText="삭제"
        />
      )}
      {modalPending && buttonMode === "DELETE_SUCCESS" && (
        <TextModal
          text="삭제가 완료되었습니다."
          usingConfirm
          onConfirm={() => {
            setModalPending(false);
            setButtonMode("");
          }}
        />
      )}
      {modalPending && buttonMode === "EDIT_SUCCESS" && (
        <TextModal
          text="수정이 완료되었습니다."
          usingConfirm
          onConfirm={() => {
            setModalPending(false);
            setButtonMode("");
          }}
        />
      )}
      {modalPending &&
        buttonMode === "" &&
        deletingCommentId === null &&
        (isConverSend ? (
          <TextModal
            isConver
            actionText={"요청"}
            onCancel={() => {
              setModalPending(false);
              setProfileImage("");
              setProfileNickname("");
              setReceiverId(null);
              setIsConverSend(false);
            }}
            textareaContent={textAreaContent}
            textareaChange={(e) => setTextAreaContent(e.target.value)}
            onSend={() => {
              sendChatPurpose.mutate({
                message: textAreaContent,
                receiverId: receiverId!,
              });
            }}
          />
        ) : (
          <TextModal
            isProfile
            actionText={"대화신청"}
            onCancel={() => {
              setModalPending(false);
              setProfileImage("");
              setProfileNickname("");
              setReceiverId(null);
            }}
            onSend={() => {
              setIsConverSend(true);
            }}
          />
        ))}
      <div className={styles["comment__wrapper"]}>
        <h2>댓글({getTotalCommentCount(commentData.content)})</h2>
        {commentData.content.map((content: CommentItem) => (
          <CommentBox content={content} key={content.commentId} />
        ))}
        {commentData.content.length === 0 && (
          <span style={{ opacity: ".45" }}>댓글이 없습니다.</span>
        )}
      </div>
    </>
  );
};

export default CommentWrapper;
