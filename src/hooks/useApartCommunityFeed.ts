import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { FeedDetailPost } from "../model/BaseFeedDetailModel";

interface ApartPostSummaryResponse {
  code: string;
  data:FeedDetailPost;
}

export const useGetApartCommunityFeed = ({
  feedID,
  setPost
}: {
  feedID: string | null;
  setPost: React.Dispatch<React.SetStateAction<FeedDetailPost | undefined>>;
}) => {
  const mutation = useMutation<ApartPostSummaryResponse, Error>({
    mutationFn: async () => {
      try {
        if(feedID)
        {
          const response = await axios.get(`/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedID}`);
          return response.data;
        }
        else
          throw new Error("Appartment ID Error");
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      try{
        if (data?.data) {
          setPost(data?.data);
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

  const getApartCommunityFeedMutation = () => {
    mutation.mutate();
  };

  return {
    getApartCommunityFeedMutation,
    isPending: mutation.isPending,
  };
};
