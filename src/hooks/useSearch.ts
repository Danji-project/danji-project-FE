import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { BaseApartInfo } from "../model/BaseApartInfoModel";

interface SearchResponse {
  token: string;
}

export const useSearch = ({searchText, setApartments}:{
  searchText:string;
  setApartments: React.Dispatch<React.SetStateAction<BaseApartInfo[] | undefined>>;
}) => {
  const mutation = useMutation<SearchResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.get(
          `/api${API_ENDPOINTS.SEARCH.DANJI}?keyword=${searchText}`
        );
        
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          throw new Error(status?.toString());
        }
      }
    },
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("user_token", data.token);
      }
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  const Search: Function = () => {
    mutation.mutate();
  };

  return {
    Search,
    isSearching: mutation.isPending,
  };
};
