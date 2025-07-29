import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";

import LogoIcon from "../../assets/logo.svg";

import styles from "./MyPage.module.scss";
// 프로필 섹션
const ProfileSection = () => {
  const user = useUserInfo();

  return (
    <div className={styles["profile"]}>
      <div className={styles["profile__avatar-container"]}>
        <div className={styles["profile__avatar"]}>
          <img
            src="/profile_imgSrc.jpg"
            alt="프로필"
            className={styles["profile__image"]}
          />
        </div>
        <button className={styles["profile__edit-btn"]}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className={styles["profile__info"]}>
        <h2 className={styles["profile__name"]}>{user.name}({user.nickname})</h2>
        <p className={styles["profile__email"]}>{user.email}</p>
      </div>
    </div>
  );
};

// 아파트 정보 섹션
const ApartmentSection = () => {
  const user = useUserInfo();
  return (
    <>
      {
        user.apartmentID == null?
        <div className={styles["non-apartment"]}>
          <div className={styles["non-apartment__card"]}>
            <img src={LogoIcon} />
            <p>등록된 단지가 없습니다.</p>
          </div>
          <div className={styles["non-apartment__div-btn"]}>
            <button className={`${styles["apartment__btn"]} ${styles["apartment__btn--unregister"]}`}>단지 등록</button>
          </div>
        </div>
        :
        <div className={styles["apartment"]}>
          <div className={styles["apartment__header"]}>
            <h3 className={styles["apartment__title"]}>{user.nickname}의 아파트</h3>
            <button className={styles["apartment__edit-btn"]}>수정</button>
          </div>

          <div className={styles["apartment__card"]}>
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=120&fit=crop"
              alt="아파트"
              className={styles["apartment__image"]}
            />
            <div className={styles["apartment__info"]}>
              <h4 className={styles["apartment__name"]}>{user.apartmentName}</h4>
              <p className={styles["apartment__address"]}>{user.location}</p>
              <p className={styles["apartment__unit"]}>{user.uint}</p>
            </div>
          </div>

          <div className={styles["apartment__actions"]}>
            <button
              className={`${styles["apartment__btn"]} ${styles["apartment__btn--unregister"]}`}>
              등록해제
            </button>
            <button
              className={`${styles["apartment__btn"]} ${styles["apartment__btn--goto"]}`}>
              바로가기
            </button>
          </div>
        </div>
      }
    </>
  );
};

// 하단 네비게이션
const BottomNavigation = () => {
  const navItems = [
    {
      icon: <img src="/icons/editedBoard.png" alt="작성한 글" />,
      label: "작성한 글",
      color: "#8B5CF6",
    },
    {
      icon: <img src="/icons/bookmark.png" alt="스크랩한 글" />,
      label: "스크랩한 글",
      color: "#8B5CF6",
    },
    {
      icon: <img src="/icons/mail.png" alt="메일 목록" />,
      label: "메일 목록",
      color: "#8B5CF6",
    },
    {
      icon: <img src="/icons/browser.png" alt="방문차량 목록" />,
      label: "방문차량 목록",
      color: "#8B5CF6",
    },
  ];

  return (
    <div className={styles["bottom-nav"]}>
      {navItems.map((item, index) => (
        <button key={index} className={styles["bottom-nav__item"]}>
          <span className={styles["bottom-nav__icon"]}>{item.icon}</span>
          <span className={styles["bottom-nav__label"]}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const MyPage = () => {
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
    <div className={styles["mypage"]}>
      <div className={styles["mypage__content"]}>
        <ProfileSection />
        <ApartmentSection />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default MyPage;
