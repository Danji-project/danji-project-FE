import { create } from "zustand";

interface AlertType {
  isAlertOpen: boolean;
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  openAlert: () => void;
  closeAlert: () => void;
}

export const useAlertStore = create<AlertType>((set) => ({
  isAlertOpen: false,
  title: "중복확인",
  content: "에러",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  openAlert: () => set({ isAlertOpen: true }),
  closeAlert: () => set({ isAlertOpen: false }),
}));
