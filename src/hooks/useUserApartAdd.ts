import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

interface AddApartResponse {
  token: string;
}

export const useUserApartAdd = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const mutation = useMutation<AddApartResponse, Error>({
    mutationFn: async () => {
      try {
        console.log("user");
        console.log(user);

        const response = await axios.post(
        `/api${API_ENDPOINTS.USER.ADD_APART}`,
        {
            apartmentId: user.apartmentId,
            building: user.building,
            unit: user.uint,
            moveInDate: user.moveInDate,
            numberOfResidents: user.numberOfResidents,
            carNumbers: user.carNumber,
        },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          });
        return response.data;
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

  const AddApart: Function = () => {
    mutation.mutate();
  };

  return {
    AddApart,
    isPending: mutation.isPending,
  };
};
