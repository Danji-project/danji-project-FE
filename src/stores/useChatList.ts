import { create } from "zustand";

export interface ChatListReal extends ChatList {
  setData: (data: any) => void;
}

export interface ChatList {
  code: number;
  chatData: ChatList2[];
}

export interface ChatList2 {
  chatroomId: number;
  memberInformation: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
  chatMessage: string;
  messageCreatedAt: string;
}

export const useChatListStore = create<ChatListReal>((set) => ({
  code: 500,
  chatData: [],
  setData: (data) =>
    set({
      code: 200,
      chatData: data.data,
    }),
}));
