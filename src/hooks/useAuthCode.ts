import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import useRegisterStore from "../stores/registerStore";
import { useAlertStore } from "../stores/alertStore";

const useAuthCode = () => {
  const { email, setAuthCode, setCodeVerified, setVerifyCodeError } =
    useRegisterStore();

  const { openAlert, setTitle, setContent } = useAlertStore();

  const [actionButton, setActionButton] = useState({
    label: "인증 확인",
    disabled: !email.verifyCode,
  });

  const authCodeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/mail/certification-code/verify`,
        {
          params: { email: email.value, code: email.verifyCode },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setCodeVerified(true);
      openAlert();
      setTitle("인증확인");
      setContent("인증되었습니다.");
      setActionButton((prev) => ({
        ...prev,
        label: "인증완료",
        disabled: true,
      }));
    },
    onError: (error) => {
      setCodeVerified(false);
      openAlert();
      setTitle("인증실패");
      if (axios.isAxiosError(error)) {
        setContent(error.response?.data?.message);
      }
      setActionButton((prev: any) => ({
        ...prev,
        disabled: false,
      }));
    },
  });

  const checkAuthCode = () => {
    if (!email.verifyCode) {
      setVerifyCodeError("인증번호를 입력해주세요.");
      return;
    }
    setActionButton((prev: any) => ({ ...prev, disabled: true }));
    authCodeMutation.mutate();
  };

  return {
    checkAuthCode,
    setActionButton,
    authCodeActionButton: { ...actionButton, onClick: checkAuthCode },
  };
};

export default useAuthCode;
