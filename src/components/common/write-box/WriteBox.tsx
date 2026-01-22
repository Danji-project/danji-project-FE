import { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./WriteBox.module.scss";
import { useComment } from "../../../hooks/useComment";
import { useParams } from "react-router-dom";
import { useCommentStore } from "../../../stores/useCommentStore";

const WriteBox = ({
  parentId,
  setWrited,
  isEdit = false,
  commentId,
  defaultValue = "",
  setButtonState,
}: {
  parentId: number | null;
  setWrited: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  commentId?: number;
  defaultValue?: string;
  setButtonState?: Dispatch<SetStateAction<string>>;
}) => {
  const [subComment, setSubComment] = useState<string>(defaultValue);
  const { feedId } = useParams<{ id: string; feedId: string }>();
  const { writeComment, updateComment } = useComment(Number(feedId), 0);
  const { setButtonMode, setEditingCommentId } = useCommentStore();

  const handleSubmit = () => {
    if (isEdit && commentId) {
      updateComment.mutate({
        contents: subComment,
        commentId: commentId,
      });
      setButtonMode("");
      setEditingCommentId(null);
      setButtonState?.("");
    } else {
      writeComment.mutate({
        contents: subComment,
        parentId: String(parentId),
      });
      setWrited(false);
    }
    setSubComment("");
  };

  const handleCancel = () => {
    setButtonMode("");
    setEditingCommentId(null);
    setButtonState?.("");
    setSubComment("");
  };

  return (
    <div className={styles["write__box"]}>
      <input
        type="text"
        placeholder={isEdit ? "댓글을 수정하세요." : "댓글을 작성하세요."}
        value={subComment}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSubComment(e.target.value)
        }
      />
      {isEdit && (
        <button onClick={handleCancel}>
          취소
        </button>
      )}
      <button onClick={handleSubmit}>
        <img src={"/submit.svg"} alt="write" />
      </button>
    </div>
  );
};

export default WriteBox;
