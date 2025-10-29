import { create } from "zustand";

interface Pending {
  apartChatBlack: boolean;
  profilePending: boolean;
  modalPending: boolean;
  isLoginPending: boolean;
  registerDimmed: boolean;
  setApartChatBlack: (apartChatBlack: boolean) => void;
  setProfilePending: (profilePending: boolean) => void;
  setModalPending: (modalPending: boolean) => void;
  setLoginPending: (isLoginPending: boolean) => void;
  setRegisterDimmed: (registerDimmed: boolean) => void;
}

export const usePendingStore = create<Pending>((set) => ({
  apartChatBlack: false,
  profilePending: false,
  modalPending: false,
  isLoginPending: false,
  registerDimmed: false,
  setApartChatBlack: (apartChatBlack) => set({ apartChatBlack }),
  setProfilePending: (profilePending) => set({ profilePending }),
  setModalPending: (modalPending) => set({ modalPending }),
  setLoginPending: (isLoginPending) => set({ isLoginPending }),
  setRegisterDimmed: (registerDimmed) => set({ registerDimmed }),
}));
