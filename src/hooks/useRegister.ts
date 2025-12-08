import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      name,
      nickname,
      phoneNumber,
    }: {
      email: string;
      password: string;
      name: string;
      nickname: string;
      phoneNumber: string;
    }) => {
      const res = await axios.post("/api/member/signup", {
        email,
        password,
        name,
        nickname,
        phoneNumber,
      });

      return res.data;
    },
    onSuccess: () => {
      navigate("/register-success");
    },
  });

  return {
    registerMutation,
    registerPending:
      (registerMutation as any).isPending ??
      (registerMutation as any).isLoading ??
      false,
  };
};
