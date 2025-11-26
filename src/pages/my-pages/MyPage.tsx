import MyPageBox from "../../components/my-page-box/MyPageBox";
import styles from "./MyPage.module.scss";

const MyPage = () => {
  return (
    <div className={styles["mypage__wrapper"]}>
      <MyPageBox />
    </div>
  );
};

export default MyPage;
