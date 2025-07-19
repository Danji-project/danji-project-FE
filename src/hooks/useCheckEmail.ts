import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import useRegisterStore from "../stores/registerStore";

import axios from "axios";
import { useDialogStore } from "../stores/dialogStore";

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

  const { openDialog } = useDialogStore();

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
      disabled: true,
    }));
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
    checkEmailMutation.mutate();
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
        setErrorMessage("이미 등록된 이메일입니다. 다시 시도해주세요.");
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
    onSuccess: () => {},
  });

  return {
    checkEmail,
    checkEmailActionButton: actionButton
      ? { ...actionButton, onClick: checkEmail }
      : undefined,
    successMessage,
    errorMessage,
  };
};
