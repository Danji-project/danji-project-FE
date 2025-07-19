import { useId, useState, useEffect, useRef } from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  type?: 'text' | 'email' | 'password' | 'search';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  success?: string;
  helperText?: string;
  validation?: (value: string) => string | undefined;
  minLength?: number;
  pattern?: string;
  className?: string;
  lableClassName?: string;
  showPasswordToggle?: boolean;
  actionButton?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

const EyeIcon = () => (
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

const EyeOffIcon = () => (
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

export const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  success,
  helperText,
  minLength,
  pattern,
  showPasswordToggle = false,
  actionButton,
  className,
  lableClassName,
  ...rest
}: InputFieldProps) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (type === 'password' && passwordInputRef.current) {
      passwordInputRef.current.value = value || '';
    }
  }, [type, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const renderPasswordInput = () => (
    <input
      id={id}
      ref={passwordInputRef}
      type={showPassword ? 'text' : 'password'}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      minLength={minLength}
      pattern={pattern}
      className={`${styles['input-field__input']} ${error ? styles['input-field__input--error'] : ''} ${
        showPasswordToggle
          ? styles['input-field__input--with-password-toggle']
          : ''
      }`}
      aria-invalid={!!error}
      aria-errormessage={error ? `${id}-error` : undefined}
      autoComplete="current-password"
      data-lpignore="true"
      {...rest}
    />
  );

  const renderRegularInput = () => (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      minLength={minLength}
      pattern={pattern}
      className={`${styles['input-field__input']} ${error ? styles['input-field__input--error'] : ''} ${
        actionButton ? styles['input-field__wrapper--with-button'] : ''
      }`}
      aria-invalid={!!error}
      aria-errormessage={error ? `${id}-error` : undefined}
      {...rest}
    />
  );

  return (
    <div className={`${styles['input-field']} ${className || ''}`}>
      <label
        htmlFor={id}
        className={`${styles['input-field__label']} ${lableClassName || ''}`}
      >
        {label}
      </label>
      <div className={styles['input-field__wrapper']}>
        {type === 'password' ? renderPasswordInput() : renderRegularInput()}

        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className={styles['input-field__password-toggle']}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}

        {actionButton && (
          <button
            type="button"
            onClick={actionButton.onClick}
            disabled={actionButton.disabled || disabled}
            className={styles['input-field__action-button']}
          >
            {actionButton.label}
          </button>
        )}
      </div>
      {error && (
        <span
          id={`${id}-error`}
          className={styles['input-field__error-text']}
          role="alert"
        >
          {error}
        </span>
      )}
      {success && !error && (
        <span
          id={`${id}-success`}
          className={styles['input-field__success-text']}
          role="status"
        >
          {success}
        </span>
      )}
      {helperText && !error && !success && (
        <span className={styles['input-field__helper-text']}>{helperText}</span>
      )}
    </div>
  );
};

export default InputField;
