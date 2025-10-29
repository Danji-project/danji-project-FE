import type { Dispatch, SetStateAction } from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePendingStore } from "../stores/usePendingStore";
import { useModalTextStore } from "../stores/useModalText";

export const useSendValidation = (
  setEmailNestOk: () => void,
  setIsConfirmed: Dispatch<SetStateAction<boolean>>
) => {
  const { setModalPending } = usePendingStore();
  const { setModalText } = useModalTextStore();

  const sendValidationMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await axios.post("/api/mail/certification-code/send", {
        mail: email,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setModalPending(false);
      setModalText("");
      setEmailNestOk();
      setIsConfirmed(false);
    },
  });

  return { sendValidationMutation };
};
