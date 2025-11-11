import { useReducer } from "react";
import styles from "./RegisterAccountBodies.module.scss";
import RegisterInput from "./RegisterInput";
import { validators } from "../../utils/validators";
import { usePendingStore } from "../../stores/usePendingStore";
import TextModal from "../common/text-modal/TextModal";
import { useModalTextStore } from "../../stores/useModalText";
import { useSendValidation } from "../../hooks/useSendValidation";
import { useRegister } from "../../hooks/useRegister";
import { useCertifyInfo } from "../../stores/useCertifyInfo";

interface Action {
  type: string;
  payload?: { data?: string; export?: string; confirmed?: boolean };
}

interface State {
  email: SecondState;
  validationCode: SecondState;
  password: SecondState;
  passwordConfirm: SecondState;
  name: SecondState;
  nickname: SecondState;
  phone: SecondState;
}

interface SecondState {
  value: string;
  isError: boolean;
  valid: boolean;
  touched: boolean;
  type?: string;
  errorMessage: string;
  isConfirmed?: boolean;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "EMAIL_CHANGE":
      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload!.data!,
          valid: validators(action.payload!.data!, "EMAIL_VALID")!,
          isError: !validators(action.payload!.data!, "EMAIL_VALID")!,
          errorMessage: !validators(action.payload!.data!, "EMAIL_VALID")!
            ? "이메일을 4 ~ 15자 이내로 입력해주세요."
            : "",
        },
      };
    case "EMAIL_TOUCHED":
      return {
        ...state,
        email: {
          ...state.email,
          touched: true,
        },
      };
    case "CHANGE_VALIDATION":
      return {
        ...state,
        validationCode: {
          ...state.validationCode,
          value: action.payload!.data!,
          valid: validators(action.payload!.data!, "VALIDATION_CODE_VALID")!,
          isError: !validators(action.payload!.data!, "VALIDATION_CODE_VALID")!,
          errorMessage: !validators(
            action.payload!.data!,
            "VALIDATION_CODE_VALID"
          )!
            ? "인증 번호는 6글자로 입력해야 합니다."
            : "",
        },
      };
    case "VALIDATION_CODE_TOUCHED":
      return {
        ...state,
        validationCode: { ...state.validationCode, touched: true },
      };
    case "VERIFY_CONFIRMED_TRUE":
      return {
        ...state,
        email: {
          ...state.email,
          isConfirmed: action.payload?.confirmed!,
        },
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        password: {
          ...state.password,
          value: action.payload!.data!,
          valid: validators(action.payload!.data!, "PASSWORD_VALID")!,
          isError: !validators(action.payload!.data!, "PASSWORD_VALID")!,
          errorMessage: !validators(action.payload!.data!, "PASSWORD_VALID")
            ? "8 ~ 16자의 영문, 숫자, 특수문자를 포함시켜 주세요."
            : "",
        },
      };
    case "TOUCH_PASSWORD":
      return {
        ...state,
        password: {
          ...state.password,
          touched: true,
        },
      };
    case "PASSWORD_TYPE_EXPORT":
      return {
        ...state,
        password: {
          ...state.password,
          type: action.payload?.export!,
        },
      };
    case "CHANGE_PASSWORD_CONFIRM":
      return {
        ...state,
        passwordConfirm: {
          ...state.passwordConfirm,
          value: action.payload?.data!,
          valid: validators(
            action.payload?.data!,
            "PASSWORD_CONFIRM_VALID",
            state.password.value
          )!,
          isError: !validators(
            action.payload?.data!,
            "PASSWORD_CONFIRM_VALID",
            state.password.value
          )!,
          errorMessage: !validators(
            action.payload?.data!,
            "PASSWORD_CONFIRM_VALID",
            state.password.value
          )
            ? "비밀번호와 일치하지 않습니다"
            : "",
        },
      };
    case "TOUCH_PASSWORD_CONFIRM":
      return {
        ...state,
        passwordConfirm: {
          ...state.passwordConfirm,
          touched: true,
        },
      };
    case "PASSWORD_CONFIRM_TYPE_EXPORT":
      return {
        ...state,
        passwordConfirm: {
          ...state.passwordConfirm,
          type: action.payload?.export!,
        },
      };
    case "CHANGE_NAME":
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload?.data!,
          valid: validators(action.payload?.data!, "NAME_VALID")!,
          isError: !validators(action.payload?.data!, "NAME_VALID")!,
          errorMessage: !validators(action.payload?.data!, "NAME_VALID")
            ? "이름을 제대로 입력해주세요"
            : "",
        },
      };
    case "TOUCH_NAME":
      return {
        ...state,
        name: {
          ...state.name,
          touched: true,
        },
      };
    case "CHANGE_NICKNAME":
      return {
        ...state,
        nickname: {
          ...state.nickname,
          value: action.payload!.data!,
          valid: validators(action.payload!.data!, "NICKNAME_VALID")!,
          isError: !validators(action.payload!.data!, "NICKNAME_VALID")!,
          errorMessage: !validators(action.payload!.data!, "NICKNAME_VALID")
            ? "닉네임을 제대로 입력해주세요"
            : "",
        },
      };
    case "TOUCH_NICKNAME":
      return {
        ...state,
        nickname: {
          ...state.nickname,
          touched: true,
        },
      };
    case "CHANGE_PHONE":
      return {
        ...state,
        phone: {
          ...state.phone,
          value: action.payload?.data!,
          valid: validators(action.payload?.data!, "PHONE_VALID")!,
          isError: !validators(action.payload?.data!, "PHONE_VALID"),
          errorMessage: !validators(action.payload?.data!, "PHONE_VALID")
            ? "핸드폰 번호를 제대로 입력해주세요"
            : "",
        },
      };
    case "TOUCH_PHONE":
      return {
        ...state,
        phone: {
          ...state.phone,
          touched: true,
        },
      };
    default:
      return state;
  }
};

const initialState = {
  email: {
    value: "",
    isError: false,
    valid: false,
    touched: false,
    errorMessage: "",
    isNestOk: false,
    isConfirmed: false,
  },
  validationCode: {
    value: "",
    isError: false,
    valid: false,
    touched: false,
    errorMessage: "",
  },
  password: {
    value: "",
    isError: false,
    valid: false,
    touched: false,
    type: "password",
    errorMessage: "",
  },
  passwordConfirm: {
    value: "",
    isError: false,
    valid: false,
    touched: false,
    type: "password",
    errorMessage: "",
  },
  name: {
    value: "",
    isError: false,
    valid: false,
    touched: false,
    errorMessage: "",
  },
  nickname: {
    value: "",
    isError: false,
    valid: false,
    touched: false,
    errorMessage: "",
  },
  phone: {
    value: "",
    isError: false,
    valid: false,
    touched: false,
    errorMessage: "",
  },
};

const RegisterAccountBodies = () => {
  const [registerState, dispatch] = useReducer(reducer, initialState);

  const { modalPending, setModalPending } = usePendingStore();
  const {
    modalText,
    setModalTitle,
    setModalText,
    isOnlyConfirmed,
    setIsOnlyConfirmed,
  } = useModalTextStore();

  const { isNest, setIsNest } = useCertifyInfo();

  const {
    sendValidationMutation,
    receivedValidationMutation,
    failedErrorMessage,
  } = useSendValidation(registerState.email.value);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "EMAIL_CHANGE", payload: { data: e.target.value } });
  };

  const changeValidationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_VALIDATION", payload: { data: e.target.value } });
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_PASSWORD", payload: { data: e.target.value } });
  };

  const changePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_PASSWORD_CONFIRM",
      payload: { data: e.target.value },
    });
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_NAME", payload: { data: e.target.value } });
  };

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_NICKNAME", payload: { data: e.target.value } });
  };

  const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "CHANGE_PHONE", payload: { data: e.target.value } });
  };

  const touchEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "EMAIL_TOUCHED", payload: { data: e.target.value } });
  };

  const touchValidationCode = () => {
    dispatch({ type: "VALIDATION_CODE_TOUCHED" });
  };

  const touchPassword = () => {
    dispatch({ type: "TOUCH_PASSWORD" });
  };

  const touchPasswordConfirm = () => {
    dispatch({ type: "TOUCH_PASSWORD_CONFIRM" });
  };

  const touchName = () => {
    dispatch({ type: "TOUCH_NAME" });
  };

  const touchNickname = () => {
    dispatch({ type: "TOUCH_NICKNAME" });
  };

  const touchPhone = () => {
    dispatch({ type: "TOUCH_PHONE" });
  };

  const passwordTypeChange = (exports: string) => {
    dispatch({ type: "PASSWORD_TYPE_EXPORT", payload: { export: exports } });
  };

  const passwordConfirmTypeChange = (exports: string) => {
    dispatch({
      type: "PASSWORD_CONFIRM_TYPE_EXPORT",
      payload: { export: exports },
    });
  };

  const emailDisabled =
    !registerState.email.value ||
    !registerState.email.valid ||
    registerState.email.isError ||
    !isNest ||
    !registerState.email.isConfirmed;

  const passwordDisabled =
    !registerState.password.value ||
    !registerState.password.valid ||
    registerState.password.isError;

  const passwordConfirmDisabled =
    !registerState.passwordConfirm.value ||
    !registerState.passwordConfirm.valid ||
    registerState.passwordConfirm.isError;

  const nameDisabled =
    !registerState.name.value ||
    !registerState.name.valid ||
    registerState.name.isError;

  const nicknameDisabled =
    !registerState.nickname.value ||
    !registerState.nickname.valid ||
    registerState.nickname.isError;

  const phoneDisabled =
    !registerState.phone.value ||
    !registerState.phone.valid ||
    registerState.phone.isError;

  const allDisabled =
    emailDisabled ||
    passwordDisabled ||
    passwordConfirmDisabled ||
    nameDisabled ||
    nicknameDisabled ||
    phoneDisabled;

  const { registerMutation } = useRegister();

  const joinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({
      email: registerState.email.value,
      password: registerState.password.value,
      name: registerState.name.value,
      nickname: registerState.nickname.value,
      phoneNumber: registerState.phone.value,
    });
  };

  return (
    <form onSubmit={joinSubmit}>
      <div className={styles["register__account__bodies"]}>
        <RegisterInput
          label="이메일"
          placeholder="4 ~ 15자 이내로 입력해주세요."
          type="text"
          htmlForId="email-for"
          className="email"
          isConfirm={isOnlyConfirmed}
          onChangeEvent={changeEmail}
          value={registerState.email.value}
          isTouched={registerState.email.touched}
          isError={registerState.email.isError}
          isValid={registerState.email.valid}
          isNested={isNest}
          errorMessage={registerState.email.errorMessage}
          onTouch={touchEmail}
        />
        {modalPending && (
          <TextModal
            text={modalText}
            usingConfirm={isOnlyConfirmed}
            onCancel={() => {
              setModalPending(false);
              setModalText("");
              setIsOnlyConfirmed(true);
              setIsNest(false);
            }}
            onSend={() => {
              sendValidationMutation.mutate({
                type: "SIGN_UP",
              });
            }}
            onConfirm={() => {
              dispatch({
                type: "VERIFY_CONFIRMED_TRUE",
                payload: { confirmed: true },
              });
            }}
          />
        )}
        {isNest && (
          <RegisterInput
            label="인증번호 입력"
            placeholder="인증번호를 입력해주세요"
            type="text"
            htmlForId="validationFor"
            className="validation"
            onChangeEvent={changeValidationCode}
            value={registerState.validationCode.value}
            isTouched={registerState.validationCode.touched}
            isError={registerState.validationCode.isError}
            isValid={registerState.validationCode.valid}
            errorMessage={registerState.validationCode.errorMessage}
            onTouch={touchValidationCode}
            isValidation
            onCertify={() => {
              receivedValidationMutation.mutate({
                code: registerState.validationCode.value,
              });
              setModalTitle("인증하기");
            }}
            failedMessage={failedErrorMessage}
            isCertifyConfirmed={registerState.email.isConfirmed}
          />
        )}
        <RegisterInput
          label="비밀번호"
          placeholder="영문,숫자,특수문자 포함 8 ~ 16자"
          type={registerState.password.type!}
          htmlForId="passwordFor"
          className="password"
          onChangeEvent={changePassword}
          value={registerState.password.value}
          isTouched={registerState.password.touched}
          isError={registerState.password.isError}
          isValid={registerState.password.valid}
          errorMessage={registerState.password.errorMessage}
          onTouch={touchPassword}
          isPasswordButton
          passwordTypeChange={passwordTypeChange}
        />
        <RegisterInput
          label="비밀번호 확인"
          placeholder="영문,숫자,특수문자 포함 8 ~ 16자"
          type={registerState.passwordConfirm.type!}
          htmlForId="passwordConfirmFor"
          className="password__confirm"
          onChangeEvent={changePasswordConfirm}
          value={registerState.passwordConfirm.value}
          isTouched={registerState.passwordConfirm.touched}
          isError={registerState.passwordConfirm.isError}
          isValid={registerState.passwordConfirm.valid}
          errorMessage={registerState.passwordConfirm.errorMessage}
          onTouch={touchPasswordConfirm}
          isPasswordButton
          passwordTypeChange={passwordConfirmTypeChange}
        />
        <RegisterInput
          label="이름"
          placeholder="이름을 입력해주세요."
          type="text"
          htmlForId={"nameFor"}
          className="name"
          onChangeEvent={changeName}
          value={registerState.name.value}
          isTouched={registerState.name.touched}
          isError={registerState.name.isError}
          isValid={registerState.name.valid}
          errorMessage={registerState.name.errorMessage}
          onTouch={touchName}
        />
        <RegisterInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          type="text"
          htmlForId="nicknameFor"
          className="nickname"
          onChangeEvent={changeNickname}
          value={registerState.nickname.value}
          isTouched={registerState.nickname.touched}
          isError={registerState.nickname.isError}
          isValid={registerState.nickname.valid}
          errorMessage={registerState.nickname.errorMessage}
          onTouch={touchNickname}
        />
        <RegisterInput
          label="전화번호"
          placeholder="- 제외 11자리를 입력해주세요"
          type="text"
          htmlForId="phoneFor"
          className="phone"
          onChangeEvent={changePhone}
          value={registerState.phone.value}
          isTouched={registerState.phone.touched}
          isError={registerState.phone.isError}
          errorMessage={registerState.phone.errorMessage}
          isValid={registerState.phone.valid}
          onTouch={touchPhone}
        />
        <button type="submit" disabled={allDisabled}>
          회원가입
        </button>
      </div>
    </form>
  );
};

export default RegisterAccountBodies;
