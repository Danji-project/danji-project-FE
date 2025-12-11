import { create } from "zustand";

interface TermReal extends Term {
  setTerm: (response: Term) => void;
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
  id: number | null;
  name: string;
  region: string;
  location: string;
  totalUnit: number | null;
  buildingCount: number | null;
  thumbnailFileUrl: string | null;
  isBookmarked: boolean;
  kaptCode: string;
}

export const useSearchTermStore = create<TermReal>((set) => ({
  code: 500,
  data: {
    apartments: [],
    totalResultCount: 0,
    lastPage: false,
  },
  setTerm: (response) => set(response),
}));
