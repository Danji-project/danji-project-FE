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
}) => {
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
        />
        {label === "이메일" && (
          <button disabled={!valid || isError || !touched}>인증번호</button>
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
