import React, { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./RegisterPage.module.scss";

import Spinners from "../../components/common/spinners/Spinners";
import Header from "../../layouts/Header";
import InputField from "../../components/common/input-field/InputField";
import Alert from "../../components/common/alert/Alert";

import useRegisterStore from "../../stores/registerStore";
import { validateCheck } from "../../utils/validators";
import { useCheckEmail } from "../../hooks/useCheckEmail";
import { useAlertStore } from "../../stores/alertStore";

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

// 제출 버튼
const RegisterButton = ({
  isLoading,
  disabled,
}: {
  isLoading: boolean;
  disabled: boolean;
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={styles["register__submit"]}
    >
      {isLoading ? "회원가입 중" : "회원가입"}
    </button>
  );
};

// 이미 있는 아이디인지 체크하기
const isIdComponent = () => (
  <div className={styles["is__id__comp"]}>
    <span>이미 회원이신가요?</span>
    <button type="button">로그인</button>
  </div>
);

// 회원가입 폼
const RegisterForm = ({
  setDimmed,
}: {
  setDimmed: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    email,
    password,
    passwordConfirm,
    username,
    nickname,
    phoneNumber,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setUsername,
    setNickname,
    setPhoneNumber,
  } = useRegisterStore();

  const { checkEmailActionButton, successMessage, errorMessage } =
    useCheckEmail();

  const { isOpen, title, content, closeAlert } = useAlertStore();

  const idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(
      e.target.value,
      validateCheck("ID_CHECK", e.target.value)!.valid,
      validateCheck("ID_CHECK", e.target.value)!.error
    );
  };

  return (
    <div className={`${styles.registerFormContainer}`}>
      <form>
        {isOpen && (
          <Alert
            alertTitle={title}
            alertContent={content}
            isUsable
            closeAlert={closeAlert}
            setDimmed={setDimmed}
          />
        )}
        <InputField
          label="아이디"
          placeholder="4~15자 이내로 입력해주세요."
          className="register-form-id"
          type="text"
          name="register-form-id"
          actionButton={checkEmailActionButton}
          value={email.value}
          onChange={idChange}
          valid={validateCheck("ID_CHECK", email.value)!.valid}
          error={validateCheck("ID_CHECK", email.value)!.error}
          success={successMessage}
          setDimmed={setDimmed}
        />
        <InputField
          label="비밀번호"
          placeholder="영문,숫자,특수문자 포함 8~16자"
          className="register-form-password"
          type="password"
          name="register-form-password"
          showPasswordToggle
          value={password.value}
        />
        <InputField
          label="비밀번호 확인"
          placeholder="영문,숫자,특수문자 포함 8~16자"
          className="register-form-password-confirms"
          type="password"
          name="register-form-password-confirm"
          showPasswordToggle
          value={passwordConfirm.value}
        />
        <InputField
          label="이름"
          placeholder="이름을 입력해주세요."
          className="register-form-name"
          type="text"
          name="register-form-name"
          value={username.value}
        />
        <InputField
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          className="register-form-nickname"
          type="text"
          name="register-form-nickname"
          value={nickname.value}
        />
        <InputField
          label="전화번호"
          placeholder="-제외 11자리를 입력해주세요."
          className="register-form-phone"
          type="text"
          name="register-form-phone"
          value={phoneNumber.value}
        />
        <RegisterButton isLoading={false} disabled={true} />
      </form>
    </div>
  );
};

// 회원가입 페이지
const RegisterPage = () => {
  const [oAuthSelect, setOAuthSelect] = useState("");
  const [dimmed, setDimmed] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  return oAuthSelect !== "" && oAuthSelect === "Email" ? (
    isLoading ? (
      <div className={[styles.register, styles.dimmed].join(" ")}>
        <Spinners />
      </div>
    ) : (
      <div className={`${styles.register} ${dimmed ? styles.dimmed : ""} `}>
        <Header title="회원가입" />
        <RegisterForm setDimmed={setDimmed} />
        {isIdComponent()}
      </div>
    )
  ) : (
    <SelectOAuth setOAuthSelect={setOAuthSelect} setIsLoading={setIsLoading} />
  );
};

export default RegisterPage;
