import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { CommentBase } from "../model/BaseCommentModel"

interface FeedsCommentResponse {
    code: number;
    data: {
        content: CommentBase[],
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
    }
}


export const useGetFeedCommentInfo = ({
  feedId,
  setFeedComment,
  setTotalElements
}: {
  feedId: string | null;
  setFeedComment: React.Dispatch<React.SetStateAction<CommentBase[] | undefined>>;
  setTotalElements: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const mutation = useMutation<FeedsCommentResponse, Error>({
    mutationFn: async () => {
      try {
        if(feedId)
        {
          const response = await axios.get(`/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedId}/comments?page=0&size=10`);
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
          setFeedComment(data?.data?.content);
          setTotalElements(data?.data?.totalElements);
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

  const getFeedCommentInfoMutation = () => {
    mutation.mutate();
  };

  return {
    getFeedCommentInfoMutation,
    isCommunityPending: mutation.isPending,
  };
};
