import type { Dispatch, SetStateAction } from "react";
import { useCheckEmail } from "../../hooks/useCheckEmail";
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
}) => {
  const { checkEmailMutation } = useCheckEmail();
  const { setModalPending } = usePendingStore();

  return (
    <div className={styles["register__input__" + className]}>
      <label htmlFor={htmlForId}>{label}</label>
      <div className={styles["register__input__" + className + "__wrapper"]}>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChangeEvent}
          onFocus={onTouch}
          value={value}
          readOnly={isNested}
          className={isTouched && !isValid && isError ? styles["error"] : ""}
        />
        {isConfirm && (
          <button
            type="button"
            disabled={!isValid}
            onClick={() => {
              checkEmailMutation.mutate(value);
              setModalPending(true);
            }}
          >
            중복확인
          </button>
        )}
      </div>
      {isTouched && !isValid && isError && (
        <b
          style={{
            color: "rgb(217,28,28)",
            fontSize: "14px",
            fontWeight: "300",
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
          }}
        >
          사용 가능한 이메일입니다.
        </b>
      ) : (
        ""
      )}
    </div>
  );
};

export default RegisterInput;
