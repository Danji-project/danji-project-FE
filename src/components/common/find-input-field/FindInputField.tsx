import { useCertifyInfo } from "../../../stores/useCertifyInfo";
import styles from "./FindInputField.module.scss";

const FindInputField = ({
  label,
  type,
  className,
  htmlFor,
  placeholder,
  value,
  onChangeEvent,
  valid,
  isError,
  touched,
  errorMessage,
  onTouch,
  ifEmailWillCertify,
  secondaryButtonArray,
  onSendCertify,
  finalCertified,
}: {
  label: string;
  type: string;
  htmlFor: string;
  className: string;
  placeholder: string;
  value: string;
  onChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valid: boolean;
  isError: boolean;
  touched: boolean;
  errorMessage: string;
  onTouch: () => void;
  ifEmailWillCertify?: boolean;
  secondaryButtonArray?: string[];
  onSendCertify?: () => void;
  finalCertified?: boolean;
}) => {
  const { sendComplete, certifiedComplete, okMessage } = useCertifyInfo();

  return (
    <div className={styles["find__input__field__" + className]}>
      <label htmlFor={htmlFor}>{label}</label>
      <div
        className={
          styles["find__input__field__" + className + "__inputWrapper"]
        }
      >
        <input
          type={type}
          id={htmlFor}
          placeholder={placeholder}
          value={value}
          onChange={onChangeEvent}
          onBlur={onTouch}
          readOnly={
            (label === "인증번호" && finalCertified) ||
            (label === "이메일" && sendComplete)
          }
          className={touched && !valid && isError ? styles["error"] : ""}
        />
        {ifEmailWillCertify && label === "이메일" && (
          <button
            disabled={
              !touched ||
              !valid ||
              isError ||
              errorMessage !== "" ||
              sendComplete
            }
            onClick={onSendCertify}
          >
            {sendComplete ? secondaryButtonArray![1] : secondaryButtonArray![0]}
          </button>
        )}
        {ifEmailWillCertify && label === "인증번호" && (
          <button
            disabled={
              !touched ||
              !valid ||
              isError ||
              errorMessage !== "" ||
              certifiedComplete
            }
            onClick={onSendCertify}
          >
            {secondaryButtonArray![0]}
          </button>
        )}
      </div>
      {touched && !valid && isError && (
        <p className={styles["error"]}>{errorMessage}</p>
      )}
      {okMessage && label === "인증번호" && (
        <p className={styles["ok"]}>{okMessage}</p>
      )}
    </div>
  );
};

export default FindInputField;
