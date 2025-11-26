import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserInfoMutation } from "./useUserInfoMutation";

export const useLogin = (
  loginId: string,
  loginPassword: string,
  setIdError: Dispatch<SetStateAction<string>>
) => {
  const navigate = useNavigate();
  const { getUserInfo } = useUserInfoMutation();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        "/api/login",
        {
          loginId,
          password: loginPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      navigate("/");
      getUserInfo.mutate();
    },
    onError: (e: Error) => {
      setIdError("이메일 형식이 올바르지 않습니다.|예: example@domain.com");
      console.error(e);
    },
  });

  return { loginMutation, loginMutationPending: loginMutation.isPending };
};
