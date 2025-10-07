import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

interface ApartResponse {
  token: string;
}

export const useUserApartDelete = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const mutation = useMutation<ApartResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.delete(
        `/api${API_ENDPOINTS.USER.ADD_APART}/${user.memberApartmentId}`,
          {
            withCredentials: true,
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

  const DeleteApart: Function = () => {
    mutation.mutate();
  };

  return {
    DeleteApart,
    isPending: mutation.isPending,
  };
};
