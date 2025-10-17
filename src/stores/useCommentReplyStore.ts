import { create } from "zustand";

interface CommentReplyState {
  isOn: boolean;
  targetId: number | null;
  depth: number;
  setReplyOn: (id: number, depth: number) => void;
  resetReply: () => void;
}

export const useCommentReplyStore = create<CommentReplyState>((set) => ({
  isOn: false,
  targetId: null,
  depth: 0,
  setReplyOn: (id, depth) => set({ isOn: true, targetId: id, depth }),
  resetReply: () => set({ isOn: false, targetId: null, depth: 0 }),
}));
