import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserInfo } from "../../stores/userStore";

import Header from "../../layouts/Header";

import styles from "./findInfoPage.module.scss";
import LogoIcon from "../../assets/logo.svg";

function BoldWord({ text, boldWord }: { text: string; boldWord: string }) {
  const parts = text.split(boldWord);
  return (
    <p style={{ whiteSpace: "pre-line" }}>
      {parts[0]}
      <strong>{boldWord}</strong>
      {parts[1]}
    </p>
  );
}

const FindInfoHeader = () => {
  return (
    <div>
      <Header title="아이디/비밀번호 찾기" hasBackButton={true} />
    </div>
  );
};

const SuccessFindEmailResult = () => {
  const navigate = useNavigate();
  const successMsg = localStorage.getItem("message");
  const strongtext = localStorage.getItem("strongtext");
  return (
    <div
      style={{ textAlign: "center", padding: "20px 0px" }}
      className={`${styles["content-div"]}`}
    >
      <img src={LogoIcon} />
      <BoldWord
        text={successMsg ? successMsg : ""}
        boldWord={strongtext ? strongtext : ""}
      />
      <button
        className={`${styles["nomal-button"]} ${styles["nomal-button--valid"]}`}
        style={{
          margin: "0",
          position: "absolute",
          left: "0px",
          bottom: "20px",
        }}
        onClick={() => {
          navigate("/login", { replace: true });
        }}
      >
        로그인 페이지로 이동
      </button>
    </div>
  );
};

const FailFindEmailResult = () => {
  const navigate = useNavigate();
  const errMsg = localStorage.getItem("message");
  return (
    <div
      style={{
        background: "black",
        opacity: "0.7",
        width: "100%",
        height: "100%",
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        placeContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          display: "inline-block",
          textAlign: "center",
          padding: "20px",
          margin: "5px",
        }}
      >
        <p
          style={{
            color: "#111111",
            fontWeight: "600",
            fontSize: "15",
            margin: "0",
          }}
        >
          알림
        </p>
        <p
          style={{
            color: "#111111",
            fontWeight: "400",
            fontSize: "14",
            margin: "30px 0",
          }}
        >
          {errMsg}
        </p>
        <button
          className={`${styles["nomal-button"]} ${styles["nomal-button--valid"]}`}
          style={{ margin: "0" }}
          onClick={() => {
            navigate("/login", { replace: true });
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export const FindResultPage = () => {
  const re = localStorage.getItem("isSuccess");
  const navigate = useNavigate();
  const user = useUserInfo();

  // 이미 로그인된 사용자는 홈페이지로 리다이렉트
  useEffect(() => {
    if (user.isLogin) {
      navigate("/", { replace: true });
    }
  }, [user.isLogin, navigate]);

  // 로그인된 사용자인 경우 아무것도 렌더링하지 않음
  if (user.isLogin) {
    return null;
  }

  return (
    <>
      {re == "true" ? (
        <div>
          <FindInfoHeader />
          <SuccessFindEmailResult />
        </div>
      ) : (
        <FailFindEmailResult />
      )}
    </>
  );
};
