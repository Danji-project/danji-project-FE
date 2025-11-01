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
}) => {
  const { sendComplete } = useCertifyInfo();

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
          className={touched && !valid && isError ? styles["error"] : ""}
        />
        {ifEmailWillCertify && (
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
            {!sendComplete
              ? secondaryButtonArray![0]
              : secondaryButtonArray![1]}
          </button>
        )}
      </div>
      {touched && !valid && isError && (
        <p className={styles["error"]}>{errorMessage}</p>
      )}
    </div>
  );
};

export default FindInputField;
