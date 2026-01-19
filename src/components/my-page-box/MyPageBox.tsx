import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./MyPageBox.module.scss";
import MyApartCard from "./MyApartCard";
import { useUserInfoStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useProfileUpdate } from "../../hooks/useProfileUpdate";
import ClipLoader from "react-spinners/ClipLoader";
import { useApartmentDetail } from "../../hooks/useApartmentList";
import useApartDetail from "../../stores/useApartDetail";

const MyPageBox = () => {
  const { data: userInfo } = useUserInfoStore();
  const { getApartmentMutation } = useApartmentDetail();
  const { data: apartDetail } = useApartDetail();
  const { updateProfileOnly, updateProfilePending } = useProfileUpdate();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.apartmentId) {
      getApartmentMutation.mutate({ apartmentId: userInfo.apartmentId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.apartmentId]);

  console.log(userInfo);

  const fileRef = useRef<HTMLInputElement>(null);

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfileOnly.mutate({
      name: userInfo?.name ?? "이름을 설정해주세요.",
      nickname: userInfo?.nickname ?? "닉네임을 설정해주세요",
      phoneNumber: userInfo?.phoneNumber ?? "핸드폰 번호를 설정해주세요",
      file: e.target.files![0],
    });
  };

  const fileButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fileRef.current?.click();
  };

  const override: CSSProperties = {
    position: "absolute",
    inset: "0",
    margin: "auto",
  };

  return (
    <form onSubmit={fileButtonClick}>
      <div className={styles["my__page__box"]}>
        <div className={styles["my__page__box__profile"]}>
          {updateProfilePending && (
            <>
              <div className={styles["loading-back"]}></div>
              <ClipLoader cssOverride={override} color={"#fff"} />
            </>
          )}
          <img
            src={
              !userInfo?.fileId ||
                userInfo?.fileId === null ||
                userInfo?.fileId === "/profile_imgSrc.jpg"
                ? "./profile_imgSrc.jpg"
                : "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                userInfo?.fileId
            }
            alt="edit_profile"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={fileChange}
          />
          <button type="submit">
            <img src="/write.svg" alt="write" />
          </button>
        </div>
        <div className={styles["my__page__box__nickname"]}>
          {userInfo?.nickname}
        </div>
        <div className={styles["my__page__box__email"]}>{userInfo?.email}</div>
        {userInfo?.apartmentId ? (
          <MyApartCard
            nickname={userInfo.nickname}
            fileId={apartDetail.fileUrl ?? ""}
            apartmentName={userInfo.apartmentName || apartDetail.kaptName || ""}
            apartmentAddr={userInfo.location || apartDetail.kaptAddr || ""}
            apartmentDong={userInfo.building ?? ""}
            apartmentHo={userInfo.unit ?? 0}
            memberApartmentId={userInfo.memberApartmentId ?? 0}
            apartmentId={userInfo.apartmentId ?? 0}
          />
        ) : (
          <div className={styles["my__page__box__danji"]}>
            <div className={styles["my__page__box__danji__none"]}>
              <div className={styles["my__page__box__danji__none__box"]}>
                <img src={"/logo.svg"} alt="logo_danji" />
                <span>등록된 단지가 없습니다.</span>
              </div>
              <div className={styles["my__page__box__danji__none__button"]}>
                <button
                  onClick={() => navigate("/apart-setting")}
                  type="button"
                >
                  단지 등록하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default MyPageBox;
