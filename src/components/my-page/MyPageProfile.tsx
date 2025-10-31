import { useRef } from "react";
import styles from "./MyPageProfile.module.scss";
import { useUserInfo } from "../../stores/userStore";

const MyPageProfile = ({
  email,
  name,
  nickname,
  profileImage,
  password,
  phoneNumber,
}: {
  email: string;
  name: string;
  nickname: string;
  profileImage: string;
  password: string;
  phoneNumber: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isUploading } = useUserInfo();

  return (
    <div className={styles["mypage__profile"]}>
      <div
        className={`${styles["mypage__profile__images"]} ${
          isUploading ? styles["mypage__profile__file__input__uploading"] : ""
        }`}
      >
        <img src={profileImage} alt="profile__image" />
        <div className={`${styles["mypage__profile__file__input"]}`}>
          <input type="file" ref={fileInputRef} onChange={() => {}} />
          <button
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <img src={"/icons/edit.svg"} alt="edit" />
          </button>
        </div>
      </div>
      <div className={styles["mypage__profile__info"]}>
        <span>
          {name && nickname
            ? name + "(" + nickname + ")"
            : "닉네임이 설정되어 있지 않습니다."}
        </span>
        <span>{email ? email : "이메일이 설정되어 있지 않습니다."}</span>
      </div>
    </div>
  );
};

export default MyPageProfile;
