import { create } from "zustand";

interface AlertType {
  isOpen: boolean;
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  openAlert: () => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertType>((set) => ({
  isOpen: false,
  title: "중복확인",
  content: "에러",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  openAlert: () => set({ isOpen: true }),
  closeAlert: () => set({ isOpen: false }),
}));
