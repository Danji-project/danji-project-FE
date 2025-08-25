import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/userStore";

import { useProfileImageUpload } from "../../hooks/useFileUpload";
import { useUserInfoMutation } from "../../hooks/useUserInfoMutation";
import { useUserApartDelete } from "../../hooks/useUserApartDelete";

import LogoIcon from "../../assets/logo.svg";

import styles from "./MyPage.module.scss";

// 프로필 섹션 (최적화됨)
const ProfileSection = () => {
  const { email, nickname, name } = useUserInfo();
  const {
    profileImage,
    isUploading,
    uploadProgress,
    uploadError,
    uploadProfileImageOnly,
    validateImageFile,
    resetUploadState,
  } = useProfileImageUpload();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 빠른 프로필 이미지 변경
  const handleQuickFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 검증
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    try {
      await uploadProfileImageOnly(file);
      // 성공 피드백은 진행률로 표시됨
    } catch (error) {
      // 에러는 자동으로 uploadError 상태에 저장됨
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // 에러 메시지 표시
  useEffect(() => {
    if (uploadError) {
      alert(uploadError);
      resetUploadState();
    }
  }, [uploadError, resetUploadState]);

  // 컴포넌트 언마운트 시 업로드 상태 초기화
  useEffect(() => {
    return () => {
      resetUploadState();
    };
  }, [resetUploadState]);

  return (
    <>
      <div className={styles["profile"]}>
        <div className={styles["profile__avatar-container"]}>
          <div className={styles["profile__avatar"]}>
            <img
              src={profileImage}
              alt="프로필"
              className={styles["profile__image"]}
            />

            {/* 업로드 오버레이 (진행률 포함) */}
            {isUploading && (
              <div className={styles["profile__upload-overlay"]}>
                <div className={styles["upload-progress"]}>
                  <div className={styles["progress-circle"]}>
                    <svg
                      className={styles["progress-ring"]}
                      width="60"
                      height="60"
                    >
                      <circle
                        className={styles["progress-ring-circle"]}
                        stroke="white"
                        strokeWidth="3"
                        fill="transparent"
                        r="26"
                        cx="30"
                        cy="30"
                        strokeDasharray={`${2 * Math.PI * 26}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 26 * (1 - uploadProgress / 100)
                        }`}
                      />
                    </svg>
                    <span className={styles["progress-text"]}>
                      {uploadProgress}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className={styles["profile__edit-btn"]}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            title="프로필 사진 빠른 변경"
          >
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

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleQuickFileChange}
            style={{ display: "none" }}
            aria-label="프로필 사진 빠른 업로드"
          />
        </div>

        <div className={styles["profile__info"]}>
          <h2 className={styles["profile__name"]}>
            {name || nickname || "사용자"}
          </h2>
          <p className={styles["profile__email"]}>{email}</p>
        </div>
      </div>
    </>
  );
};

// 아파트 정보 섹션
const ApartmentSection = () => {
  const user = useUserInfo();
  const navigate = useNavigate();
  const {DeleteApart} = useUserApartDelete();

  const registerApart = () => {
    navigate("/register-my-apart-info");
  }

  const DeleteApartMutation = () => {
    DeleteApart();
  }

  return (
    <>
      {
        user.apartmentId == null?
        <div className={styles["non-apartment"]}>
          <div className={styles["non-apartment__card"]}>
            <img src={LogoIcon} />
            <p>등록된 단지가 없습니다.</p>
          </div>
          <div className={styles["non-apartment__div-btn"]}>
            <button className={`${styles["apartment__btn"]} ${styles["apartment__btn--unregister"]}`} onClick={registerApart}>단지 등록</button>
          </div>
        </div>
        :
        <div className={styles["apartment"]}>
          <div className={styles["apartment__header"]}>
            <h3 className={styles["apartment__title"]}>{user.nickname}의 아파트</h3>
            <button className={styles["apartment__edit-btn"]} onClick={registerApart}>수정</button>
          </div>

          <div className={styles["apartment__card"]}>
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=120&fit=crop"
              alt="아파트"
              className={styles["apartment__image"]}
            />
            <div className={styles["apartment__info"]}>
              <h4 className={styles["apartment__name"]}>{user.apartmentName}</h4>
              <p className={styles["apartment__address"]}>{user.region}</p>
              <p className={styles["apartment__unit"]}>{user.building} {user.unit}호</p>
            </div>
          </div>

          <div className={styles["apartment__actions"]}>
            <button onClick={DeleteApartMutation}
              className={`${styles["apartment__btn"]} ${styles["apartment__btn--unregister"]}`}>
              등록해제
            </button>
            <button
              className={`${styles["apartment__btn"]} ${styles["apartment__btn--goto"]}`}
              onClick={()=>{localStorage.setItem("selectApart", user.apartmentId ? user.apartmentId.toString() : ''); navigate('/apart-Info');}}>
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
  const { executeUserInfoMutation, isPending } = useUserInfoMutation();

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login", { replace: true });
    }
    executeUserInfoMutation();
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
