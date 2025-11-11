import { create } from "zustand";

interface ChatDetailReal extends ChatDetail {
  setDatas: (data: any) => void;
}

interface ChatDetail {
  code: number;
  chatDatas: ChatDetail2;
}

interface ChatDetail2 {
  chatroomName: string;
  memberCount: number;
  chatMessageResponses: Response[];
}

export interface Response {
  id: string;
  chatroomId: number;
  sender: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
  message: string;
  imageUrl: string;
  createdAt: string;
}

export const useChatDetailStore = create<ChatDetailReal>((set) => ({
  code: 500,
  chatDatas: {
    chatroomName: "",
    chatMessageResponses: [],
    memberCount: 0,
  },
  setDatas: (data) =>
    set({
      code: 200,
      chatDatas: data.data,
    }),
}));
