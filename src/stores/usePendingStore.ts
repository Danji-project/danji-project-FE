import { create } from "zustand";

interface Pending {
  apartChatBlack: boolean;
  profilePending: boolean;
  profileNick: string;
  profileImg: string;
  modalPending: boolean;
  isLoginPending: boolean;
  registerDimmed: boolean;
  modalLoading: boolean;
  findPending: boolean;
  setApartChatBlack: (apartChatBlack: boolean) => void;
  setProfilePending: (profilePending: boolean) => void;
  setProfileNick: (profileNick: string) => void;
  setProfileImg: (profileImg: string) => void;
  setModalPending: (modalPending: boolean) => void;
  setLoginPending: (isLoginPending: boolean) => void;
  setRegisterDimmed: (registerDimmed: boolean) => void;
  setModalLoading: (modalLoading: boolean) => void;
  setFindPending: (findPending: boolean) => void;
}

export const usePendingStore = create<Pending>((set) => ({
  apartChatBlack: false,
  profilePending: false,
  profileNick: "",
  profileImg: "",
  modalPending: false,
  isLoginPending: false,
  registerDimmed: false,
  modalLoading: false,
  findPending: false,
  setApartChatBlack: (apartChatBlack) => set({ apartChatBlack }),
  setProfilePending: (profilePending) => set({ profilePending }),
  setProfileNick: (profileNick) => set({ profileNick }),
  setProfileImg: (profileImg) => set({ profileImg }),
  setModalPending: (modalPending) => set({ modalPending }),
  setLoginPending: (isLoginPending) => set({ isLoginPending }),
  setRegisterDimmed: (registerDimmed) => set({ registerDimmed }),
  setModalLoading: (modalLoading) => set({ modalLoading }),
  setFindPending: (findPending) => set({ findPending }),
}));
