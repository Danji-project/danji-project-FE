import MyPageProfile from "../../components/my-page/MyPageProfile";
import { useUserInfo } from "../../stores/userStore";
import styles from "./MyPage.module.scss";

const MyPage = () => {
  const { email, name, nickname, profileImage } = useUserInfo();

  console.log(name);

  return (
    <div className={styles["mypage__wrapper"]}>
      <MyPageProfile
        name={name!}
        email={email}
        nickname={nickname!}
        profileImage={profileImage}
      />
    </div>
  );
};

export default MyPage;
