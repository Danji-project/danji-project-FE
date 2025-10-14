import { create } from "zustand";

interface SidebarBase {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarBase>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
