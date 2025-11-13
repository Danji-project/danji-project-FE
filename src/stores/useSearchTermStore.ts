import { create } from "zustand";

interface TermReal extends Term {
  setTerm: (data: Term) => void;
}

interface Term {
  code: number;
  data: {
    apartments: Apartments[];
    totalResultCount: number;
    lastPage: boolean;
  };
}

interface Apartments {
  id: number;
  name: string;
  region: string;
  location: string;
  totalUnit: number;
  buildingCount: number;
  thumbnailFileUrl: string;
  isBookmarked: boolean;
}

export const useSearchTermStore = create<TermReal>((set) => ({
  code: 500,
  data: {
    apartments: [],
    totalResultCount: 0,
    lastPage: false,
  },
  setTerm: (data) =>
    set({
      code: data.code,
      data: data.data,
    }),
}));
