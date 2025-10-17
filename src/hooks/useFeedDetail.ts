import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface FeedDetail {
  code: number;
  data: FeedDetail2;
}

interface FeedDetail2 {
  bookmarkCount: number;
  commentCount: number;
  contents: string;
  createdAt: string;
  feedId: number;
  feedMemberResponseDto: {
    memberId: number;
    nickname: string;
  };
  isAuthor: boolean;
  isBookmarked: boolean;
  isReacted: boolean;
  reactionCount: number;
  s3ObjectResponseDtoList: {
    fullUrl: string;
    url: string;
  }[];
  title: string;
  viewCount: number;
}

export const useFeedDetail = (feedId: string) => {
  const [feedDetail, setFeedDetail] = useState<FeedDetail | null>(null);

  const feedDetailMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(`/api/community/feeds/${feedId}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setFeedDetail(data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const feedDetailMutate = () => {
    feedDetailMutation.mutate();
  };

  return {
    feedDetailMutate,
    feedDetailPending: feedDetailMutation.isPending,
    feedDetail,
  };
};
