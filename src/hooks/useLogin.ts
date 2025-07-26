import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";

interface LoginResponse {
  token: string;
}

const errorMessages: { [key: number]: string } & {
  default: string;
  networkError: string;
} = {
  400: "아이디 또는 비밀번호가 일치하지 않습니다",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요",
  networkError: "인터넷 연결을 확인해주세요",
  default: "로그인 중 오류가 발생했습니다",
};

export const useLogin = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const mutation = useMutation<LoginResponse, Error>({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `/api${API_ENDPOINTS.AUTH.LOGIN}`,
          { loginId: user.email, password: user.password },
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status && errorMessages[status]) {
            throw new Error(errorMessages[status]);
          } else if (error.request) {
            throw new Error(errorMessages.networkError);
          }
        }
        throw new Error(errorMessages.default);
      }
    },
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("user_token", data.token);
      }
      user.setIsLogin(true);
      navigate("/", { replace: true });
    },
    onError: (err: Error) => {
      user.setError(err.message);
      user.setIsLogin(false);
    },
  });

  const Login: Function = () => {
    mutation.mutate();
  };

  return {
    Login,
    isLogining: mutation.isPending,
  };
};


export const useLogout = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  const mutation = useMutation<LoginResponse, Error>({
    mutationFn: async () => {
      try {
        // console.log(user.email);
        // console.log(user.password);

        const response = await axios.post(
          `/api${API_ENDPOINTS.AUTH.LOGOUT}`
        );
        return response.data;
      } catch (error) {
        throw new Error(errorMessages.default);
      }
    },
    onSuccess: (data) => {
      user.setIsLogin(false);
      navigate("/", { replace: true });
    },
    onError: (err: Error) => {
      //user.setError(err.message);
      user.setIsLogin(true);
    },
  });

  const Logout: Function = () => {
    mutation.mutate();
  };

  return {
    Logout,
    isPending: mutation.isPending,
  };
};
