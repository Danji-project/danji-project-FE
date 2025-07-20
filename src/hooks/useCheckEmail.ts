import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import useRegisterStore from "../stores/registerStore";

import axios from "axios";
import { useDialogStore } from "../stores/dialogStore";
import { useAlertStore } from "../stores/alertStore";

export const useCheckEmail = () => {
  const { email, setEmail, setEmailCheckStatus, setAuthCode } =
    useRegisterStore();
  const [actionButton, setActionButton] = useState<{
    label: string;
    disabled: boolean;
  } | null>({
    label: "중복확인",
    disabled: true,
  });

  const { openDialog, closeDialog } = useDialogStore();

  const { openAlert, setTitle, setContent } = useAlertStore();

  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const checkEmail = () => {
    if (!email) {
      return;
    }
    setActionButton((prev) => ({
      label: prev?.label || "중복확인",
      disabled: false,
    }));
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
    checkEmailMutation.mutate();
  };

  const sendEmailCode = () => {
    closeDialog();
    sendAuthCode.mutate();
  };

  const checkEmailMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/member/check-email-duplication`,
        {
          email: email.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setEmailCheckStatus("CHECKED");
      openDialog();
      setSuccessMessage("사용 가능한 이메일입니다.");
      setErrorMessage(undefined);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrorMessage("이미 등록된 이메일입니다.");
      }
      setActionButton((prev) => ({
        label: prev?.label || "중복확인",
        disabled: false,
      }));
      setSuccessMessage(undefined);
    },
  });

  const sendAuthCode = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/mail/certification-code/send`,
        {
          mail: email.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      openAlert();
      setEmailCheckStatus("CHECKED");
      setTitle("인증 성공");
      setContent("인증번호가 전송되었습니다.");
      setActionButton(null);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          openAlert();
          setTitle("실패");
          setContent(error.response?.data?.message || "인증 코드 전송 실패");
        }
      }
      setActionButton(null);
    },
  });

  return {
    checkEmail,
    sendEmailCode,
    setActionButton,
    checkEmailActionButton: actionButton
      ? { ...actionButton, onClick: checkEmail }
      : undefined,
    successMessage,
    errorMessage,
    isEmailLoading: sendAuthCode.isPending,
  };
};
