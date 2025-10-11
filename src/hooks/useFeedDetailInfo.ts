import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { FeedDetailPost } from "../model/BaseFeedDetailModel";

interface ApartPostSummaryResponse {
  code: string;
  data: FeedDetailPost
}

export const useGetFeedDetailInfo = ({
  feedId,
  setDetailFeed
}: {
  feedId: string;
  setDetailFeed: React.Dispatch<React.SetStateAction<FeedDetailPost>>;
}) => {
  const mutation = useMutation<ApartPostSummaryResponse, Error>({
    mutationFn: async () => {
      try {
        if(feedId)
        {
          const response = await axios.get(`/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedId}`);
          return response.data;
        }
        else
          throw new Error("feed ID Error");
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      try{
        if (data?.data) {
          setDetailFeed(data?.data);
        }
      }catch(err)
      {
        throw err;
      }
    },
    onError: (err: Error) => {
        console.log(err);
    },
  });

  const useGetFeedDetailInfoMutation = () => {
    mutation.mutate();
  };

  return {
    useGetFeedDetailInfoMutation,
    isPending: mutation.isPending,
  };
};
