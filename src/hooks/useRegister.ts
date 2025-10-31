import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
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
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { registerMutation };
};
