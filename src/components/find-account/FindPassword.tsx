import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindInputField from "../common/find-input-field/FindInputField";
import styles from "./FindPassword.module.scss";
import { useSendValidation } from "../../hooks/useSendValidation";
import { validators } from "../../utils/validators";

const FindPassword = () => {
  const navigate = useNavigate();

  const [emailString, setEmailString] = useState({
    value: "",
    valid: false,
    isError: false,
    errorMessage: "",
    touched: false,
  });

  const [validationCode, setValidationCode] = useState({
    value: "",
    valid: false,
    isError: false,
    errorMessage: "",
    touched: false,
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const {
    sendValidationMutation,
    receivedValidationMutation,
    failedErrorMessage,
    clearFailedErrorMessage,
  } = useSendValidation(emailString.value);

  const changeEmailString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailString((prev) => ({
      ...prev,
      value: e.target.value,
      valid: validators(e.target.value, "EMAIL_VALID") || false,
      isError: !validators(e.target.value, "EMAIL_VALID"),
      errorMessage: !validators(e.target.value, "EMAIL_VALID")
        ? "유효한 이메일을 입력하세요."
        : "",
    }));
  };

  const touchEmailString = () => {
    setEmailString((prev) => ({ ...prev, touched: true }));
  };

  const handleSendCode = () => {
    sendValidationMutation.mutate(
      { type: "FIND_PASSWORD" },
      {
        onSuccess: () => {
          setIsCodeSent(true);
        },
      }
    );
  };

  const changeValidationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = validators(value, "VALIDATION_CODE_VALID") || false;
    setValidationCode({
      value,
      valid: isValid,
      isError: !isValid,
      errorMessage: !isValid ? "인증 번호는 6글자로 입력해야 합니다." : "",
      touched: true,
    });
    if (failedErrorMessage) {
      clearFailedErrorMessage();
    }
  };

  const touchValidationCode = () => {
    setValidationCode((prev) => ({ ...prev, touched: true }));
  };

  const handleVerifyCode = () => {
    receivedValidationMutation.mutate(
      { code: validationCode.value },
      {
        onSuccess: () => {
          setIsVerified(true);
        },
      }
    );
  };

  return (
    <div className={styles["find__password"]}>
      <FindInputField
        label="이메일"
        htmlFor={"htmlForEmail"}
        type={"text"}
        value={emailString.value}
        onChange={changeEmailString}
        valid={emailString.valid}
        isError={emailString.isError}
        errorMessage={emailString.errorMessage}
        touched={emailString.touched}
        onTouch={touchEmailString}
        buttonText={isCodeSent ? "인증완료" : "인증번호"}
        onButtonClick={handleSendCode}
        buttonDisabled={
          !emailString.valid ||
          emailString.isError ||
          !emailString.touched ||
          isCodeSent
        }
        showButton={true}
      />
      {isCodeSent && (
        <FindInputField
          label="인증번호"
          htmlFor={"htmlForValidationCode"}
          type={"text"}
          value={validationCode.value}
          onChange={changeValidationCode}
          valid={validationCode.valid}
          isError={validationCode.isError}
          errorMessage={validationCode.errorMessage}
          touched={validationCode.touched}
          onTouch={touchValidationCode}
          buttonText="확인"
          onButtonClick={handleVerifyCode}
          buttonDisabled={
            !validationCode.valid ||
            validationCode.isError ||
            !validationCode.touched ||
            isVerified
          }
          showButton={true}
          placeholder="인증번호를 입력해주세요(6자리)"
        />
      )}
      {failedErrorMessage && !isVerified && (
        <p className={styles["error"]}>{failedErrorMessage}</p>
      )}
      <button
        disabled={!isVerified}
        onClick={() => {
          if (isVerified) {
            navigate("/reset-password", {
              state: { email: emailString.value, isVerified: true },
            });
          }
        }}
      >
        다음
      </button>
    </div>
  );
};

export default FindPassword;
