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
      // refresh user info after logout
      getUserInfo.mutate();
    },
  });

  return { logoutMutation };
};
