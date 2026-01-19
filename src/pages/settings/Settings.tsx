import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import RegisterInput from "../../components/register-account/RegisterInput";
import { useUserInfoStore } from "../../stores/userStore";
import { useProfileUpdate } from "../../hooks/useProfileUpdate";
import { validators } from "../../utils/validators";
import styles from "./Settings.module.scss";

const Settings = () => {
  const navigate = useNavigate();
  const { data: userInfo } = useUserInfoStore();
  const { updateProfileOnly, updateProfilePending } = useProfileUpdate();

  const [formState, setFormState] = useState({
    email: {
      value: "",
      isError: false,
      valid: true,
      touched: false,
      errorMessage: "",
    },
    password: {
      value: "",
      isError: false,
      valid: true,
      touched: false,
      type: "password",
      errorMessage: "",
    },
    passwordConfirm: {
      value: "",
      isError: false,
      valid: true,
      touched: false,
      type: "password",
      errorMessage: "",
    },
    name: {
      value: "",
      isError: false,
      valid: true,
      touched: false,
      errorMessage: "",
    },
    nickname: {
      value: "",
      isError: false,
      valid: true,
      touched: false,
      errorMessage: "",
    },
    phone: {
      value: "",
      isError: false,
      valid: true,
      touched: false,
      errorMessage: "",
    },
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userInfo) {
      setFormState((prev) => ({
        ...prev,
        email: { ...prev.email, value: userInfo.email || "" },
        name: { ...prev.name, value: userInfo.name || "" },
        nickname: { ...prev.nickname, value: userInfo.nickname || "" },
        phone: { ...prev.phone, value: userInfo.phoneNumber || "" },
      }));
      setImagePreview(
        userInfo.fileId
          ? "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" + userInfo.fileId
          : "/profile_imgSrc.jpg"
      );
    }
  }, [userInfo]);

  const handleChange = (field: keyof typeof formState, value: string) => {
    let isValid = true;
    let errorMessage = "";

    if (field === "email") {
      isValid = validators(value, "EMAIL_VALID") || false;
      errorMessage = isValid ? "" : "이메일 형식이 올바르지 않습니다.";
    } else if (field === "password") {
      if (value === "") {
        isValid = true; // 비워두면 수정 안 함
      } else {
        isValid = validators(value, "PASSWORD_VALID") || false;
        errorMessage = isValid ? "" : "8 ~ 16자의 영문, 숫자, 특수문자를 포함시켜 주세요.";
      }
    } else if (field === "passwordConfirm") {
      isValid = validators(value, "PASSWORD_CONFIRM_VALID", formState.password.value) || false;
      errorMessage = isValid ? "" : "비밀번호와 일치하지 않습니다.";
    } else if (field === "name") {
      isValid = validators(value, "NAME_VALID") || false;
      errorMessage = isValid ? "" : "이름은 4자 이내로 입력해주세요.";
    } else if (field === "nickname") {
      isValid = validators(value, "NICKNAME_VALID") || false;
      errorMessage = isValid ? "" : "닉네임은 4자 이내로 입력해주세요.";
    } else if (field === "phone") {
      isValid = validators(value, "PHONE_VALID") || false;
      errorMessage = isValid ? "" : "전화번호 11자리를 '-' 없이 입력해주세요.";
    }

    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        valid: isValid,
        isError: !isValid,
        errorMessage,
      },
    }));
  };

  const handleTouch = (field: keyof typeof formState) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { ...prev[field], touched: true },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updateProfilePending) return;

    // 실제 API 호출 (updateProfileOnly 사용)
    // 현재 updateProfileOnly는 password 수정을 지원하지 않을 수 있으나 
    // 유저의 요청에 따라 UI를 구현하고 profileUpdate를 호출합니다.
    updateProfileOnly.mutate({
      name: formState.name.value,
      nickname: formState.nickname.value,
      phoneNumber: formState.phone.value,
      password: formState.password.value || undefined,
      file: profileImage,
    }, {
      onSuccess: () => {
        alert("프로필이 수정되었습니다.");
        navigate("/my-page");
      }
    });
  };

  const isFormValid =
    formState.email.valid &&
    formState.name.valid &&
    formState.nickname.valid &&
    formState.phone.valid &&
    ((formState.password.value === "" && formState.passwordConfirm.value === "") ||
      (formState.password.value !== "" && formState.password.valid && formState.passwordConfirm.valid));

  return (
    <div className={styles["settings"]}>
      <Header title="프로필 수정" hasBackButton />
      <form className={styles["settings__form"]} onSubmit={handleSubmit}>
        <div className={styles["settings__profile"]}>
          <div className={styles["settings__profile__image"]}>
            <img src={imagePreview} alt="user profile" />
          </div>
          <div
            className={styles["settings__profile__button"]}
            onClick={() => fileInputRef.current?.click()}
          >
            <img src="/icons/write.svg" alt="edit profile" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className={styles["settings__fields"]}>
          <RegisterInput
            label="아이디"
            placeholder="이메일을 입력해주세요."
            type="text"
            className="email"
            htmlForId="email"
            value={formState.email.value}
            onChangeEvent={(e) => handleChange("email", e.target.value)}
            onTouch={() => handleTouch("email")}
            isTouched={formState.email.touched}
            isError={formState.email.isError}
            isValid={formState.email.valid}
            errorMessage={formState.email.errorMessage}
          />

          <RegisterInput
            label="비밀번호"
            placeholder="변경할 비밀번호를 입력해주세요."
            type={formState.password.type}
            className="password"
            htmlForId="password"
            value={formState.password.value}
            onChangeEvent={(e) => handleChange("password", e.target.value)}
            onTouch={() => handleTouch("password")}
            isTouched={formState.password.touched}
            isError={formState.password.isError}
            isValid={formState.password.valid}
            errorMessage={formState.password.errorMessage}
            isPasswordButton
            passwordTypeChange={(type) => setFormState(prev => ({ ...prev, password: { ...prev.password, type } }))}
          />

          <RegisterInput
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요."
            type={formState.passwordConfirm.type}
            className="password__confirm"
            htmlForId="passwordConfirm"
            value={formState.passwordConfirm.value}
            onChangeEvent={(e) => handleChange("passwordConfirm", e.target.value)}
            onTouch={() => handleTouch("passwordConfirm")}
            isTouched={formState.passwordConfirm.touched}
            isError={formState.passwordConfirm.isError}
            isValid={formState.passwordConfirm.valid}
            errorMessage={formState.passwordConfirm.errorMessage}
            isPasswordButton
            passwordTypeChange={(type) => setFormState(prev => ({ ...prev, passwordConfirm: { ...prev.passwordConfirm, type } }))}
          />

          <RegisterInput
            label="이름"
            placeholder="이름을 입력해주세요."
            type="text"
            className="name"
            htmlForId="name"
            value={formState.name.value}
            onChangeEvent={(e) => handleChange("name", e.target.value)}
            onTouch={() => handleTouch("name")}
            isTouched={formState.name.touched}
            isError={formState.name.isError}
            isValid={formState.name.valid}
            errorMessage={formState.name.errorMessage}
          />

          <RegisterInput
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            type="text"
            className="nickname"
            htmlForId="nickname"
            value={formState.nickname.value}
            onChangeEvent={(e) => handleChange("nickname", e.target.value)}
            onTouch={() => handleTouch("nickname")}
            isTouched={formState.nickname.touched}
            isError={formState.nickname.isError}
            isValid={formState.nickname.valid}
            errorMessage={formState.nickname.errorMessage}
          />

          <RegisterInput
            label="전화번호"
            placeholder="'-'를 제외하고 입력해주세요."
            type="text"
            className="phone"
            htmlForId="phone"
            value={formState.phone.value}
            onChangeEvent={(e) => handleChange("phone", e.target.value)}
            onTouch={() => handleTouch("phone")}
            isTouched={formState.phone.touched}
            isError={formState.phone.isError}
            isValid={formState.phone.valid}
            errorMessage={formState.phone.errorMessage}
          />
        </div>

        <button
          type="submit"
          className={`${styles["settings__submit"]} ${isFormValid ? styles["settings__submit__active"] : ""}`}
          disabled={!isFormValid || updateProfilePending}
        >
          {updateProfilePending ? "저장 중..." : "저장하기"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
