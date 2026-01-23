import { create } from "zustand";

interface RealReceivedMessageStore extends ReceivedMessageStore {
  setData: (data: ReceivedMessageStore) => void;
}

export interface ReceivedMessageStore {
  code: number;
  data: ReceivedMessage[];
}

export interface ReceivedMessage {
  message: string;
  memberInformation: {
    id: number;
    nickname: string;
    profileUrl: string | null;
  };
  requestId: number;
  status: "APPROVED" | "PENDING";
  createdAt: string;
}

export const useReceivedMessageStore = create<RealReceivedMessageStore>(
  (set) => ({
    code: 200,
    data: [],
    setData: (data: ReceivedMessageStore) =>
      set({
        data: data.data,
      }),
  }),
);
