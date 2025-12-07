import type { Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserInfoMutation } from "./useUserInfoMutation";
import { usePendingStore } from "../stores/usePendingStore";

export const useLogin = (
  loginId: string,
  loginPassword: string,
  setIdError: Dispatch<SetStateAction<string>>
) => {
  const navigate = useNavigate();
  const { executeUserInfoMutation } = useUserInfoMutation();
  const { setLoginPending } = usePendingStore();

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
      setLoginPending(false);
      navigate("/");
      executeUserInfoMutation();
    },
    onError: (e: Error) => {
      setLoginPending(false);
      setIdError("이메일 형식이 올바르지 않습니다.|예: example@domain.com");
      console.error(e);
    },
  });

  return { loginMutation, loginMutationPending: loginMutation.isPending };
};
