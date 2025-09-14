import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import type { FeedDetailPost } from "../model/BaseFeedDetailModel";

interface SearchResponse {
  code: string;
  data: FeedDetailPost;
}

export const useMakeFeedMutation = ({appartID, feedData}:{
  appartID : string | null;
  feedData: FeedDetailPost | undefined;
}) => {
  const mutation = useMutation<SearchResponse, Error>({
    mutationFn: async () => {
      try {
        const requestData = { title: feedData?.title, contents: feedData?.contents , feedType: "FEED", apartmentId : appartID};
        // const requestData = `requestDto = { title: ${feedData?.title}, contents: ${feedData?.contents} , feedType: "FEED", apartmentId : ${appartID}}`;
        
        const response = await axios.post(
        `/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}`,
          requestData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          throw new Error(status?.toString());
        }
      }
    },
    onSuccess: (data) => {
      if (data) {
      }
      console.log(data?.data);
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  const useMakeFeed: Function = () => {
    mutation.mutate();
  };

  return {
    useMakeFeed,
    isPending: mutation.isPending,
  };
};
