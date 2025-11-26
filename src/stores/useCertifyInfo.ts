import { create } from "zustand";

interface CertifyInfo {
  okMessage: string; // 인증에 성공했을 때 나타나는 메시지
  sendComplete: boolean; // 메일로 인증번호 보내는데 성공함의 여부
  certifiedComplete: boolean; // 인증번호 인증까지 성공함의 여부
  isNest: boolean; // 중복확인 여부
  successEmail: string; // 성공한 이메일 정보
  setOkMessage: (okMessage: string) => void;
  setSendComplete: (sendComplete: boolean) => void;
  setIsNest: (isNest: boolean) => void;
  setCertifiedComplete: (certifiedComplete: boolean) => void;
  setSuccessEmail: (successEmail: string) => void;
}

export const useCertifyInfo = create<CertifyInfo>((set) => ({
  okMessage: "",
  sendComplete: false,
  isNest: false,
  certifiedComplete: false,
  successEmail: "",
  setOkMessage: (okMessage) => set({ okMessage }),
  setSendComplete: (sendComplete) => set({ sendComplete }),
  setIsNest: (isNest) => set({ isNest }),
  setCertifiedComplete: (certifiedComplete) => set({ certifiedComplete }),
  setSuccessEmail: (successEmail) => set({ successEmail }),
}));
