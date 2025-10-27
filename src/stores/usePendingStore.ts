import { create } from "zustand";

interface Pending {
  feedListPending: boolean;
  apartChatBlack: boolean;
  profilePending: boolean;
  modalPending: boolean;
  setFeedListPending: (feedListPending: boolean) => void;
  setApartChatBlack: (apartChatBlack: boolean) => void;
  setProfilePending: (profilePending: boolean) => void;
  setModalPending: (modalPending: boolean) => void;
}

export const usePendingStore = create<Pending>((set) => ({
  feedListPending: false,
  apartChatBlack: false,
  profilePending: false,
  modalPending: false,
  setFeedListPending: (feedListPending) => set({ feedListPending }),
  setApartChatBlack: (apartChatBlack) => set({ apartChatBlack }),
  setProfilePending: (profilePending) => set({ profilePending }),
  setModalPending: (modalPending) => set({ modalPending }),
}));
