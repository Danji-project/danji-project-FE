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

  const commentMutation = useMutation({
    mutationFn: async ({feedid, contents, parentId}:{feedid:string|null; contents:string; parentId:string|null;}) => {
      try {
        console.log('add comment');

        const url = `/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedid}/comments`;
        const method = 'post';

        console.log('add comment');
        const response = await axios({
          url,
          method,
          data: {
            contents: contents,
            parentId: parentId ? parentId : '',
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          throw new Error(status?.toString());
        }
        throw new Error("오류남 왤까");
      }
    },
    onSuccess: (data) => {
      if (data) {
      }
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });


  const setFeedCommentMutation = ({feedid, contents, parentId}:{feedid:string|null; contents:string; parentId:string|null;}) => {
    commentMutation.mutate({feedid, contents, parentId});
  }

  const changeCommentMutation = useMutation({
    mutationFn: async ({feedid, contents, commentId}:{feedid:string|null; contents:string; commentId:string|null;}) => {
      try {
        const url = `/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedid}/comments/${commentId}`;
        const method = 'put';

        const response = await axios({
          url,
          method,
          data: {
            contents: contents,
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          throw new Error(status?.toString());
        }
        throw new Error("오류남 왤까");
      }
    },
    onSuccess: (data) => {
      if (data) {
      }
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  const resetFeedCommentMutation = ({feedid, contents, commentId}:{feedid:string|null; contents:string; commentId:string|null;}) => {
    changeCommentMutation.mutate({feedid, contents, commentId});
  }

  const DeleteFeedCommentMutation = useMutation({
    mutationFn: async ({feedid, commentId}:{feedid:string; commentId:string;}) => {
      try {
        const url = `/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedid}/comments/${commentId}`;

        const response = await axios.delete(url);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          throw new Error(status?.toString());
        }
        throw new Error("오류남 왤까");
      }
    },
    onSuccess: (data) => {
      if (data) {
      }
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  const deleteFeedCommentMutation=({feedid, commentId}:{feedid:string, commentId:string}) => {
    DeleteFeedCommentMutation.mutate({feedid, commentId});
  }

  return {
    getFeedCommentInfoMutation,
    setFeedCommentMutation,
    resetFeedCommentMutation,
    deleteFeedCommentMutation,
    isCommunityPending: mutation.isPending || commentMutation.isPending || changeCommentMutation.isPending || DeleteFeedCommentMutation.isPending,
  };
};
