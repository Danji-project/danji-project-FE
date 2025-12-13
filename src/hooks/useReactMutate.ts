import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useReactMutate = () => {

  const feedReactMutation = useMutation({
    mutationFn: async (feedId: number) => {
      const response = await axios.post(
        `/api/community/${feedId}/reactions`
      );
      return response.data;
    },
    onSuccess: () => {
        console.log('feed react sussess');
    },
    onError: (data) => {
        console.log(data);
    },
  });

  const FeedReactMutate = (feedId: number) => {
    feedReactMutation.mutate(feedId);
  };

  const feedReactDeleteMutation = useMutation({
    mutationFn: async (feedId: number) => {
      const response = await axios.delete(
        `/api/community/${feedId}/reactions`
      );
      return response.data;
    },
    onSuccess: () => {
        console.log('feed delete react sussess');
    },
    onError: (data) => {
        console.log(data);
    },
  });

  const FeedReactDeleteMutate = (feedId: number) => {
    feedReactDeleteMutation.mutate(feedId);
  };

  return {
    FeedReactMutate,
    FeedReactDeleteMutate
  };
};
