import { create } from "zustand";

interface RealFeedRegister extends FeedRegister {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setFile: (fileList: File[] | null) => void;
  setPreviewUrls: (urls: string[]) => void;
  setMode: (mode: "EDIT" | "REGISTER") => void;
  setFeedId: (feedId: number) => void;
}

interface FeedRegister {
  title: string;
  content: string;
  file: File[] | null;
  previewUrls: string[];
  mode: "EDIT" | "REGISTER";
  feedId: number | null;
}

export const useFeedRegisterStore = create<RealFeedRegister>((set) => ({
  title: "",
  content: "",
  file: null,
  previewUrls: [],
  mode: "REGISTER",
  feedId: null,
  setTitle: (title: string) => set({ title }),
  setContent: (content: string) => set({ content }),
  setFile: (fileList: File[] | null) => set({ file: fileList }),
  setPreviewUrls: (urls: string[]) => set({ previewUrls: urls }),
  setMode: (mode: "EDIT" | "REGISTER") => set({ mode }),
  setFeedId: (feedId: number) => set({ feedId }),
}));
