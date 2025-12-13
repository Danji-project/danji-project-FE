import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../layouts/Header";
import FindInputField from "../../components/common/find-input-field/FindInputField";
import styles from "./ResetPassword.module.scss";
import { validators } from "../../utils/validators";
import axios from "axios";
import TextModal from "../../components/common/text-modal/TextModal";
import { usePendingStore } from "../../stores/usePendingStore";
import { useModalTextStore } from "../../stores/useModalText";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as {
    email?: string;
    isVerified?: boolean;
  } | null;
  const email = locationState?.email || "";
  const isVerified = locationState?.isVerified || false;
  const [isSuccess, setIsSuccess] = useState(false);
  const { modalPending, setModalPending } = usePendingStore();
  const { modalText, setModalText, setModalTitle } = useModalTextStore();

  // 이메일 인증이 완료되지 않았으면 접근 차단
  useEffect(() => {
    if (!email || !isVerified) {
      // 인증되지 않은 접근 시 비밀번호 찾기 페이지로 리다이렉트
      navigate("/find-account", { replace: true });
    }
  }, [email, isVerified, navigate]);

  // 인증되지 않은 경우 아무것도 렌더링하지 않음
  if (!email || !isVerified) {
    navigate("/");
  }

  const [newPassword, setNewPassword] = useState({
    value: "",
    valid: false,
    isError: false,
    errorMessage: "",
    touched: false,
    type: "password" as "password" | "text",
  });

  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    valid: false,
    isError: false,
    errorMessage: "",
    touched: false,
    type: "password" as "password" | "text",
  });

  // 이메일 인증이 완료되지 않았으면 접근 차단
  useEffect(() => {
    if (!email || !isVerified) {
      // 인증되지 않은 접근 시 비밀번호 찾기 페이지로 리다이렉트
      navigate("/find-account", { replace: true });
    }
  }, [email, isVerified, navigate]);

  // 인증되지 않은 경우 아무것도 렌더링하지 않음
  if (!email || !isVerified) {
    return null;
  }

  const changeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = validators(value, "PASSWORD_VALID") || false;
    setNewPassword({
      value,
      valid: isValid,
      isError: !isValid,
      errorMessage: !isValid
        ? "8 ~ 16자의 영문, 숫자, 특수문자를 포함시켜 주세요."
        : "",
      touched: true,
      type: newPassword.type,
    });
  };

  const touchNewPassword = () => {
    setNewPassword((prev) => ({ ...prev, touched: true }));
  };

  const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid =
      validators(value, "PASSWORD_CONFIRM_VALID", newPassword.value) || false;
    setConfirmPassword({
      value,
      valid: isValid,
      isError: !isValid,
      errorMessage: !isValid ? "비밀번호와 일치하지 않습니다" : "",
      touched: true,
      type: confirmPassword.type,
    });
  };

  const touchConfirmPassword = () => {
    setConfirmPassword((prev) => ({ ...prev, touched: true }));
  };

  const togglePasswordVisibility = (field: "new" | "confirm") => {
    if (field === "new") {
      setNewPassword((prev) => ({
        ...prev,
        type: prev.type === "password" ? "text" : "password",
      }));
    } else {
      setConfirmPassword((prev) => ({
        ...prev,
        type: prev.type === "password" ? "text" : "password",
      }));
    }
  };

  const nextDisabled =
    !newPassword.value ||
    !newPassword.valid ||
    newPassword.isError ||
    !confirmPassword.value ||
    !confirmPassword.valid ||
    confirmPassword.isError;

  const handleNext = async () => {
    try {
      // 비밀번호 재설정 API 호출
      await axios.post("/api/member/reset-password", {
        email,
        password: newPassword.value,
      });
      setIsSuccess(true);
    } catch (error: unknown) {
      console.error("비밀번호 재설정 실패:", error);
      // 에러 모달 표시
      setModalTitle("비밀번호 재설정 실패");
      setModalText("비밀번호 재설정 실패");
      setModalPending(true);
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  if (isSuccess) {
    return (
      <>
        <Header title="아이디/비밀번호 찾기" hasBackButton />
        <div className={styles["reset__password__success"]}>
          <div className={styles["reset__password__success__icon"]}>
            <div className={styles["reset__password__success__icon__house"]}>
              <img src="/logo-danji.png" alt="logo" />
            </div>
          </div>
          <div className={styles["reset__password__success__message"]}>
            <p>비밀번호가 성공적으로 변경되었습니다.</p>
            <p>다시 로그인 해 주세요!</p>
          </div>
          <button
            className={styles["reset__password__success__button"]}
            onClick={handleGoToLogin}
          >
            로그인페이지로 이동
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="비밀번호 재설정" hasBackButton />
      <div className={styles["reset__password"]}>
        <div className={styles["reset__password__email"]}>
          <div className={styles["reset__password__email__label"]}>이메일</div>
          <div className={styles["reset__password__email__value"]}>{email}</div>
        </div>
        <FindInputField
          label="새 비밀번호"
          htmlFor="newPassword"
          type={newPassword.type}
          value={newPassword.value}
          onChange={changeNewPassword}
          valid={newPassword.valid}
          isError={newPassword.isError}
          errorMessage={newPassword.errorMessage}
          touched={newPassword.touched}
          onTouch={touchNewPassword}
          placeholder="영문, 숫자, 특수문자 포함 8~16자"
          showButton={false}
          showPasswordToggle={true}
          onPasswordToggle={() => togglePasswordVisibility("new")}
        />
        <FindInputField
          label="비밀번호 확인"
          htmlFor="confirmPassword"
          type={confirmPassword.type}
          value={confirmPassword.value}
          onChange={changeConfirmPassword}
          valid={confirmPassword.valid}
          isError={confirmPassword.isError}
          errorMessage={confirmPassword.errorMessage}
          touched={confirmPassword.touched}
          onTouch={touchConfirmPassword}
          placeholder="영문, 숫자, 특수문자 포함 8~16자"
          showButton={false}
          showPasswordToggle={true}
          onPasswordToggle={() => togglePasswordVisibility("confirm")}
        />
        <button
          className={styles["next__button"]}
          disabled={nextDisabled}
          onClick={handleNext}
        >
          다음
        </button>
      </div>
      {modalPending && (
        <TextModal
          text={modalText}
          usingConfirm={true}
          onConfirm={() => {
            setModalPending(false);
            setModalText("");
          }}
        />
      )}
    </>
  );
};

export default ResetPassword;
