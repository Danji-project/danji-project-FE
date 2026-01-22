import { create } from "zustand";

interface RealCommentStore extends CommentStore {
  setCommentData: (data: CommentStore) => void;
  setWritedCommentContent: (content: string) => void;
  setButtonMode: (buttonMode: string) => void;
  setEditingCommentId: (commentId: number | null) => void;
  setDeletingCommentId: (commentId: number | null) => void;
}

export interface CommentStore {
  buttonMode: string;
  editingCommentId: number | null;
  deletingCommentId: number | null;
  code: number;
  writedCommentContent: string;
  data: {
    content: CommentItem[];
    page: number;
    size: number;
  };
}

export interface CommentItem {
  commentId: number;
  feedId: number;
  contents: string;
  createdAt: string;
  commentMemberResponseDto: {
    memberId: number;
    nickname: string;
    fileId: string | null;
  };
  childrenCommentDto: CommentItem[];
  isAuthor: boolean;
}

export const useCommentStore = create<RealCommentStore>((set) => ({
  buttonMode: "",
  editingCommentId: null,
  deletingCommentId: null,
  code: 200,
  data: {
    content: [],
    page: 0,
    size: 10,
  },
  writedCommentContent: "",
  setCommentData: (data: CommentStore) => set({ data: data.data }),
  setButtonMode: (buttonMode: string) => set({ buttonMode }),
  setEditingCommentId: (commentId: number | null) =>
    set({ editingCommentId: commentId }),
  setDeletingCommentId: (commentId: number | null) =>
    set({ deletingCommentId: commentId }),
  setWritedCommentContent: (content: string) =>
    set({ writedCommentContent: content }),
}));
