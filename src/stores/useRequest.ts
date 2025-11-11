import { create } from "zustand";
import type { SentData, SentData2 } from "../hooks/useChat";

interface SentDataInterface {
  code: number;
  sentData: SentData2[];
  setData: (data: SentData) => void;
}

export const useSendRequest = create<SentDataInterface>((set) => ({
  code: 500,
  sentData: [],
  setData: (data) =>
    set({
      code: data.code,
      sentData: data.data,
    }),
}));

export const useReceivedRequest = create<SentDataInterface>((set) => ({
  code: 500,
  sentData: [],
  setData: (data) =>
    set({
      code: data.code,
      sentData: data.data,
    }),
}));
