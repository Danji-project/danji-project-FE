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
          formData.append('deleteFileUrls', 
            new Blob([JSON.stringify(deleteImage)], { type: 'application/json' })
          );
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

  const calculateByteLength = (text: string): number => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(text);
    return encoded.length;
  };


  const useMakeFeed: Function = () => {
    if (!feedData?.title.trim() || !feedData?.contents.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const totalLength = calculateByteLength(feedData?.title) + calculateByteLength(feedData?.contents);

    if(totalLength > 1048576)
    {
      console.log("1MB 초과");
      alert("제목과 내용의 글자수가 약 100만 자를 넘을 수 없습니다.\n이모지를 포함할 경우, 업로드 가능한 글자수가 적어질 수 있습니다.");
      return;
    }

    console.log(feedid ? "make feed " + feedid : "make new feed");
    mutation.mutate(feedid);
  };

  return {
    useMakeFeed,
    isPending: mutation.isPending,
  };
};
