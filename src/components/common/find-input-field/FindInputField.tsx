import styles from "./FindInputField.module.scss";

const FindInputField = ({
  label,
  htmlFor,
  type,
  value,
  onChange,
  valid,
  isError,
  errorMessage,
  touched,
  onTouch,
  buttonText,
  onButtonClick,
  buttonDisabled,
  showButton,
  placeholder,
  showPasswordToggle,
  onPasswordToggle,
}: {
  label: string;
  htmlFor: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valid: boolean;
  isError: boolean;
  errorMessage: string;
  touched: boolean;
  onTouch: () => void;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonDisabled?: boolean;
  showButton?: boolean;
  placeholder?: string;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
}) => {
  const shouldShowButton =
    showButton !== undefined ? showButton : label === "이메일";
  const defaultButtonText = label === "이메일" ? "인증번호" : "";
  const displayButtonText = buttonText || defaultButtonText;
  const isButtonDisabled =
    buttonDisabled !== undefined
      ? buttonDisabled
      : !valid || isError || !touched;

  return (
    <div className={styles["find__input__field"]}>
      <div className={styles["find__input__field__label"]}>
        <label htmlFor={htmlFor}>{label}</label>
      </div>
      <div className={styles["find__input__field__inputs"]}>
        <input
          id={htmlFor}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onTouch}
          placeholder={placeholder}
        />
        {shouldShowButton && displayButtonText && (
          <button disabled={isButtonDisabled} onClick={onButtonClick}>
            {displayButtonText}
          </button>
        )}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            className={styles["password__toggle__button"]}
          >
            {type === "text" ? (
              <img src="/icons/type_off.png" alt="hide" />
            ) : (
              <img src="/icons/type_on.png" alt="show" />
            )}
          </button>
        )}
      </div>
      {touched && isError && !valid && (
        <p className={styles["error"]}>{errorMessage}</p>
      )}
      {touched && !isError && valid && (
        <p className={styles["correct"]}>올바른 입력입니다.</p>
      )}
    </div>
  );
};

export default FindInputField;
