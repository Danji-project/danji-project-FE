import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePendingStore } from "../stores/usePendingStore";
import { useModalTextStore } from "../stores/useModalText";
import { useCertifyInfo } from "../stores/useCertifyInfo";

export const useSendValidation = (email: string) => {
  const [failedErrorMessage, setFailedErrorMessage] = useState("");

  const { setModalPending, setModalLoading } = usePendingStore();
  const { setModalText, setIsOnlyConfirmed } = useModalTextStore();
  const {
    setSendComplete,
    setCertifiedComplete,
    setOkMessage,
    setSuccessEmail,
  } = useCertifyInfo();

  const sendValidationMutation = useMutation({
    mutationFn: async ({ type }: { type: string }) => {
      const res = await axios.post("/api/mail/certification-code/send", {
        mail: email,
        type,
      });
      return res.data;
    },
    onSuccess: () => {
      setModalPending(false);
      setModalText("");
      setSendComplete(true);
      setIsOnlyConfirmed(true);
    },
  });

  const receivedValidationMutation = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      const res = await axios.get(
        `/api/mail/certification-code/verify?email=${email}&code=${code}`
      );
      return res.data;
    },
    onSuccess: () => {
      setModalLoading(false);
      setModalText("인증되었습니다.");
      setModalPending(true);
      setCertifiedComplete(true);
      setOkMessage("올바른 인증 번호입니다.");
      setSuccessEmail(email);
      setFailedErrorMessage(""); // 성공 시 에러 메시지 초기화
    },
    onError: (e) => {
      setModalLoading(false);
      console.error(e);
      setFailedErrorMessage("인증 번호 올바르지 않습니다.");
    },
  });

  const clearFailedErrorMessage = () => {
    setFailedErrorMessage("");
  };

  return {
    sendValidationMutation,
    receivedValidationMutation,
    // Provide a robust pending flag compatible with react-query v5 naming
    sendValidationPending:
      (sendValidationMutation as any).isPending ??
      (sendValidationMutation as any).isLoading ??
      false,
    receivedValidationPending:
      (receivedValidationMutation as any).isPending ??
      (receivedValidationMutation as any).isLoading ??
      false,
    failedErrorMessage,
    clearFailedErrorMessage,
  };
};
