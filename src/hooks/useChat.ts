import axios from "axios";
import { useEffect } from "react";

const useChat = () => {
  useEffect(() => {
    // 임시 토큰 발급
    const tempToken = async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ws/token`
      );
      console.log(response.data);
    };

    tempToken();
  }, []);
};

export default useChat;
