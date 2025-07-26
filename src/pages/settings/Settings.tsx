import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";
import InputField from "../../components/input-filed/InputField";
import ProfileImageEditor from "../../components/profile-image-editor/ProfileImageEditor";
import styles from "./Settings.module.scss";

const CompleteButton = () => {
  return (
    <button className={styles["complete-button"]} disabled>
      완료
    </button>
  );
};

const AllSettings = () => {
  const handleImageChange = (file: File) => {
    console.log("새 이미지 파일:", file);
    // 여기서 이미지 업로드 로직 처리
  };

  return (
    <div className={styles["section"]}>
      <form>
        <div className={styles["section__content"]}>
          <ProfileImageEditor onImageChange={handleImageChange} size="large" />
          <InputField
            label="아이디"
            name="form-id"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={"아이디"}
            onChange={() => {}}
          />
          <InputField
            label="비밀번호"
            name="form-password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={"비밀번호"}
            onChange={() => {}}
          />
          <InputField
            label="비밀번호 확인"
            name="form-password-check"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={"비밀번호 확인"}
            onChange={() => {}}
          />
          <InputField
            label="이름"
            name="form-password-name"
            type="text"
            placeholder="이름을 입력해주세요"
            value={"이름"}
            onChange={() => {}}
          />
          <InputField
            label="닉네임"
            name="form-password-nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={"닉네임"}
            onChange={() => {}}
          />
          <InputField
            label="전화번호"
            name="form-password-phone"
            type="text"
            placeholder="핸드폰 번호를 입력해주세요"
            value={"01012341234"}
            onChange={() => {}}
          />
          <CompleteButton />
        </div>
      </form>
    </div>
  );
};

const Settings = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }
  }, [user.isLogin, navigate]);

  // 로그인하지 않은 사용자인 경우 아무것도 렌더링하지 않음
  if (!user.isLogin) {
    return null;
  }

  return (
    <div className={styles["settings"]}>
      <div className={styles["settings__content"]}>
        <AllSettings />
      </div>
    </div>
  );
};

export default Settings;
