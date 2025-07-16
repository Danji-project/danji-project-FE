import React, { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./RegisterPage.module.scss";

// 가입 방법 선택
const SelectOAuth = ({
  setOAuthSelect,
}: {
  setOAuthSelect: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className={styles.oAuthWrapper}>
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

  return oAuthSelect !== "" ? (
    <div></div>
  ) : (
    <SelectOAuth setOAuthSelect={setOAuthSelect} />
  );
};

export default RegisterPage;
