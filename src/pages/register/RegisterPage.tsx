import React, { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./RegisterPage.module.scss";
import Spinners from "../../components/common/spinners/Spinners";
import Header from "../../layouts/Header";

// 가입 방법 선택
const SelectOAuth = ({
  setOAuthSelect,
  setIsLoading,
}: {
  setOAuthSelect: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const authClick = (provider: string) => {
    const apiBaseUrl = import.meta.env.VITE_API_URL;
    if (provider === "Kakao") {
      try {
        const kakaoAuthUrl = `${apiBaseUrl}/oauth2/authorization/kakao`;
        window.location.href = kakaoAuthUrl;
      } catch (e: unknown) {
        console.error("카카오 로그인 처리 중 오류");
        alert("카카오 로그인 처리 중 오류가 발생했습니다.");
      }
    } else if (provider === "Google") {
      try {
        const googleAuthUrl = `${apiBaseUrl}/oauth2/authorization/google`;
        window.location.href = googleAuthUrl;
      } catch (e: unknown) {
        console.error("구글 로그인 처리 중 오류");
        alert("구글 로그인 처리 중 오류가 발생했습니다.");
      }
    } else if (provider === "Naver") {
      try {
        const naverAuthUrl = `${apiBaseUrl}/oauth2/authorization/naver`;
        window.location.href = naverAuthUrl;
      } catch (e: unknown) {
        console.error("네이버 로그인 처리 중 오류");
        alert("네이버 로그인 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={[styles.oAuthWrapper, styles.dimmed].join(" ")}>
      <button
        onClick={() => {
          setOAuthSelect("Kakao");
          authClick("Kakao");
        }}
      >
        카카오로 회원가입
      </button>
      <button
        onClick={() => {
          setOAuthSelect("Google");
          authClick("Google");
        }}
      >
        구글로 회원가입
      </button>
      <button
        onClick={() => {
          setOAuthSelect("Naver");
          authClick("Naver");
        }}
      >
        네이버로 회원가입
      </button>
      <div className={styles.line}>
        <span>Or</span>
      </div>
      <button
        onClick={() => {
          setOAuthSelect("Email");
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }}
      >
        이메일로 가입하기
      </button>
    </div>
  );
};

// 회원가입 페이지
const RegisterPage = () => {
  const [oAuthSelect, setOAuthSelect] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  return oAuthSelect !== "" && oAuthSelect === "Email" ? (
    isLoading ? (
      <div className={[styles.register, styles.dimmed].join(" ")}>
        <Spinners />
      </div>
    ) : (
      <div className={styles.register}>
        <Header title="회원가입" />
      </div>
    )
  ) : (
    <SelectOAuth setOAuthSelect={setOAuthSelect} setIsLoading={setIsLoading} />
  );
};

export default RegisterPage;
