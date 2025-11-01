import { create } from "zustand";

interface CertifyInfo {
  okMessage: string;
  sendComplete: boolean;
  setOkMessage: (okMessage: string) => void;
  setSendComplete: (sendComplete: boolean) => void;
}

export const useCertifyInfo = create<CertifyInfo>((set) => ({
  okMessage: "",
  sendComplete: false,
  setOkMessage: (okMessage) => set({ okMessage }),
  setSendComplete: (sendComplete) => set({ sendComplete }),
}));
