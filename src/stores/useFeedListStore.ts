import { create } from "zustand";

interface FeedData {
  code: number;
  data: FeedList2;
  setFetch: (fetchData: FeedList) => void;
}

interface FeedList {
  code: number;
  data: FeedList2;
}

interface FeedList2 {
  feedDtoList: FeedList3[];
  cursorDate: string;
  listSize: number;
}

export interface FeedList3 {
  feedId: number;
  memberId: number;
  nickName: string;
  title: string;
  contents: string;
  localDateTime: string;
  viewCount: number;
  commentCount: number;
  bookmarkCount: number;
  thumbnailFileUrl: string | null;
  isReacted: boolean;
  reactionCount: number;
}

export const useFeedListStore = create<FeedData>((set) => ({
  code: 0,
  data: {
    feedDtoList: [],
    cursorDate: new Date().toISOString(),
    listSize: 0,
  },

  setFetch: (fetchData: FeedList) =>
    set({ code: fetchData.code, data: fetchData.data }),
}));
