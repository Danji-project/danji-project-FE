import { create } from "zustand";

interface RealChatRoomStore extends ChatRoomStore {
  setChatRoom: (data: ChatRoomStore) => void;
  clearChatRoom: () => void;
}

export interface ChatRoomStore {
  code: number;
  data: ChatRoomData | null;
}

export interface ChatRoomData {
  chatroomName: string;
  memberCount: number;
  chatMessageResponses: ChatMessage[];
  memberInformationList: MemberInfo[];
}

export interface ChatMessage {
  id: string;
  chatroomId: number;
  sender: MemberInfo;
  message: string;
  imageUrl: string;
  createdAt: string;
}

export interface MemberInfo {
  id: number;
  nickname: string;
  profileUrl: string | null;
}

export const useChatRoomStore = create<RealChatRoomStore>((set) => ({
  code: 200,
  data: null,
  setChatRoom: (data: ChatRoomStore) =>
    set({
      data: data.data,
    }),
  clearChatRoom: () =>
    set({
      data: null,
    }),
}));
