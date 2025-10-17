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
        console.log(data);
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
