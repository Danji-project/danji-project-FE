import MyPageProfile from "../../components/my-page/MyPageProfile";
import { useUserInfo } from "../../stores/userStore";
import styles from "./MyPage.module.scss";

const MyPage = () => {
  const { email, name, nickname, profileImage, password, phoneNumber } =
    useUserInfo();

  return (
    <div className={styles["mypage__wrapper"]}>
      <MyPageProfile
        name={name!}
        email={email}
        nickname={nickname!}
        profileImage={profileImage}
        password={password!}
        phoneNumber={phoneNumber!}
      />
    </div>
  );
};

export default MyPage;
