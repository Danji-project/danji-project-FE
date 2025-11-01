import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserInfoMutation } from "./useUserInfoMutation";

export const useLogout = () => {
  const { executeUserInfoMutation } = useUserInfoMutation();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/logout");
      return res.data;
    },
    onSuccess: async () => {
      executeUserInfoMutation();
    },
  });

  return { logoutMutation };
};
