import { create } from "zustand";

export interface RealGroupChattingStore extends GroupChattingStore {
  setGroupChatting: (data: GroupChattingStore) => void;
}

export interface GroupChattingStore {
  code: number;
  data: GroupChatting[];
}

export interface GroupChatting {
  chatroomId: number;
  chatMessage: string;
  messageCreatedAt: string;
  memberInformation: {
    id: number;
    nickname: string;
    profileUrl: string | null;
  };
}

export const useGroupChattingStore = create<RealGroupChattingStore>(
  (set) => ({
    code: 200,
    data: [],
    setGroupChatting: (data: GroupChattingStore) =>
      set({
        data: data.data,
      }),
  })
);
