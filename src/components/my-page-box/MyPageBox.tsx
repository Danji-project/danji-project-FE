import { useRef } from "react";
import { useUserInfo } from "../../stores/userStore";
import { useProfileImageUpload } from "../../hooks/useProfileImageUpload";
import styles from "./MyPageBox.module.scss";
import MyPageBoxSkeleton from "./MyPageBoxSkeleton";
import { useNavigate } from "react-router-dom";
import { useUserApartDelete } from "../../hooks/useUserApartDelete";

const MyPageBox = () => {
  const { profileImage, nickname, email, isLogin, fileId, apartmentId, apartmentName, region, location, building, unit } = useUserInfo();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { uploadProfileImage, uploadPending } = useProfileImageUpload();
  const navigate = useNavigate();
  const {DeleteApart} = useUserApartDelete();

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

      {
        apartmentId ?
        <>
        <div className={styles["my__page__box__danji"]}>
          <div className={styles["my__page__box__danji__none"]}>
            <div className={styles["my__page__box__danji__in__box"]}>
              <div className={styles["my__page__box__danji__in__box__nametag"]}>
                <span>{nickname}님의 아파트</span>
                <button onClick={() => navigate("/apart-setting")}>
                  수정
                </button>
              </div>
              <div style={{display:'flex'}}>
                <img style={{width:'62px', height:'62px'}} src={fileId ? `https://s3.ap-northeast-2.amazonaws.com/danjitalk/${fileId}` : "/logo.svg"} alt="logo_danji" />
                <div  className={styles["my__page__box__danji__in__fontbox"]}>
                  <div className={styles["my__page__box__danji__in__nameTag"]}>{apartmentName ? apartmentName : `${nickname}님의 아파트`}</div>
                  <div className={styles["my__page__box__danji__in__region"]}>{region} {location}</div>
                  <div className={styles["my__page__box__danji__in__section"]}>{building}동 {unit}호</div>
                </div>
              </div>
            </div>
            <div className={styles["my__page__box__danji__in__button"]}>
              <button onClick={() => {DeleteApart();}} className={styles["my__page__box__danji__in__button__left"]}>
                등록해제
              </button>
              <button className={styles["my__page__box__danji__in__button__right"]}>
                바로가기
              </button>
            </div>
          </div>
        </div>
        </>
        :
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
      }
    </div>
  );
};

export default MyPageBox;
