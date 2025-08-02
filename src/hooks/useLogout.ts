import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

interface LogoutResponse {
  token: string;
}


export const useLogout = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const mutation = useMutation<LogoutResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `/api${API_ENDPOINTS.AUTH.LOGOUT}`,
          {},
          { 
            withCredentials: true,
            validateStatus: () => true 
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if(status == 302)
            console.log('go to login');
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      user.setIsLogin(false);
      navigate('login');
      //window.location.reload();
    },
    onError: (err: Error) => {
      user.setError(err.message);
      user.setIsLogin(false);
      navigate('login');
      //window.location.reload();
    },
  });

  const Logout: Function = () => {
    mutation.mutate();
    user.email = '';
    user.password = '';
  };

  return {
    Logout,
    isPending: mutation.isPending,
  };
};
