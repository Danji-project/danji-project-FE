import { create } from "zustand";

interface RealSentMessageStore extends SentMessageStore {
  setSentMessage: (data: SentMessageStore) => void;
}

export interface SentMessageStore {
  code: number;
  data: SentMessage[];
}

export interface SentMessage {
  message: string;
  memberInformation: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
  requestId: number;
  status: "PENDING" | "APPROVED";
  createdAt: string;
}

export const useSentMessageStore = create<RealSentMessageStore>((set) => ({
  code: 200,
  data: [],
  setSentMessage: (data: SentMessageStore) =>
    set({
      data: data.data,
    }),
}));
