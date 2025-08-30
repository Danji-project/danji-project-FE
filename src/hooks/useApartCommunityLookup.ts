import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { BasePost } from "../model/BasePostModel";

interface ApartPostSummaryResponse {
  code: string;
  data:{
    cursorDate:string;
    feedDtoList:BasePost[];
  }
}

export const useGetApartCommunityLookup = ({
  apartmentID,
  sort,
  setPostSummary
}: {
  apartmentID: number | null;
  sort :'ALL' | 'POPULAR' | 'LATEST';
  setPostSummary: React.Dispatch<React.SetStateAction<BasePost[]>>;
}) => {
  const mutation = useMutation<ApartPostSummaryResponse, Error>({
    mutationFn: async () => {
      try {
        if(apartmentID)
        {
          const response = await axios.get(`/api${API_ENDPOINTS.USER.GETCOMMUNITYFEED}?apartmentId=${apartmentID}&sort=${sort}`);
          return response.data;
        }
        else
          throw new Error("Appartment ID Error");
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      try{
        if (data?.data?.feedDtoList) {
          setPostSummary(data?.data?.feedDtoList);
        }
      }catch(err)
      {
        throw err;
      }
    },
    onError: (err: Error) => {
        console.log(err);
    },
  });

  const getApartCommunityLookupMutation = () => {
    mutation.mutate();
  };

  return {
    getApartCommunityLookupMutation,
    isPending: mutation.isPending,
  };
};
