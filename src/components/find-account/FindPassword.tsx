import { useState } from "react";
import FindInputField from "../common/find-input-field/FindInputField";
import styles from "./FindPassword.module.scss";

const FindPassword = () => {
  const [emailString, setEmailString] = useState({
    value: "",
    valid: false,
    isError: false,
    errorMessage: "",
    touched: false,
  });

  const changeEmailString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailString((prev) => ({
      ...prev,
      value: e.target.value,
      valid: e.target.value.includes("@"),
      isError: !e.target.value.includes("@"),
      errorMessage: !e.target.value.includes("@")
        ? "유효한 이메일을 입력하세요."
        : "",
    }));
  };

  const touchEmailString = () => {
    setEmailString((prev) => ({ ...prev, touched: true }));
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
      />
    </div>
  );
};

export default FindPassword;
