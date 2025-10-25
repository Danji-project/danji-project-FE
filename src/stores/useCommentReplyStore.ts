import { create } from "zustand";

interface CommentReplyState {
  isOn: boolean;
  targetId: number | null;
  isReply: boolean;
  depth: number;
  setReplyOn: (id: number, depth: number, isReply: boolean) => void;
  resetReply: () => void;
}

export const useCommentReplyStore = create<CommentReplyState>((set) => ({
  isOn: false,
  targetId: null,
  depth: 0,
  isReply: false,
  setReplyOn: (id, depth, isReply) =>
    set({ isOn: true, targetId: id, depth, isReply }),
  resetReply: () =>
    set({ isOn: false, targetId: null, depth: 0, isReply: false }),
}));
