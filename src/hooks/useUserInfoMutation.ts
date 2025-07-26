import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

interface UserInfoResponse {
  token: string;
}

export const useUserInfoMutation = () => {
  const user = useUserInfo();

  const mutation = useMutation<UserInfoResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.get(`/api${API_ENDPOINTS.USER.MEMBER}`);
        return response.data;
      } catch (error) {
        throw new Error("");
      }
    },
    onSuccess: (data) => {
      user.setIsLogin(true);
    },
    onError: (err: Error) => {
      user.setIsLogin(false);
    },
  });

  const executeUserInfoMutation = () => {
    mutation.mutate();
  };

  return {
    executeUserInfoMutation,
    isPending: mutation.isPending,
  };
};
