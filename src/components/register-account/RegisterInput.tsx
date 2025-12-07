import { useEffect } from "react";
import { useCheckEmail } from "../../hooks/useCheckEmail";
import { useCertifyInfo } from "../../stores/useCertifyInfo";
import { useModalTextStore } from "../../stores/useModalText";
import { usePendingStore } from "../../stores/usePendingStore";
import styles from "./RegisterInput.module.scss";

const RegisterInput = ({
  label,
  placeholder,
  type,
  className,
  htmlForId,
  isConfirm,
  onChangeEvent,
  value,
  isTouched,
  isError,
  isValid,
  errorMessage,
  onTouch,
  isNested,
  isValidation,
  onCertify,
  failedMessage,
  isCertifyConfirmed,
  isPasswordButton,
  passwordTypeChange,
}: {
  label: string;
  placeholder: string;
  type: string;
  className: string;
  htmlForId: string;
  isConfirm?: boolean;
  onChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isTouched: boolean;
  isError: boolean;
  isValid: boolean;
  errorMessage: string;
  onTouch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isNested?: boolean;
  isValidation?: boolean;
  onCertify?: () => void;
  failedMessage?: string;
  isCertifyConfirmed?: boolean;
  isPasswordButton?: boolean;
  passwordTypeChange?: (exports: string) => void;
}) => {
  const { checkEmailMutation, checkEmailPending } = useCheckEmail();
  const { setModalPending, setModalLoading } = usePendingStore();
  const { setModalTitle } = useModalTextStore();
  const { isNest } = useCertifyInfo();

  // Keep modal loading state in sync with mutation pending state
  useEffect(() => {
    setModalLoading(checkEmailPending);
  }, [checkEmailPending, setModalLoading]);

  return (
    <div className={styles["register__input__" + className]}>
      <label htmlFor={htmlForId}>{label}</label>
      <div className={styles["register__input__" + className + "__wrapper"]}>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChangeEvent}
          onBlur={onTouch}
          value={value}
          readOnly={isNested || isCertifyConfirmed}
          className={isTouched && !isValid && isError ? styles["error"] : ""}
        />
        {isConfirm && (
          <button
            type="button"
            disabled={!isValid || isNest}
            onClick={() => {
              setModalLoading(true);
              setModalPending(true);
              setModalTitle("중복확인");
              checkEmailMutation.mutate(value);
            }}
          >
            중복확인
          </button>
        )}
        {isPasswordButton && (
          <button
            className={styles["eyes__button"]}
            type="button"
            onClick={() => {
              if (type === "password") {
                passwordTypeChange!("text");
              } else if (type === "text") {
                passwordTypeChange!("password");
              }
            }}
          >
            {type === "text" && (
              <img src="/icons/type_off.png" alt="type_off" />
            )}
            {type === "password" && (
              <img src="/icons/type_on.png" alt="type_on" />
            )}
          </button>
        )}
        {isValidation && (
          <button
            type="button"
            disabled={!isValid || isCertifyConfirmed}
            onClick={onCertify}
          >
            {isCertifyConfirmed ? "인증 완료" : "인증 확인"}
          </button>
        )}
      </div>
      {isTouched && !isValid && isError && (
        <b
          style={{
            color: "rgb(217,28,28)",
            fontSize: "14px",
            fontWeight: "300",
            display: "block",
          }}
        >
          {errorMessage}
        </b>
      )}
      {isNested ? (
        <b
          style={{
            color: "rgb(60,165,62)",
            fontSize: "14px",
            fontWeight: "300",
            display: "block",
          }}
        >
          사용 가능한 이메일입니다.
        </b>
      ) : (
        ""
      )}
      {failedMessage && (
        <b
          style={{
            color: "rgb(217,28,28)",
            fontSize: "14px",
            fontWeight: "300",
            display: "block",
          }}
        >
          {failedMessage}
        </b>
      )}
    </div>
  );
};

export default RegisterInput;
