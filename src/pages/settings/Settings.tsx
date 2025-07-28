import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";
import { useProfileImageUpload } from "../../hooks/useFileUpload";
import InputField from "../../components/input-filed/InputField";
import ProfileImageEditor from "../../components/profile-image-editor/ProfileImageEditor";
import { useAlertStore } from "../../stores/alertStore";
import styles from "./Settings.module.scss";

interface FormData {
  name: string;
  nickname: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}

const Settings = () => {
  const navigate = useNavigate();
  const user = useUserInfo();
  const { executeUserInfoMutation, isPending: isLoadingUserInfo } =
    useUserInfoMutation();
  const { updateFullProfile, isUploading, uploadError, resetUploadState } =
    useProfileImageUpload();
  const { setTitle, setContent, openAlert } = useAlertStore();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    nickname: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  });

  // 초기값 저장 (변경 감지용)
  const [initialData, setInitialData] = useState<FormData>({
    name: "",
    nickname: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }
  }, [user.isLogin, navigate]);

  // 페이지 로드 시 사용자 정보 조회
  useEffect(() => {
    console.log("user.isLogin", user.isLogin);
    if (user.isLogin) {
      executeUserInfoMutation();
    }
  }, [user.isLogin]);

  // 사용자 정보가 로드되면 폼 데이터를 기존 값으로 설정
  useEffect(() => {
    // 사용자 정보가 있으면 폼에 기존 값들을 설정
    console.log("사용자 정보 확인:", {
      name: user.name,
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
      isLoadingUserInfo,
    });

    const userData = {
      name: user.name || "",
      nickname: user.nickname || "",
      phoneNumber: user.phoneNumber || "",
      password: "",
      passwordConfirm: "",
    };

    setFormData(userData);
    setInitialData(userData); // 초기값도 함께 설정
  }, [user.name, user.nickname, user.phoneNumber]);

  // 업로드 에러 처리
  useEffect(() => {
    if (uploadError) {
      setTitle("오류");
      setContent(uploadError);
      openAlert();
      resetUploadState();
    }
  }, [uploadError, setTitle, setContent, openAlert, resetUploadState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    setSelectedImage(file);
  };

  // 변경사항 감지 함수
  const hasChanges = (): boolean => {
    // 기본 정보 변경 확인
    const dataChanged =
      formData.name !== initialData.name ||
      formData.nickname !== initialData.nickname ||
      formData.phoneNumber !== initialData.phoneNumber ||
      formData.password !== "" ||
      formData.passwordConfirm !== "";

    // 이미지 변경 확인
    const imageChanged = selectedImage !== null;

    return dataChanged || imageChanged;
  };

  const validateForm = (): boolean => {
    // 필수 필드 검증
    if (!formData.name.trim()) {
      setTitle("입력 오류");
      setContent("이름을 입력해주세요.");
      openAlert();
      return false;
    }

    if (!formData.nickname.trim()) {
      setTitle("입력 오류");
      setContent("닉네임을 입력해주세요.");
      openAlert();
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      setTitle("입력 오류");
      setContent("전화번호를 입력해주세요.");
      openAlert();
      return false;
    }

    // 비밀번호 검증 (비밀번호를 입력한 경우에만)
    if (formData.password || formData.passwordConfirm) {
      if (formData.password !== formData.passwordConfirm) {
        setTitle("입력 오류");
        setContent("비밀번호가 일치하지 않습니다.");
        openAlert();
        return false;
      }

      if (formData.password.length < 6) {
        setTitle("입력 오류");
        setContent("비밀번호는 6자 이상이어야 합니다.");
        openAlert();
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // API 요청 데이터 준비 (password가 없으면 제외)
      const requestData: {
        name: string;
        nickname: string;
        phoneNumber: string;
        password?: string;
      } = {
        name: formData.name.trim(),
        nickname: formData.nickname.trim(),
        phoneNumber: formData.phoneNumber.trim(),
      };

      // 비밀번호가 입력된 경우에만 포함
      if (formData.password) {
        requestData.password = formData.password;
      }

      await updateFullProfile(requestData, selectedImage || undefined);

      setTitle("성공");
      setContent("프로필이 성공적으로 수정되었습니다.");
      openAlert();

      // 성공 후 초기값 업데이트 (비밀번호는 빈 값으로)
      const updatedData = {
        name: formData.name,
        nickname: formData.nickname,
        phoneNumber: formData.phoneNumber,
        password: "",
        passwordConfirm: "",
      };

      setFormData(updatedData);
      setInitialData(updatedData);
      setSelectedImage(null);
    } catch (error) {
      console.error("Profile update failed:", error);
      setTitle("오류");
      setContent("프로필 수정 중 오류가 발생했습니다.");
      openAlert();
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로그인하지 않은 사용자인 경우 아무것도 렌더링하지 않음
  if (!user.isLogin) {
    return null;
  }

  const isLoading = isLoadingUserInfo || isUploading || isSubmitting;

  return (
    <div className={styles["settings"]}>
      <div className={styles["settings__content"]}>
        <div className={styles["section"]}>
          <form onSubmit={handleSubmit}>
            <div className={styles["section__content"]}>
              <ProfileImageEditor
                onImageChange={handleImageChange}
                size="large"
              />

              <InputField
                label="아이디 (이메일)"
                name="email"
                type="email"
                placeholder="이메일"
                value={user.email || ""}
                onChange={() => {}} // 읽기 전용
                disabled
              />

              <InputField
                label="비밀번호"
                name="password"
                type="password"
                placeholder="새 비밀번호 (변경하지 않으려면 비워두세요)"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />

              <InputField
                label="비밀번호 확인"
                name="passwordConfirm"
                type="password"
                placeholder="새 비밀번호 확인"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                disabled={isLoading}
              />

              <InputField
                label="이름"
                name="name"
                type="text"
                placeholder="이름을 입력해주세요"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
              />

              <InputField
                label="닉네임"
                name="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                value={formData.nickname}
                onChange={handleInputChange}
                disabled={isLoading}
              />

              <InputField
                label="전화번호"
                name="phoneNumber"
                type="text"
                placeholder="핸드폰 번호를 입력해주세요"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={isLoading}
              />

              <button
                type="submit"
                className={styles["complete-button"]}
                disabled={isLoading || !hasChanges()}
              >
                {isLoading ? "처리 중..." : "완료"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
