import { create } from "zustand";

interface RealFeedList extends FeedList {
  setFeedData: (data: FeedList) => void;
}

export interface FeedList {
  code: number;
  data: {
    feedDtoList: FeedDTO[];
    cursorDate: string;
    listSize: number;
  };
}

export interface FeedDTO {
  feedId: number;
  memberId: number;
  nickName: string;
  title: string;
  contents: string;
  localDateTime: string;
  viewCount: number;
  reactionCount: number;
  commentCount: number;
  bookmarkCount: number;
  thumbnailFileUrl: string;
  isReacted: boolean;
}

export const useFeedListStore = create<RealFeedList>((set) => ({
  code: 200,
  data: {
    feedDtoList: [],
    cursorDate: "",
    listSize: 0,
  },
  setFeedData: (data: FeedList) => {
    set({
      data: data.data,
    });
  },
}));
