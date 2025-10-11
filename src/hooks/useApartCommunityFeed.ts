import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
  setPost: React.Dispatch<React.SetStateAction<FeedDetailPost>>;
}) => {
  const navigate = useNavigate();

  const mutation = useMutation<ApartPostSummaryResponse, Error>({
    mutationFn: async () => {
      try {
        if(feedID)
        {
          const response = await axios.get(`/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedID}`);
          return response.data;
        }
        else if(localStorage.getItem("changeFeed"))
        {
          let feedid = localStorage.getItem("changeFeed");
          const response = await axios.get(`/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedid}`);
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

  const deletemutation = useMutation<ApartPostSummaryResponse, Error>({
    mutationFn: async () => {
      try {
        if(feedID)
        {
          const response = await axios.delete(`/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedID}`);
          return response.data;
        }
        else
          throw new Error("feed ID Error");
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      navigate("/apart-Info", { replace: true });
    },
    onError: (err: Error) => {
      console.log('delete err');
      console.log(err);
    },
  });

  const useDeleteFeedDetailInfoMutation = () => {
    deletemutation.mutate();
  };

  return {
    getApartCommunityFeedMutation,
    useDeleteFeedDetailInfoMutation,
    isPending: mutation.isPending,
    isDeletePending: deletemutation.isPending,
  };
};
