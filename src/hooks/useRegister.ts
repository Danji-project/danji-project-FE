import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useRegisterStore from "../stores/registerStore";
import { useAlertStore } from "../stores/alertStore";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { email, password, username, nickname, phoneNumber } =
    useRegisterStore();

  const { setTitle, setContent, openAlert } = useAlertStore();

  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/member/signup`,
        {
          email: email.value,
          password: password.value,
          name: username.value,
          nickname: nickname.value,
          phoneNumber: phoneNumber.value,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      navigate("/register-success");
    },
    onError: (error) => {
      openAlert();
      if (axios.isAxiosError(error)) {
        setTitle("실패");
        setContent(
          error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
        );
      } else {
        setTitle("실패");
        setContent("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  const register: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return {
    register,
    isRegistering: registerMutation.isPending,
  };
};
