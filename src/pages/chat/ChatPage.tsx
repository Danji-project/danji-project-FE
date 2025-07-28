import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";
import Header from "../../layouts/Header";
import styles from "./ChatPage.module.scss";

const ChatPage = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }
  }, [user.isLogin, navigate]);

  // 로그인하지 않은 사용자인 경우 아무것도 렌더링하지 않음
  if (!user.isLogin) {
    return null;
  }

  return (
    <div className={styles["chat-page"]}>
      <Header title="채팅" type="main" hasBackButton={true} />
      <div className={styles["chat-page__content"]}>
        {/* Figma 디자인에 맞춰 구현될 부분 */}
        <div className={styles["chat-placeholder"]}>
          <h2>채팅 페이지</h2>
          <p>Figma 디자인을 제공해주시면 구현하겠습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
