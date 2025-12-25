import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

interface AddApartResponse {
  token: string;
}

export const useUserApartDelete = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const mutation = useMutation<AddApartResponse, Error>({
    mutationFn: async () => {
      try {
        console.log("user");
        console.log(user);
        if(user.memberApartmentId)
        {
          const response = await axios.delete(
          `/api${API_ENDPOINTS.USER.ADD_APART}/${user.memberApartmentId}`,
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
          return null;
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

  const DeleteApart: Function = () => {
    mutation.mutate();
  };

  return {
    DeleteApart,
    isPending: mutation.isPending,
  };
};
