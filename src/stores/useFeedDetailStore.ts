import { create } from "zustand";

interface RealFeedDetailStore extends FeedDetailStore {
  setFeedDetailData: (data: FeedDetailStore) => void;
}

export interface FeedDetailStore {
  code: number;
  data: FeedDetail;
}

export interface FeedDetail {
  feedId: number;
  title: string;
  contents: string;
  createdAt: string;
  feedMemberResponseDto: {
    memberId: number;
    nickname: string;
  };
  s3ObjectResponseDtoList: S3ObjectResponseDtoList[];
  viewCount: number | null;
  reactionCount: number;
  commentCount: number | null;
  bookmarkCount: number;
  isReacted: boolean;
  isBookmarked: boolean;
  isAuthor: boolean;
}

interface S3ObjectResponseDtoList {
  fullUrl: string;
  url: string;
}

export const useFeedDetailStore = create<RealFeedDetailStore>((set) => ({
  code: 200,
  data: {} as FeedDetail,
  setFeedDetailData: (data: FeedDetailStore) =>
    set({
      data: data.data,
    }),
}));
