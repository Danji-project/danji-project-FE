import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchTermStore } from "../stores/useSearchTermStore";

interface TermRequest {
  keyword: string;
  lastIndex: number;
  limit: number;
}

export const useSearch = () => {
  const { setTerm } = useSearchTermStore();

  const searchFunction = useMutation({
    mutationFn: async ({ keyword, lastIndex, limit }: TermRequest) => {
      const res = await axios.get(
        `/api/search?keyword=${keyword}&lastIndex=${lastIndex}&limit=${limit}`
      );
      setTerm(res.data);
      return res.data;
    },
  });

  return { searchFunction, searchPending: searchFunction.isPending };
};
