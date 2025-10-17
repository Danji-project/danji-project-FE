import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFeedListStore } from "../stores/useFeedListStore";

export const useFeedList = (apartmentId: number, sort: string) => {
  const { setFetch } = useFeedListStore();

  const feedListMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `/api/community/feeds?apartmentId=${apartmentId}&sort=${sort}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      setFetch(data);

      console.log(data);
    },
  });

  const feedListMutate = () => {
    feedListMutation.mutate();
  };

  return {
    feedListMutate,
    feedListPending: feedListMutation.isPending,
  };
};
