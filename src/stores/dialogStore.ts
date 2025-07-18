import { create } from "zustand";

interface Dialog {
  isOpen: false;
  openDialog: () => void;
  closeDialog: () => void;
}

const useDialogStore = create<Dialog>((set) => ({
  isOpen: false,
  openDialog: () => ({ isOpen: true }),
  closeDialog: () => ({ isOpen: false }),
}));

export default useDialogStore;
