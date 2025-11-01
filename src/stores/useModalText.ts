import { create } from "zustand";

interface ModalText {
  modalText: string;
  modalTitle: string;
  isOnlyConfirmed: boolean;
}

interface ModalTextReal extends ModalText {
  setModalText: (modalText: string) => void;
  setModalTitle: (modalTitle: string) => void;
  setIsOnlyConfirmed: (isOnlyConfirmed: boolean) => void;
}

export const useModalTextStore = create<ModalTextReal>((set) => ({
  modalText: "",
  isOnlyConfirmed: true,
  modalTitle: "",
  setModalText: (modalText) => set({ modalText }),
  setIsOnlyConfirmed: (isOnlyConfirmed) => set({ isOnlyConfirmed }),
  setModalTitle: (modalTitle) => set({ modalTitle }),
}));
