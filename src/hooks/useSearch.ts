import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchTermStore } from "../stores/useSearchTermStore";
import { useState } from "react";

interface TermRequest {
  keyword: string;
  lastIndex: number;
  limit: number;
}

interface PopularTerm {
  code: number;
  data: {
    keyword: string;
  }[];
}

export const useSearch = () => {
  const { setTerm } = useSearchTermStore();
  const [popular, setPopular] = useState<{ keyword: string }[]>([]);

  const searchFunction = useMutation({
    mutationFn: async ({ keyword, lastIndex, limit }: TermRequest) => {
      const res = await axios.get(
        `/api/search?keyword=${keyword}&lastIndex=${lastIndex}&limit=${limit}`,
      );
      setTerm(res.data);
      return res.data;
    },
  });

  const getPopularTerm = useMutation<PopularTerm, Error, { limit: number }>({
    mutationFn: async ({ limit }: { limit: number }) => {
      const response = await axios.get(
        `/api/search/popular-keywords?limit=${limit}`,
      );
      return response.data;
    },
    onSuccess: (data: PopularTerm) => {
      setPopular(data.data);
    },
  });

  return {
    searchFunction,
    popular,
    getPopularTerm,
    searchPending: searchFunction.isPending,
    popularPending: getPopularTerm.isPending,
  };
};
