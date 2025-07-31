import { useState } from "react";
import styles from "./ChatRequestModal.module.scss";

interface ChatRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendRequest: (receiverId: number, message: string) => Promise<void>;
  receiverId?: number;
  receiverName?: string;
}

const ChatRequestModal = ({
  isOpen,
  onClose,
  onSendRequest,
  receiverId,
  receiverName,
}: ChatRequestModalProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputReceiverId, setInputReceiverId] = useState("");
  const [inputReceiverName, setInputReceiverName] = useState("");

  const handleSendRequest = async () => {
    const targetReceiverId = receiverId || parseInt(inputReceiverId);
    if (!message.trim() || !targetReceiverId) return;

    try {
      setIsLoading(true);
      await onSendRequest(targetReceiverId, message);
      setMessage("");
      setInputReceiverId("");
      setInputReceiverName("");
      onClose();
    } catch (error) {
      console.error("채팅 요청 전송 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendRequest();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>채팅 요청</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {receiverName ? (
            <div className={styles.receiverInfo}>
              <span>받는 사람: {receiverName}</span>
            </div>
          ) : (
            <div className={styles.receiverInput}>
              <label>받는 사람 ID</label>
              <input
                type="number"
                placeholder="받는 사람의 ID를 입력하세요"
                value={inputReceiverId}
                onChange={(e) => setInputReceiverId(e.target.value)}
              />
              <label>받는 사람 이름 (선택사항)</label>
              <input
                type="text"
                placeholder="받는 사람의 이름을 입력하세요"
                value={inputReceiverName}
                onChange={(e) => setInputReceiverName(e.target.value)}
              />
            </div>
          )}

          <div className={styles.messageInput}>
            <label>채팅 요청 메시지</label>
            <textarea
              placeholder="채팅 요청 메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            취소
          </button>
          <button
            className={styles.sendButton}
            onClick={handleSendRequest}
            disabled={
              !message.trim() || (!receiverId && !inputReceiverId) || isLoading
            }
          >
            {isLoading ? "전송 중..." : "전송"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRequestModal;
