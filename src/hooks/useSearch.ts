import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchTermStore } from "../stores/useSearchTermStore";

export const useSearch = () => {
  const { setTerm } = useSearchTermStore();

  const searchFunction = useMutation({
    mutationFn: async (keyword: string) => {
      const res = await axios.get(`/api/search?keyword=${keyword}`);
      setTerm(res.data);
      return res.data;
    },
  });

  return { searchFunction, searchPending: searchFunction.isPending };
};
