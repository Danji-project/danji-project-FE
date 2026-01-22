import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePendingStore } from "../stores/usePendingStore";
import { useModalTextStore } from "../stores/useModalText";
import { useNavigate } from "react-router-dom";

interface SendRequest {
  message: string;
  receiverId: number;
}

export const useChat = () => {
  const { setModalPending } = usePendingStore();
  const { setProfileImage, setProfileNickname } = useModalTextStore();
  const navigate = useNavigate();

  const sendChatPurpose = useMutation<void, Error, SendRequest>({
    mutationFn: async ({ message, receiverId }: SendRequest) => {
      await axios.post(`/api/chat/request`, {
        message,
        receiverId,
      });
    },
    onSuccess: () => {
      setModalPending(false);
      setProfileImage("");
      setProfileNickname("");
      navigate("/chatting");
    },
  });

  return { sendChatPurpose, sendChatPurposePending: sendChatPurpose.isPending };
};
