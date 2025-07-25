import styles from "./MyPage.module.scss";

const ProfileInfo = () => {
  return (
    <div className={styles["my__page__profile__info"]}>
      <div className={styles["my__page__img__wrapper"]}>
        <div className={styles["my__page__profile__img"]}>
          <img src={"/profile_imgSrc.jpg"} alt="profile" />
        </div>
        <button
          type="button"
          className={styles["my__page__profile__img__button"]}
        >
          <img src={"/write.svg"} alt="write" />
        </button>
      </div>
      <div className={styles["my__page__profile__info__text"]}>
        <h1 className={styles["my__page__profile__info__text__name"]}>
          김단지(단지최고)
        </h1>
        <h2 className={styles["my__page__profile__info__text__email"]}>
          danjitalk@danji.com
        </h2>
      </div>
    </div>
  );
};

const AgitMenu = () => {
  return (
    <div className={styles["my__page__agit"]}>
      <h1 className={styles["my__page__agit__title"]}>단지님의 아지트</h1>
    </div>
  );
};

const MyPage = () => {
  return (
    <div className={styles["my__page"]}>
      <ProfileInfo />
      <AgitMenu />
    </div>
  );
};

export default MyPage;
