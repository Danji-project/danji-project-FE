import { useRef } from "react";
import { useUserInfo } from "../../stores/userStore";
import styles from "./MyPageBox.module.scss";

const MyPageBox = () => {
  const { profileImage, nickname, email } = useUserInfo();
  const fileRef = useRef<HTMLInputElement | null>(null);

  console.log(nickname, email, profileImage);

  return (
    <div className={styles["my__page__box"]}>
      <div className={styles["my__page__box__profile"]}>
        <img
          src={
            profileImage === "/profile_imgSrc.jpg"
              ? profileImage
              : "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                profileImage
          }
          alt="edit_profile"
        />
        <input type="file" ref={fileRef} />
        <button
          onClick={() => {
            fileRef.current?.click();
          }}
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
            <button>단지 등록하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageBox;
