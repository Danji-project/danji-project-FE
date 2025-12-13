import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Apartment, ApartmentSearchResponse } from "../api/types";
import { API_ENDPOINTS } from "../api/endpoints";

export const useSearchApartment = () => {
  const searchMutation = useMutation({
    mutationFn: async (keyword: string): Promise<Apartment[]> => {
      if (!keyword.trim()) {
        return [];
      }

      const res = await axios.get<ApartmentSearchResponse>(
        `/api${API_ENDPOINTS.SEARCH.DANJI}`,
        {
          params: {
            keyword: keyword,
          },
        }
      );

      return res.data.apartments || [];
    },
  });

  return {
    searchApartment: searchMutation.mutate,
    searchResults: (searchMutation.data as Apartment[]) || [],
    isLoading: searchMutation.isPending,
    isError: searchMutation.isError,
    error: searchMutation.error,
  };
};
