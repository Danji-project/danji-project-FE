import * as React from "react";
import { useId, useState } from "react";

import styles from "./InputField.module.scss";

interface ActionButton {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const eyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.95245 4.2436C9.29113 4.19353 9.64051 4.16667 10.0003 4.16667C14.2545 4.16667 17.0461 7.9207 17.9839 9.40569C18.0974 9.58542 18.1542 9.67528 18.1859 9.81389C18.2098 9.91799 18.2098 10.0822 18.1859 10.1863C18.1541 10.3249 18.097 10.4154 17.9827 10.5963C17.7328 10.9918 17.3518 11.5476 16.8471 12.1504M5.6036 5.59586C3.80187 6.81808 2.57871 8.51615 2.01759 9.4044C1.90357 9.58489 1.84656 9.67514 1.81478 9.81373C1.79091 9.91783 1.7909 10.082 1.81476 10.1861C1.84652 10.3247 1.90328 10.4146 2.01678 10.5943C2.95462 12.0793 5.74618 15.8333 10.0003 15.8333C11.7157 15.8333 13.1932 15.223 14.4073 14.3972M2.50035 2.5L17.5003 17.5M8.23258 8.23223C7.78017 8.68464 7.50035 9.30964 7.50035 10C7.50035 11.3807 8.61963 12.5 10.0003 12.5C10.6907 12.5 11.3157 12.2202 11.7681 11.7678"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const eyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.01677 10.5946C1.90328 10.4149 1.84654 10.3251 1.81477 10.1865C1.79091 10.0824 1.79091 9.91824 1.81477 9.81415C1.84654 9.67556 1.90328 9.58571 2.01677 9.40601C2.95461 7.92103 5.74617 4.16699 10.0003 4.16699C14.2545 4.16699 17.0461 7.92103 17.9839 9.40601C18.0974 9.58571 18.1541 9.67556 18.1859 9.81415C18.2098 9.91824 18.2098 10.0824 18.1859 10.1865C18.1541 10.3251 18.0974 10.4149 17.9839 10.5946C17.0461 12.0796 14.2545 15.8337 10.0003 15.8337C5.74617 15.8337 2.95461 12.0796 2.01677 10.5946Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.0003 12.5003C11.381 12.5003 12.5003 11.381 12.5003 10.0003C12.5003 8.61961 11.381 7.50033 10.0003 7.50033C8.61962 7.50033 7.50034 8.61961 7.50034 10.0003C7.50034 11.381 8.61962 12.5003 10.0003 12.5003Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InputField = ({
  label,
  placeholder,
  className,
  type,
  name,
  actionButton,
  showPasswordToggle,
  value,
  onChange,
  valid,
  error,
  errorMessage,
  success,
  touched,
  touches,
  verified,
  checkStatus,
}: {
  label: string;
  placeholder: string;
  className: string;
  type: "text" | "password";
  name: string;
  actionButton?: ActionButton;
  showPasswordToggle?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valid?: boolean;
  error?: string;
  errorMessage?: string;
  success?: string;
  touched?: boolean;
  touches?: () => void;
  verified?: boolean;
  checkStatus?: "INITIAL" | "CHECKED" | "DUPLICATE";
}) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const inputRegularField = () => (
    <input
      type="text"
      placeholder={placeholder}
      id={id}
      name={name}
      className={`${styles["input__field__input"]} ${
        !valid && error !== "" && touched ? styles["input__field__error"] : ""
      }`}
      value={value}
      onChange={onChange}
      onBlur={touches}
      readOnly={checkStatus === "CHECKED" || verified}
    />
  );

  const inputPasswordField = () => (
    <input
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={onChange}
      className={`${styles["input__field__input"]} ${
        !valid && error !== "" && touched ? styles["input__field__error"] : ""
      }`}
    />
  );

  return (
    <div className={`${styles["input__field"]} ${className}`}>
      <label className={`${styles["input__field__label"]}`} htmlFor={id}>
        {label}
      </label>
      <div
        className={`${styles["input__field__wrapper"]} ${
          actionButton ? styles["input__field__flex"] : ""
        }`}
      >
        {type === "password" ? inputPasswordField() : inputRegularField()}
        {type === "password" && showPasswordToggle && (
          <button
            type="button"
            className={`${styles["input__field__eye"]}`}
            onClick={handlePasswordToggle}
          >
            {showPassword ? eyeOffIcon() : eyeIcon()}
          </button>
        )}
        {actionButton && (
          <button
            className={`${styles["input__field__action__button"]}`}
            disabled={
              (actionButton.label !== "중복확인" && actionButton.disabled) ||
              (actionButton.label === "중복확인" && !valid && error !== "")
            }
            onClick={actionButton.onClick}
            type="button"
          >
            {actionButton.label}
          </button>
        )}
        {!valid && error !== "" && touched && (
          <p className={styles["input__error"]}>{error}</p>
        )}
        {errorMessage && !success && (
          <p className={styles["input__error"]}>{errorMessage}</p>
        )}
        {success && !errorMessage && (
          <p className={styles["input__success"]}>{success}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
