import { create } from "zustand";

interface Comment extends CommentStore {
  setFetch: (fetchData: CommentStore) => void;
}

interface CommentStore {
  code: number;
  data: CommentStore2;
}

interface CommentStore2 {
  content: CommentStore3[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface CommentStore3 {
  commentId: number;
  feedId: number;
  contents: string;
  createdAt: string;
  commentMemberResponseDto: CommentStore4;
  childrenCommentDto: CommentStore3[];
}

interface CommentStore4 {
  memberId: number;
  nickname: string;
  fileId: string | null;
}

export const useCommentStore = create<Comment>((set) => ({
  code: 0,
  data: {
    content: [],
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  },

  setFetch: (fetchData: CommentStore) =>
    set({
      code: fetchData.code,
      data: {
        content: fetchData.data.content,
        page: fetchData.data.page,
        size: fetchData.data.size,
        totalElements: fetchData.data.totalElements,
        totalPages: fetchData.data.totalPages,
      },
    }),
}));
