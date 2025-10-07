import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { BaseApartInfo } from "../model/BaseApartInfoModel";

interface ApartmentResponse {
  token: string;
  data : BaseApartInfo;
}

export const useGetApartmentMutation = ({
  apartmentID,
  setApartment,
}: {
  apartmentID: number | undefined | null;
  setApartment: React.Dispatch<React.SetStateAction<BaseApartInfo | null| undefined>> | null;
}) => {
  const mutation = useMutation<ApartmentResponse, Error>({
    mutationFn: async () => {
      try {
        console.log('apartmentID '+apartmentID);
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
