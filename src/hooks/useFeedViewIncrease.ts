import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useFeedViewIncrease = (feedId: number) => {
  const feedViewIncrease = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/api/community/feeds/${feedId}/view`);
      return response.data;
    },
  });

  const feedViewIncreaseMutate = () => {
    feedViewIncrease.mutate();
  };

  return {
    feedViewIncreaseMutate,
    feedViewIncreasePending: feedViewIncrease.isPending,
  };
};
