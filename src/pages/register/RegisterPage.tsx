import * as React from "react";
import { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./RegisterPage.module.scss";

import Spinners from "../../components/common/spinners/Spinners";
import Header from "../../layouts/Header";
import InputField from "../../components/common/input-field/InputField";
import Dialog from "../../components/common/dialog/Dialog";
import Alert from "../../components/common/alert/Alert";

import useRegisterStore from "../../stores/registerStore";
import { useCheckEmail } from "../../hooks/useCheckEmail";
import { useDialogStore } from "../../stores/dialogStore";

import { validateCheck } from "../../utils/validators";
import { useAlertStore } from "../../stores/alertStore";
import useAuthCode from "../../hooks/useAuthCode";
import { useRegister } from "../../hooks/useRegister";

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
    {/* <button type="button">로그인</button> */}
    {/* 제안 입니다. */}
    <a href="/login">로그인</a>
  </div>
);

// 회원가입 폼
const RegisterForm = () => {
  const {
    email,
    password,
    passwordConfirm,
    username,
    nickname,
    phoneNumber,
    setEmail,
    setAuthCode,
    setEmailCheckStatus,
    setCodeVerified,
    setVerifyCodeError,
    setPassword,
    setPasswordConfirm,
    setUsername,
    setNickname,
    setPhoneNumber,
    setEmailTouched,
    setPasswordTouched,
    setPasswordConfirmTouched,
    setUsernameTouched,
    setNicknameTouched,
    setPhoneNumberTouched,
  } = useRegisterStore();

  const {
    checkEmailActionButton,
    setActionButton: setCheckActionButton,
    successMessage,
    errorMessage,
    sendEmailCode,
  } = useCheckEmail();

  const { closeDialog } = useDialogStore();

  const { isAlertOpen, title, content, closeAlert } = useAlertStore();

  const { setActionButton, authCodeActionButton } = useAuthCode();

  const { register, isRegistering } = useRegister();

  const formValid =
    email.value &&
    email.checkStatus === "CHECKED" &&
    email.verifyCode &&
    email.codeVerified &&
    password.value &&
    passwordConfirm.value &&
    username.value &&
    nickname.value &&
    phoneNumber.value;

  const idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(
      e.target.value,
      validateCheck("ID_CHECK", e.target.value)!.valid,
      validateCheck("ID_CHECK", e.target.value)!.error
    );
  };

  const verifyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
    setCodeVerified(false);
    setVerifyCodeError(
      email.verifyCode.trim() !== "" && email.verifyCode.length === 6
        ? ""
        : "6자리 숫자로 입력해주세요"
    );
    setActionButton((prev) => ({
      ...prev,
      label: "인증확인",
      disabled: !e.target.value,
    }));
  };

  const pwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(
      e.target.value,
      validateCheck("PASSWORD_CHECK", e.target.value)!.valid,
      validateCheck("PASSWORD_CHECK", e.target.value)!.error
    );
  };

  const pwConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(
      e.target.value,
      validateCheck("PASSWORD_CONFIRM_CHECK", e.target.value)!.valid,
      validateCheck("PASSWORD_CONFIRM_CHECK", e.target.value)!.error
    );
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(
      e.target.value,
      validateCheck("NAME_CHECK", e.target.value, password.value)!.valid,
      validateCheck("NAME_CHECK", e.target.value, password.value)!.error
    );
  };

  const nicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(
      e.target.value,
      validateCheck("NICKNAME_CHECK", e.target.value)!.valid,
      validateCheck("NICKNAME_CHECK", e.target.value)!.error
    );
  };

  const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(
      e.target.value,
      validateCheck("PHONE_CHECK", e.target.value)!.valid,
      validateCheck("PHONE_CHECK", e.target.value)!.error
    );
  };

  return (
    <div>
      <form onSubmit={register}>
        <Dialog
          dialogTitle="중복확인"
          content="사용 가능한 이메일입니다."
          confirmLabel={"인증번호 전송"}
          cancelLabel="취소"
          onClose={() => {
            closeDialog();
            setEmailCheckStatus("INITIAL");
            setCheckActionButton((prev) => ({
              ...prev,
              label: "중복확인",
              disabled: false,
            }));
          }}
          onConfirm={sendEmailCode}
        />
        {isAlertOpen && (
          <Alert
            alertTitle={title}
            alertContent={content}
            onClose={closeAlert}
            confirmLabel={"확인"}
            onConfirm={closeAlert}
          />
        )}
        <InputField
          label="이메일"
          placeholder="4~15자 이내로 입력해주세요."
          className="register-form-id"
          type="text"
          name="register-form-id"
          actionButton={checkEmailActionButton}
          value={email.value}
          onChange={idChange}
          valid={validateCheck("ID_CHECK", email.value)!.valid}
          error={validateCheck("ID_CHECK", email.value)!.error}
          errorMessage={errorMessage}
          success={successMessage}
          touched={email.touched}
          touches={setEmailTouched}
          checkStatus={email.checkStatus}
        />
        {email.checkStatus === "CHECKED" && (
          <InputField
            label="인증번호"
            placeholder="인증번호 입력해주세요."
            className="register-verify-form-id"
            type="text"
            name="register-verify-form-id"
            value={email.verifyCode}
            valid={
              email.verifyCode.trim() !== "" && email.verifyCode.length === 6
            }
            verified={email.codeVerified}
            verifyCodeError={email.verifyCodeError}
            onChange={verifyCodeChange}
            actionButton={authCodeActionButton}
          />
        )}
        <InputField
          label="비밀번호"
          placeholder="영문,숫자,특수문자 포함 8~16자"
          className="register-form-password"
          type="password"
          name="register-form-password"
          showPasswordToggle
          value={password.value}
          onChange={pwChange}
          valid={validateCheck("PASSWORD_CHECK", password.value)!.valid}
          error={validateCheck("PASSWORD_CHECK", password.value)!.error}
          touched={password.touched}
          touches={setPasswordTouched}
        />
        <InputField
          label="비밀번호 확인"
          placeholder="영문,숫자,특수문자 포함 8~16자"
          className="register-form-password-confirms"
          type="password"
          name="register-form-password-confirm"
          showPasswordToggle
          value={passwordConfirm.value}
          onChange={pwConfirmChange}
          valid={
            validateCheck(
              "PASSWORD_CONFIRM_CHECK",
              passwordConfirm.value,
              password.value
            )!.valid
          }
          error={
            validateCheck(
              "PASSWORD_CONFIRM_CHECK",
              passwordConfirm.value,
              password.value
            )!.error
          }
          touched={passwordConfirm.touched}
          touches={setPasswordConfirmTouched}
        />
        <InputField
          label="이름"
          placeholder="이름을 입력해주세요."
          className="register-form-name"
          type="text"
          name="register-form-name"
          value={username.value}
          onChange={nameChange}
          valid={validateCheck("NAME_CHECK", username.value)!.valid}
          error={validateCheck("NAME_CHECK", username.value)!.error}
          touched={username.touched}
          touches={setUsernameTouched}
        />
        <InputField
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          className="register-form-nickname"
          type="text"
          name="register-form-nickname"
          value={nickname.value}
          onChange={nicknameChange}
          valid={validateCheck("NICKNAME_CHECK", nickname.value)!.valid}
          error={validateCheck("NICKNAME_CHECK", nickname.value)!.error}
          touched={nickname.touched}
          touches={setNicknameTouched}
        />
        <InputField
          label="전화번호"
          placeholder="-제외 11자리를 입력해주세요."
          className="register-form-phone"
          type="text"
          name="register-form-phone"
          value={phoneNumber.value}
          onChange={phoneChange}
          valid={validateCheck("PHONE_CHECK", phoneNumber.value)!.valid}
          error={validateCheck("PHONE_CHECK", phoneNumber.value)!.error}
          touched={phoneNumber.touched}
          touches={setPhoneNumberTouched}
        />
        <RegisterButton isLoading={isRegistering} disabled={!formValid} />
      </form>
    </div>
  );
};

// 회원가입 페이지
const RegisterPage = () => {
  const { isEmailLoading } = useCheckEmail();
  const [oAuthSelect, setOAuthSelect] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  console.log(isEmailLoading);

  return oAuthSelect !== "" && oAuthSelect === "Email" ? (
    isLoading ? (
      <div className={[styles.register, styles.dimmed].join(" ")}>
        <Spinners />
      </div>
    ) : (
      <div className={`${isEmailLoading ? styles.dimmed : ""}`}>
        <Header title="회원가입" type="sub" hasBackButton />
        <RegisterForm />
        {isIdComponent()}
      </div>
    )
  ) : (
    <SelectOAuth setOAuthSelect={setOAuthSelect} setIsLoading={setIsLoading} />
  );
};

export default RegisterPage;
