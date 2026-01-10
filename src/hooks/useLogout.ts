import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserInfoMutation } from "./useUserInfoMutation";

export const useLogout = () => {
  const { getUserInfo } = useUserInfoMutation();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/logout");
      return res.data;
    },
    onSuccess: async () => {
      // 로그인 상태 플래그 제거
      localStorage.removeItem("isLoggedIn");
      // refresh user info after logout
      getUserInfo.mutate();
    },
  });

  return { logoutMutation };
};
