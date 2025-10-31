import { create } from "zustand";

interface ModalText {
  modalText: string;
  isOnlyConfirmed: boolean;
}

interface ModalTextReal extends ModalText {
  setModalText: (modalText: string) => void;
  setIsOnlyConfirmed: (isOnlyConfirmed: boolean) => void;
}

export const useModalTextStore = create<ModalTextReal>((set) => ({
  modalText: "",
  isOnlyConfirmed: true,
  setModalText: (modalText) => set({ modalText }),
  setIsOnlyConfirmed: (isOnlyConfirmed) => set({ isOnlyConfirmed }),
}));
