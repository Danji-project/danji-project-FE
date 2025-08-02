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
  apartmentID: string | undefined | null;
  setApartment: React.Dispatch<React.SetStateAction<BaseApartInfo | undefined>>;
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
        const apart = new BaseApartInfo(1, "서초", "폴리스", "서초 폴리스", 32, 1200, 6,"https://placehold.co/150x180",true,false);
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
