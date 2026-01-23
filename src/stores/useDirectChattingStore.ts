import { create } from "zustand";

export interface RealDirectChattingStore extends DirectChattingStore {
  setDirectChatting: (data: DirectChattingStore) => void;
}

export interface DirectChattingStore {
  code: number;
  data: DirectChatting[];
}

export interface DirectChatting {
  chatroomId: number;
  memberCount: number;
  memberInformation: {
    id: number;
    nickname: string;
    profileUrl: string | null;
  };
  chatMessage: string;
  messageCreatedAt: string;
}

export const useDirectChattingStore = create<RealDirectChattingStore>(
  (set) => ({
    code: 200,
    data: [],
    setDirectChatting: (data: DirectChattingStore) =>
      set({
        data: data.data,
      }),
  }),
);
