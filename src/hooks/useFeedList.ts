import { useMutation } from "@tanstack/react-query";
import { type FeedList, useFeedListStore } from "../stores/useFeedListStore";
import axios from "axios";

export const useGetFeedList = () => {
  const { setFeedData } = useFeedListStore();

  const getFeedList = useMutation<
    FeedList,
    Error,
    { apartmentId: number; sort: string }
  >({
    mutationFn: async ({
      apartmentId,
      sort,
    }: {
      apartmentId: number;
      sort: string;
    }) => {
      const response = await axios.get(
        `/api/community/feeds?apartmentId=${apartmentId}&sort=${sort}`,
      );
      return response.data;
    },
    onSuccess: (data: FeedList) => {
      setFeedData(data);
    },
  });

  return { getFeedList, getFeedListLoading: getFeedList.isPending };
};
