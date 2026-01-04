import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

export const useUserApartAdd = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const mutation = useMutation({
    mutationFn: async ({ apartmentId, building, unit, moveInDate, numberOfResidents, carNumbers }: { apartmentId: string, building: string, unit: string, moveInDate: string, numberOfResidents: string, carNumbers : string[] }) => {
      try {
        console.log("user");
        console.log(user);
        if(user.memberApartmentId)
        {
          console.log("put user");
          const response = await axios.put(
          `/api${API_ENDPOINTS.USER.ADD_APART}/${user.memberApartmentId}`,
          {
              apartmentId: apartmentId,
              building: building,
              unit: unit,
              moveInDate: moveInDate,
              numberOfResidents: numberOfResidents,
              carNumbers: carNumbers,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response.data;
        }
        else
        {
          console.log("post user");
          const response = await axios.post(
          `/api${API_ENDPOINTS.USER.ADD_APART}`,
          {
              apartmentId: apartmentId,
              building: building,
              unit: unit,
              moveInDate: moveInDate,
              numberOfResidents: numberOfResidents,
              carNumbers: carNumbers,
          },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            });
          return response.data;
        }

      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      navigate("/my-page", { replace: true });
    },
    onError: (err: Error) => {
    },
  });

  const AddApart: Function = ({ apartmentId, building, unit, moveInDate, numberOfResidents, carNumbers }: { apartmentId: string, building: string, unit: string, moveInDate: string, numberOfResidents: string, carNumbers : string[] }) => {
    mutation.mutate({ apartmentId, building, unit, moveInDate, numberOfResidents, carNumbers });
  };

  return {
    AddApart,
    isPending: mutation.isPending,
  };
};
