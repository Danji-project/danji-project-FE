import { create } from "zustand";

interface ModalText {
  modalText: string;
  modalTitle: string;
  isOnlyConfirmed: boolean;
  profileImage: string;
  profileNickname: string;
  receiverId: number | null;
}

interface ModalTextReal extends ModalText {
  setModalText: (modalText: string) => void;
  setModalTitle: (modalTitle: string) => void;
  setIsOnlyConfirmed: (isOnlyConfirmed: boolean) => void;
  setProfileImage: (pi: string) => void;
  setProfileNickname: (nn: string) => void;
  setReceiverId: (id: number | null) => void;
}

export const useModalTextStore = create<ModalTextReal>((set) => ({
  modalText: "",
  isOnlyConfirmed: true,
  modalTitle: "",
  profileImage: "",
  profileNickname: "",
  receiverId: null,
  setModalText: (modalText) => set({ modalText }),
  setIsOnlyConfirmed: (isOnlyConfirmed) => set({ isOnlyConfirmed }),
  setModalTitle: (modalTitle) => set({ modalTitle }),
  setProfileImage: (pi: string) => set({ profileImage: pi }),
  setProfileNickname: (nn: string) => set({ profileNickname: nn }),
  setReceiverId: (id: number | null) => set({ receiverId: id }),
}));
