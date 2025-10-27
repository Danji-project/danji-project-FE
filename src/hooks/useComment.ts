import { useMutation } from "@tanstack/react-query";
import { useCommentStore } from "../stores/useCommentStore";
import axios from "axios";
import { useEffect } from "react";

export const useComment = (feedId: number) => {
  const { setFetch } = useCommentStore();

  const getCommentMutate = useMutation({
    mutationFn: async () => {
      if (!feedId) return;
      const response = await axios.get(
        `/api/community/feeds/${feedId}/comments?page=0&size=10`
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        setFetch(data);
      }
    },
  });

  const getCommentMutation = () => {
    if (feedId) getCommentMutate.mutate();
  };

  useEffect(() => {
    getCommentMutation();
  }, [feedId]);

  return {
    getCommentMutation,
    commentSelectPending: getCommentMutate.isPending,
  };
};

export const useUpdateComment = (feedId: number, commentId: number) => {
  const { getCommentMutation } = useComment(feedId);

  const updateMutate = useMutation({
    mutationFn: async (contents: string) => {
      const res = await axios.put(
        `/api/community/feeds/${feedId}/comments/${commentId}`,
        { contents }
      );
      return res.data;
    },
    onSuccess: () => {
      getCommentMutation();
    },
  });

  return { updateMutate };
};

export const useAddComment = (feedId: number) => {
  const { getCommentMutation } = useComment(feedId);

  const addCommentMutation = useMutation({
    mutationFn: async (payload: {
      contents: string;
      parentId?: number | null;
    }) => {
      const res = await axios.post(
        `/api/community/feeds/${feedId}/comments`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      getCommentMutation();
    },
  });

  return { addCommentMutation };
};

export const useDeleteComment = (feedId: number, commentId: number) => {
  const { getCommentMutation } = useComment(feedId);

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `/api/community/feeds/${feedId}/comments/${commentId}`
      );
      return res.data;
    },
    onSuccess: () => {
      getCommentMutation();
    },
  });

  return { deleteCommentMutation };
};
