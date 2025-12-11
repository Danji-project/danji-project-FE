import { useQuery } from "@tanstack/react-query";
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
  const { data: feedDetail, isLoading: feedDetailPending } = useQuery({
    queryKey: ["feedDetail", feedId],
    queryFn: async () => {
      const response = await axios.get(`/api/community/feeds/${feedId}`);
      return response.data as FeedDetail;
    },
    enabled: !!feedId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  return {
    feedDetail,
    feedDetailPending,
  };
};
