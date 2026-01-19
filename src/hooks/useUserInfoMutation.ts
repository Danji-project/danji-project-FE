import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUserInfoStore } from "../stores/userStore";

export const useUserInfoMutation = (isLogin: boolean) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      const response = await axios.get(`/api/member`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    },
    enabled: isLogin,
  });

  useEffect(() => {
    if (!isError && data?.data) {
      localStorage.setItem("userData", JSON.stringify(data.data));
      useUserInfoStore.setState({ data: data.data });
    }
  }, [isError, data]);

  return { isLoading };
};
