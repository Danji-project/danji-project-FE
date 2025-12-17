import { useRef } from "react";
import { useUserInfo } from "../../stores/userStore";
import { useProfileImageUpload } from "../../hooks/useProfileImageUpload";
import styles from "./MyPageBox.module.scss";
import MyPageBoxSkeleton from "./MyPageBoxSkeleton";
import { useNavigate } from "react-router-dom";

const MyPageBox = () => {
  const { profileImage, nickname, email, isLogin } = useUserInfo();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { uploadProfileImage, uploadPending } = useProfileImageUpload();
  const navigate = useNavigate();

  console.log(nickname, email, profileImage);

  // 로그인하지 않았거나 정보가 아직 로드되지 않은 경우
  if (!isLogin || !nickname || !email) {
    return <MyPageBoxSkeleton />;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 프로필 이미지 업로드 및 전역 스토어 업데이트
      uploadProfileImage(file);
    }
    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className={styles["my__page__box"]}>
      <div className={styles["my__page__box__profile"]}>
        <img
          src={
            !profileImage ||
            profileImage === null ||
            profileImage === "/profile_imgSrc.jpg"
              ? "./profile_imgSrc.jpg"
              : "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                profileImage
          }
          alt="edit_profile"
        />
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploadPending}
        />
        <button
          onClick={() => {
            fileRef.current?.click();
          }}
          disabled={uploadPending}
        >
          <img src="/write.svg" alt="write" />
        </button>
      </div>
      <div className={styles["my__page__box__nickname"]}>{nickname}</div>
      <div className={styles["my__page__box__email"]}>{email}</div>
      <div className={styles["my__page__box__danji"]}>
        <div className={styles["my__page__box__danji__none"]}>
          <div className={styles["my__page__box__danji__none__box"]}>
            <img src={"/logo.svg"} alt="logo_danji" />
            <span>등록된 단지가 없습니다.</span>
          </div>
          <div className={styles["my__page__box__danji__none__button"]}>
            <button onClick={() => navigate("/apart-setting")}>
              단지 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageBox;
