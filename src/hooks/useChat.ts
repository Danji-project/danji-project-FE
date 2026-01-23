import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePendingStore } from "../stores/usePendingStore";
import { useModalTextStore } from "../stores/useModalText";
import { useNavigate } from "react-router-dom";
import {
  type SentMessageStore,
  useSentMessageStore,
} from "../stores/useSentMessageStore";
import {
  type ReceivedMessageStore,
  useReceivedMessageStore,
} from "../stores/useReceivedMessageStore";
import {
  type DirectChattingStore,
  useDirectChattingStore,
} from "../stores/useDirectChattingStore";
import {
  type ChatRoomStore,
  useChatRoomStore,
} from "../stores/useChatRoomStore";
import {
  type GroupChattingStore,
  useGroupChattingStore,
} from "../stores/useGroupChattingStore";

interface SendRequest {
  message: string;
  receiverId: number;
}

export const useChat = () => {
  const { setModalPending } = usePendingStore();
  const { setProfileImage, setProfileNickname } = useModalTextStore();
  const { setSentMessage } = useSentMessageStore();
  const { setData } = useReceivedMessageStore();
  const { setDirectChatting } = useDirectChattingStore();
  const { setChatRoom } = useChatRoomStore();
  const { setGroupChatting } = useGroupChattingStore();
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

  const getChatPurpose = useMutation<SentMessageStore>({
    mutationFn: async () => {
      const res = await axios.get(`/api/chat/request/sent`);
      return res.data;
    },
    onSuccess: (data: SentMessageStore) => {
      setSentMessage(data);
    },
  });

  const cancelChatPurpose = useMutation<void, Error, { requestId: number }>({
    mutationFn: async ({ requestId }: { requestId: number }) => {
      await axios.delete(`/api/chat/request/${requestId}`);
    },
    onSuccess: () => {
      getChatPurpose.mutate();
    },
  });

  const getChatReceived = useMutation<ReceivedMessageStore>({
    mutationFn: async () => {
      const response = await axios.get(`/api/chat/request/received`);
      return response.data;
    },
    onSuccess: (data: ReceivedMessageStore) => {
      setData(data);
    },
  });

  const approveChatRequest = useMutation<void, Error, { requestId: number }>({
    mutationFn: async ({ requestId }: { requestId: number }) => {
      await axios.post(`/api/chat/request/${requestId}/approve`);
    },
    onSuccess: () => {
      getChatReceived.mutate();
    },
  });

  const rejectChatRequest = useMutation<void, Error, { requestId: number }>({
    mutationFn: async ({ requestId }: { requestId: number }) => {
      await axios.post(`/api/chat/request/${requestId}/reject`);
    },
    onSuccess: () => {
      getChatReceived.mutate();
    },
  });

  const getDirectChattingList = useMutation<DirectChattingStore>({
    mutationFn: async () => {
      const response = await axios.get(`/api/chat/direct`);
      return response.data;
    },
    onSuccess: (data: DirectChattingStore) => {
      setDirectChatting(data);
    },
  });

  const getChatRoom = useMutation<ChatRoomStore, Error, { chatroomId: number }>({
    mutationFn: async ({ chatroomId }: { chatroomId: number }) => {
      const response = await axios.get(`/api/chat/room/${chatroomId}`);
      return response.data;
    },
    onSuccess: (data: ChatRoomStore) => {
      setChatRoom(data);
    },
  });

  const getGroupChattingList = useMutation<GroupChattingStore>({
    mutationFn: async () => {
      const response = await axios.get(`/api/chat/group`);
      return response.data;
    },
    onSuccess: (data: GroupChattingStore) => {
      setGroupChatting(data);
    },
  });

  return {
    sendChatPurpose,
    getChatPurpose,
    cancelChatPurpose,
    getChatReceived,
    approveChatRequest,
    rejectChatRequest,
    getDirectChattingList,
    getGroupChattingList,
    getChatRoom,
    sendChatPurposePending: sendChatPurpose.isPending,
    getChatPurposePending: getChatPurpose.isPending,
    cancelChatPurposePending: cancelChatPurpose.isPending,
    getChatReceivedPending: getChatReceived.isPending,
    getDirectChattingListPending: getDirectChattingList.isPending,
    getGroupChattingListPending: getGroupChattingList.isPending,
    getChatRoomPending: getChatRoom.isPending,
  };
};
