import { create } from "zustand";

interface AlertStore {
  isOpen: boolean;
  title: string;
  content: string;
  openAlert: () => void;
  closeAlert: () => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  title: "중복확인",
  content: "에러",
  openAlert: () => set((state) => ({ ...state, isOpen: true })),
  closeAlert: () => set((state) => ({ ...state, isOpen: false })),
  setTitle: (title: string) => set((state) => ({ ...state, title })),
  setContent: (content: string) => set((state) => ({ ...state, content })),
}));
