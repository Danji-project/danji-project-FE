import type { UseMutationResult } from "@tanstack/react-query";
import { useCommentStore } from "../../stores/useCommentStore";
import { usePositionStore } from "../../stores/usePositionStore";
import styles from "./CommentInput.module.scss";

const CommentInput = ({
  onWrite,
}: {
  onWrite: UseMutationResult<
    void,
    Error,
    { contents: string; parentId?: string }
  >;
}) => {
  const { positionXStart, positionYStart } = usePositionStore();
  const { writedCommentContent, setWritedCommentContent } = useCommentStore();

  const onCommentButton = () => {
    onWrite.mutate({ contents: writedCommentContent });
  };

  return (
    <div
      className={styles["comment__input"]}
      style={{ left: `${positionXStart}px`, bottom: `${positionYStart}px` }}
    >
      <input
        type="text"
        placeholder={"댓글을 작성해보세요!"}
        value={writedCommentContent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setWritedCommentContent(e.target.value);
        }}
      />
      <button onClick={onCommentButton}>
        <img src="/submit.svg" alt="submit" />
      </button>
    </div>
  );
};

export default CommentInput;
