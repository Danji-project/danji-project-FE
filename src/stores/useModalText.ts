import { create } from "zustand";

interface ModalText {
  modalText: string;
}

interface ModalTextReal extends ModalText {
  setModalText: (modalText: string) => void;
}

export const useModalTextStore = create<ModalTextReal>((set) => ({
  modalText: "",
  setModalText: (modalText) => set({ modalText }),
}));
