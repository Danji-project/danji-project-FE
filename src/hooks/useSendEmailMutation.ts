import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { useUserInfo } from "../stores/userStore";
import { useState } from "react";

interface Response {
  token: string;
}

export const useSendAuthEmail = () => {
  const user = useUserInfo();
  const [errMsg, setErrMsg] = useState<string>("");
  const [result, setResult] = useState<boolean>(false);

  const mutation = useMutation<Response, Error>({
    mutationFn: async () => {
      try {
        if (user.email == "example@email.com") {
          setResult(true);
          return;
        }

        const response = await axios.post(
          `/api${API_ENDPOINTS.AUTH.CERTIFICATION}`,
          { mail: user.email, type: "FIND_PASSWORD" },
          { withCredentials: true }
        );
        setResult(true);

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.status);
          throw new Error(error.response?.statusText);
        }
        throw new Error("이메일을 찾는 중 오류가 발생했습니다.");
      }
    },
    onSuccess: () => {
      setResult(true);
    },
    onError: (err: Error) => {
      setResult(false);
      setErrMsg(err.message);
      console.log(err.message);
    },
  });

  const sendEmailMutation: Function = () => {
    mutation.mutate();
  };

  return {
    sendEmailMutation,
    isPending: mutation.isPending,
    errMsg: errMsg,
    isSuccess: result,
  };
};
