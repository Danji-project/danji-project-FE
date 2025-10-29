import { useReducer, useState } from "react";
import styles from "./RegisterAccountBodies.module.scss";
import RegisterInput from "./RegisterInput";
import { validators } from "../../utils/validators";
import { usePendingStore } from "../../stores/usePendingStore";
import TextModal from "../common/text-modal/TextModal";
import { useModalTextStore } from "../../stores/useModalText";
import { useSendValidation } from "../../hooks/useSendValidation";

interface Action {
  type: string;
  payload?: { data?: string };
}

interface State {
  email: SecondState;
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
  errorMessage: string;
  isNestOk?: boolean;
  isConfirmed?: boolean;
}

const RegisterAccountBodies = () => {
  const { modalPending, setModalPending } = usePendingStore();
  const { modalText, setModalText } = useModalTextStore();

  const [isConfirmed, setIsConfirmed] = useState(true);

  const emailNestCheck = () => {
    dispatch({ type: "CHANGE_NEST" });
  };

  const { sendValidationMutation } = useSendValidation(
    emailNestCheck,
    setIsConfirmed
  );

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
      case "CHANGE_NEST":
        return {
          ...state,
          email: {
            ...state.email,
            isNestOk: true,
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
    password: {
      value: "",
      isError: false,
      valid: false,
      touched: false,
      errorMessage: "",
    },
    passwordConfirm: {
      value: "",
      isError: false,
      valid: false,
      touched: false,
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

  const [registerState, dispatch] = useReducer(reducer, initialState);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "EMAIL_CHANGE", payload: { data: e.target.value } });
  };

  const touchEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "EMAIL_TOUCHED", payload: { data: e.target.value } });
  };

  return (
    <form>
      <div className={styles["register__account__bodies"]}>
        <RegisterInput
          label="이메일"
          placeholder="4 ~ 15자 이내로 입력해주세요."
          type="text"
          htmlForId="email-for"
          className="email"
          isConfirm={isConfirmed}
          onChangeEvent={changeEmail}
          value={registerState.email.value}
          isTouched={registerState.email.touched}
          isError={registerState.email.isError}
          isValid={registerState.email.valid}
          isNested={registerState.email.isNestOk}
          errorMessage={registerState.email.errorMessage}
          onTouch={touchEmail}
        />
        {modalPending && (
          <TextModal
            text={modalText}
            usingConfirm
            onCancel={() => {
              setModalPending(false);
              setModalText("");
            }}
            onSend={() => {
              sendValidationMutation.mutate(registerState.email.value);
            }}
          />
        )}
      </div>
    </form>
  );
};

export default RegisterAccountBodies;
