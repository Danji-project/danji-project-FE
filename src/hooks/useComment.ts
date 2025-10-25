import { useMutation } from "@tanstack/react-query";
import { useCommentStore } from "../stores/useCommentStore";
import axios from "axios";
import { useEffect } from "react";

export const useComment = (feedId: number, commentId: number | null) => {
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

  const updateCommentMutation = useMutation({
    mutationFn: async (contents: string) => {
      const res = await axios.put(
        `/api/community/feeds/${feedId}/comments/${commentId}`,
        {
          contents,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      getCommentMutation();
    },
    onError: (e) => {
      console.error(e);
    },
  });

  useEffect(() => {
    getCommentMutation();
  }, [feedId]);

  return {
    getCommentMutation,
    addCommentMutation,
    updateCommentMutation,
    commentSelectPending: getCommentMutate.isPending,
  };
};
