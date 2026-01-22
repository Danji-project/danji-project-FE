import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  type FeedDetailStore,
  useFeedDetailStore,
} from "../stores/useFeedDetailStore";
import axios from "axios";

export const useFeedDetail = (feedId: number) => {
  const { setFeedDetailData } = useFeedDetailStore();

  const getFeedDetail = useMutation<FeedDetailStore, Error>({
    mutationFn: async () => {
      const response = await axios.get(`/api/community/feeds/${feedId}`);
      return response.data;
    },
    onSuccess: (data: FeedDetailStore) => {
      console.log(data);
      setFeedDetailData(data);
    },
  });

  const viewUpMutation = useMutation<void, Error>({
    mutationFn: async () => {
      await axios.post(`/api/community/feeds/${feedId}/view`);
    },
    onSuccess: () => {
      getFeedDetail.mutate();
    },
  });

  const fetchFeedDetail = useCallback(() => {
    getFeedDetail.mutate();
  }, [feedId]);

  const fetchViewUp = useCallback(() => {
    viewUpMutation.mutate();
  }, [feedId]);

  return {
    getFeedDetail,
    fetchFeedDetail,
    feedDetailPending: getFeedDetail.isPending,
    viewUpMutation,
    fetchViewUp,
    viewUpPending: viewUpMutation.isPending,
  };
};
