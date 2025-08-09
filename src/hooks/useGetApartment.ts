import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { BaseApartInfo } from "../model/BaseApartInfoModel";

interface ApartmentResponse {
  token: string;
}

export const useGetApartmentMutation = ({
  apartmentID,
  setApartment,
}: {
  apartmentID: number | undefined | null;
  setApartment: React.Dispatch<React.SetStateAction<BaseApartInfo | null| undefined>>;
}) => {
  const mutation = useMutation<ApartmentResponse, Error>({
    mutationFn: async () => {
      try {
        if(apartmentID)
        {
          const response = await axios.get(`/api${API_ENDPOINTS.USER.GETAPARTMENT}${apartmentID}`);
          //console.log(response.data);
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
        const apart = new BaseApartInfo(100, 1, "서초", "폴리스", "서초 폴리스", "https://placehold.co/150x180", 2, false);
        setApartment(apart);
      }catch(err)
      {
        throw err;
      }
    },
    onError: (err: Error) => {
        console.log(err);
    },
  });

  const getApartmentMutation = () => {
    mutation.mutate();
  };

  return {
    getApartmentMutation,
    isPending: mutation.isPending,
  };
};
