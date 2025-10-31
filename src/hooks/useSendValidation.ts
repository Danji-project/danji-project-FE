import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePendingStore } from "../stores/usePendingStore";
import { useModalTextStore } from "../stores/useModalText";

export const useSendValidation = (setEmailNestOk: () => void) => {
  const [failedErrorMessage, setFailedErrorMessage] = useState("");

  const { setModalPending } = usePendingStore();
  const { setModalText, setIsOnlyConfirmed } = useModalTextStore();

  const sendValidationMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await axios.post("/api/mail/certification-code/send", {
        mail: email,
      });
      return res.data;
    },
    onSuccess: () => {
      setModalPending(false);
      setModalText("");
      setEmailNestOk();
      setIsOnlyConfirmed(true);
    },
  });

  const receivedValidationMutation = useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) => {
      const res = await axios.get(
        `/api/mail/certification-code/verify?email=${email}&code=${code}`
      );
      return res.data;
    },
    onSuccess: () => {
      setModalText("인증되었습니다.");
      setModalPending(true);
    },
    onError: (e) => {
      console.error(e);
      setFailedErrorMessage("인증 코드가 올바르지 않습니다.");
    },
  });

  return {
    sendValidationMutation,
    sendValidationPending: sendValidationMutation.isPending,
    receivedValidationMutation,
    receivedValidationPending: sendValidationMutation.isPending,
    failedErrorMessage,
  };
};
