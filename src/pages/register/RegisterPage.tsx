import React, { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./RegisterPage.module.scss";
import Spinners from "../../components/common/spinners/Spinners";

// 가입 방법 선택
const SelectOAuth = ({
  setOAuthSelect,
  setIsLoading,
}: {
  setOAuthSelect: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className={[styles.oAuthWrapper, styles.dimmed].join(" ")}>
      <button
        onClick={() => {
          setOAuthSelect("Kakao");
        }}
      >
        카카오로 회원가입
      </button>
      <button
        onClick={() => {
          setOAuthSelect("Google");
        }}
      >
        구글로 회원가입
      </button>
      <button
        onClick={() => {
          setOAuthSelect("Naver");
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
      <div></div>
    )
  ) : (
    <SelectOAuth setOAuthSelect={setOAuthSelect} setIsLoading={setIsLoading} />
  );
};

export default RegisterPage;
