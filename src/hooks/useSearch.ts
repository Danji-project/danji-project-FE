import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { BaseApartInfo } from "../model/BaseApartInfoModel";

interface SearchResponse {
  code: string;
  data:{
    apartments:BaseApartInfo[];
  }
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
        
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          throw new Error(status?.toString());
        }
      }
    },
    onSuccess: (data) => {
      if (data?.data?.apartments) {
        setApartments(data?.data?.apartments);
      }
      console.log(data?.data);
    },
    onError: (err: Error) => {
      setApartments(undefined);
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
