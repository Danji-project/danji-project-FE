import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";
import { validators } from "../../utils/validators";
import { usePendingStore } from "../../stores/usePendingStore";
import { useModalTextStore } from "../../stores/useModalText";
import Header from "../../layouts/Header";
import InputField from "../../components/common/input-field/InputField";
import ProfileImageEditor from "../../components/settings/ProfileImageEditor";
import TextModal from "../../components/common/text-modal/TextModal";
import styles from "./Settings.module.scss";

const Settings = () => {
  const { email, nickname, phone, name } = useUserInfo();
  const { getUserInfo } = useUserInfoMutation();
  const navigate = useNavigate();
  const { modalPending, setModalPending } = usePendingStore();
  const { setModalText, setModalTitle } = useModalTextStore();

  // 컴포넌트 마운트 시 사용자 정보가 없으면 가져오기
  useEffect(() => {
    if (!name && !nickname && !phone) {
      getUserInfo.mutate();
    }
  }, []);

  const [formData, setFormData] = useState(() => ({
    password: "",
    passwordConfirm: "",
    name: name || "",
    nickname: nickname || "",
    phoneNumber: phone || "",
  }));

  // userStore의 값이 로드되면 formData 초기화 (필드가 비어있을 때만)
  useEffect(() => {
    if (name || nickname || phone) {
      setFormData((prev) => {
        const updates: Partial<typeof formData> = {};

        // 필드가 비어있고 userStore에 값이 있으면 업데이트
        if (!prev.name && name) {
          updates.name = name;
        }
        if (!prev.nickname && nickname) {
          updates.nickname = nickname;
        }
        if (!prev.phoneNumber && phone) {
          updates.phoneNumber = phone;
        }

        // 업데이트할 값이 있을 때만 상태 업데이트
        return Object.keys(updates).length > 0 ? { ...prev, ...updates } : prev;
      });
    }
  }, [name, nickname, phone]);

  const [touched, setTouched] = useState({
    password: false,
    passwordConfirm: false,
    name: false,
    nickname: false,
    phoneNumber: false,
  });

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleBlur = (field: string) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호가 입력되지 않은 경우 password 필드를 제외하고 전송
    const updateData = {
      name: formData.name,
      nickname: formData.nickname,
      phoneNumber: formData.phoneNumber,
      ...(formData.password && { password: formData.password }),
    };

    // TODO: 프로필 업데이트 API 호출
    console.log("프로필 업데이트:", updateData);

    // 완료 모달 표시
    setModalTitle("프로필 수정");
    setModalText("완료되었습니다");
    setModalPending(true);
  };

  const handleModalConfirm = () => {
    setModalPending(false);
    setModalText("");
    navigate("/my-page");
  };

  const isFormValid = () => {
    // 이름 유효성 검사
    const isNameValid =
      !formData.name || validators(formData.name, "NAME_VALID") || false;
    // 전화번호 유효성 검사
    const isPhoneValid =
      !formData.phoneNumber ||
      validators(formData.phoneNumber, "PHONE_VALID") ||
      false;

    // 비밀번호가 입력된 경우에만 비밀번호 확인 필요
    if (formData.password) {
      return (
        formData.password.length >= 8 &&
        formData.password === formData.passwordConfirm &&
        isNameValid &&
        isPhoneValid
      );
    }
    return isNameValid && isPhoneValid;
  };

  return (
    <div className={styles.settings}>
      <Header title="프로필 수정" hasBackButton />
      <form onSubmit={handleSubmit} className={styles.settings__form}>
        {/* 프로필 이미지 */}
        <ProfileImageEditor />

        {/* 입력 필드들 */}
        <div className={styles.settings__fields}>
          {/* 아이디 (읽기 전용) */}
          <InputField
            label="아이디"
            placeholder=""
            className={styles.settings__input}
            type="text"
            name="email"
            value={email}
            onChange={() => {}}
            valid={true}
            touched={false}
            verified={true}
          />

          {/* 비밀번호 */}
          <InputField
            label="비밀번호"
            placeholder="영문, 숫자, 특수문자 포함 8~16자"
            className={styles.settings__input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            showPasswordToggle={true}
            valid={!formData.password || formData.password.length >= 8}
            error={
              touched.password &&
              formData.password &&
              formData.password.length < 8
                ? "8자 이상 입력해주세요"
                : ""
            }
            touched={touched.password}
            touches={handleBlur("password")}
          />

          {/* 비밀번호 확인 */}
          <InputField
            label="비밀번호 확인"
            placeholder="영문, 숫자, 특수문자 포함 8~16자"
            className={styles.settings__input}
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleInputChange("passwordConfirm")}
            showPasswordToggle={true}
            valid={
              !formData.password ||
              formData.password === formData.passwordConfirm
            }
            error={
              touched.passwordConfirm &&
              formData.password &&
              formData.password !== formData.passwordConfirm
                ? "비밀번호가 일치하지 않습니다"
                : ""
            }
            touched={touched.passwordConfirm}
            touches={handleBlur("passwordConfirm")}
          />

          {/* 이름 */}
          <InputField
            label="이름"
            placeholder="2-4자 이내로 입력해주세요"
            className={styles.settings__input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange("name")}
            valid={
              !formData.name || validators(formData.name, "NAME_VALID") || false
            }
            error={
              touched.name &&
              formData.name &&
              !validators(formData.name, "NAME_VALID")
                ? "이름은 2-4자 이내로 입력해주세요"
                : ""
            }
            touched={touched.name}
            touches={handleBlur("name")}
          />

          {/* 닉네임 */}
          <InputField
            label="닉네임"
            placeholder=""
            className={styles.settings__input}
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange("nickname")}
            touched={touched.nickname}
            touches={handleBlur("nickname")}
          />

          {/* 전화번호 */}
          <InputField
            label="전화번호"
            placeholder="'-' 없이 11자리 숫자만 입력"
            className={styles.settings__input}
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange("phoneNumber")}
            valid={
              !formData.phoneNumber ||
              validators(formData.phoneNumber, "PHONE_VALID") ||
              false
            }
            error={
              touched.phoneNumber &&
              formData.phoneNumber &&
              !validators(formData.phoneNumber, "PHONE_VALID")
                ? "'-' 없이 11자리 숫자만 입력해주세요"
                : ""
            }
            touched={touched.phoneNumber}
            touches={handleBlur("phoneNumber")}
          />
        </div>

        {/* 완료 버튼 */}
        <button
          type="submit"
          className={`${styles.settings__submit} ${
            isFormValid() ? styles.settings__submit__active : ""
          }`}
          disabled={!isFormValid()}
        >
          완료
        </button>
      </form>

      {/* 완료 모달 */}
      {modalPending && (
        <TextModal text="" usingConfirm={true} onConfirm={handleModalConfirm} />
      )}
    </div>
  );
};

export default Settings;
