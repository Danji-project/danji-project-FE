import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import type { BaseApartInfo } from "../model/BaseApartInfoModel";
import type { ApartmentItem } from "../api";

interface ApartmentResponse {
  token: string;
  data : ApartmentItem;
}

export const useGetApartmentMutation = ({
  apartmentID,
  setApartment,
}: {
  apartmentID: string | undefined | null;
  setApartment: React.Dispatch<React.SetStateAction<ApartmentItem | null| undefined>> | null;
}) => {
  const mutation = useMutation<ApartmentResponse, Error>({
    mutationFn: async () => {
      try {
        console.log('apartmentID '+ apartmentID);
        if(apartmentID)
        {
          const response = await axios.get(`/api${API_ENDPOINTS.USER.GETAPARTMENT}?id=${apartmentID}`);
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
        if(setApartment && data.data)
          setApartment(data.data);
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
