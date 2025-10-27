import { create } from "zustand";

interface Members {
  fileId: string | null;
  memberId: number | null;
  nickname: string;
}

interface MembersReal extends Members {
  setMembers: (data: Members) => void;
}

export const useProfileStore = create<MembersReal>((set) => ({
  fileId: null,
  memberId: null,
  nickname: "",
  setMembers: (data) =>
    set({
      fileId: data.fileId,
      memberId: data.memberId,
      nickname: data.nickname,
    }),
}));
