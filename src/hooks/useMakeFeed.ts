import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import type { FeedDetailPost } from "../model/BaseFeedDetailModel";

interface SearchResponse {
  code: string;
  data: {
    contents: string;
    feedType: string;
    fileUrl: string;
    id: string;
    title: string
  }
}

export const useMakeFeedMutation = ({appartID, feedData, images, deleteImage, feedid}:{
  appartID : string | null;
  feedData: FeedDetailPost | undefined;
  images : File[];
  deleteImage : string[];
  feedid:string|null;
}) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (feedid:string|null) => {
      try {
        console.log('test useMutation SearchResponse');
        const formData = new FormData();

        const requestDto = {
          title : feedData?.title,
          contents: feedData?.contents,
          feedType : 'FEED',
          apartmentId : appartID,
        };

        formData.append(
          'requestDto',
          new Blob([JSON.stringify(requestDto)], { type: 'application/json' })
        );

        if(images)
          images.forEach((file) => {
            if (file instanceof File) {
              formData.append('multipartFileList', file);
            }
          });

        if(deleteImage)
        {
          const files = JSON.stringify(deleteImage);
          formData.append('deleteFileUrls', files);
        }

        const url = feedid ?`/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}/${feedid}` : `/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}`;
        const method = feedid ? 'put' : 'post';

        const response = await axios({
          url,
          method,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
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
        localStorage.setItem("selectFeedID", feedid ? feedid : data.data.id);
        localStorage.setItem("selectMenu", 'community');
        localStorage.removeItem("changeFeed");
        navigate('/community/feed', { replace: true });
      }
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  const useMakeFeed: Function = () => {
    if (!feedData?.title.trim() || !feedData?.contents.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    console.log("make feed " + feedid);
    mutation.mutate(feedid);
  };

  return {
    useMakeFeed,
    isPending: mutation.isPending,
  };
};
