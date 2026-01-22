import { useMutation } from "@tanstack/react-query";
import { useCommentStore, type CommentStore } from "../stores/useCommentStore";
import axios from "axios";
import { usePendingStore } from "../stores/usePendingStore";
import { useModalTextStore } from "../stores/useModalText";

export const useComment = (feedId: number, page: number) => {
  const { setCommentData, setWritedCommentContent, setButtonMode } =
    useCommentStore();
  const { setModalPending } = usePendingStore();
  const { setModalTitle, setModalText } = useModalTextStore();

  const getComment = useMutation<CommentStore, Error, { page: number }>({
    mutationFn: async ({ page }: { page: number }) => {
      const response = await axios.get(
        `/api/community/feeds/${feedId}/comments?page=${page}&size=10`,
      );
      return response.data;
    },
    onSuccess: (data: CommentStore) => {
      setCommentData(data);
    },
  });

  const writeComment = useMutation<
    void,
    Error,
    { contents: string; parentId?: string }
  >({
    mutationFn: async ({
      contents,
      parentId,
    }: {
      contents: string;
      parentId?: string;
    }) => {
      if (parentId) {
        await axios.post(`/api/community/feeds/${feedId}/comments`, {
          contents,
          parentId,
        });
      } else {
        await axios.post(`/api/community/feeds/${feedId}/comments`, {
          contents,
        });
      }
    },
    onSuccess: () => {
      setWritedCommentContent("");
      getComment.mutate({ page });
    },
  });

  const updateComment = useMutation<
    void,
    Error,
    { contents: string; commentId: number }
  >({
    mutationFn: async ({
      contents,
      commentId,
    }: {
      contents: string;
      commentId: number;
    }) => {
      await axios.put(`/api/community/feeds/${feedId}/comments/${commentId}`, {
        contents,
      });
    },
    onSuccess: () => {
      setButtonMode("EDIT_SUCCESS");
      setModalPending(true);
      setModalTitle("알림");
      setModalText("수정이 완료되었습니다.");
      getComment.mutate({ page });
    },
  });

  const deleteComment = useMutation<void, Error, { commentId: number }>({
    mutationFn: async ({ commentId }: { commentId: number }) => {
      await axios.delete(
        `/api/community/feeds/${feedId}/comments/${commentId}`,
      );
    },
    onSuccess: () => {
      setButtonMode("DELETE_SUCCESS");
      setModalPending(true);
      setModalTitle("알림");
      setModalText("삭제가 완료되었습니다.");
      getComment.mutate({ page });
    },
  });

  return {
    getComment,
    writeComment,
    updateComment,
    deleteComment,
    writeCommentPending: writeComment.isPending,
    getCommentPending: getComment.isPending,
    updateCommentPending: updateComment.isPending,
    deleteCommentPending: deleteComment.isPending,
  };
};
