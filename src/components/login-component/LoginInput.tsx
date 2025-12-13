import styles from "./LoginInput.module.scss";

const LoginInput = ({
  label,
  placeholder,
  className,
  htmlForId,
  type,
  value,
  onChange,
  onTypeChange,
  isButton,
  errorMessage,
}: {
  label: string;
  placeholder: string;
  className: string;
  htmlForId: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange?: () => void;
  isButton?: boolean;
  errorMessage?: string;
}) => {
  return (
    <div className={styles["login__input__" + className]}>
      <label htmlFor={htmlForId}>{label}</label>
      <div className={styles["login__input__" + className + "__wrapper"]}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${errorMessage ? styles["error"] : ""}`}
        />
        {isButton && (
          <button type="button" onClick={onTypeChange}>
            {type === "text" && (
              <img src="/icons/type_off.png" alt="type_off" />
            )}
            {type === "password" && (
              <img src="/icons/type_on.png" alt="type_on" />
            )}
          </button>
        )}
      </div>
      {!isButton && errorMessage !== "" && (
        <span>
          {errorMessage?.split("|").map((em: string, idx: number) => (
            <b key={idx}>{em}</b>
          ))}
        </span>
      )}
    </div>
  );
};

export default LoginInput;
