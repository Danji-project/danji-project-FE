import type { BaseApartInfo } from "../../model/BaseApartInfoModel";
import { usePendingStore } from "../../stores/usePendingStore";
import ApartChatModal from "./ApartChatModal";

import styles from "./ApartDetail.module.scss";

const ApartDetail = ({ apartData }: { apartData: BaseApartInfo }) => {
  const { setApartChatBlack, apartChatBlack } = usePendingStore();

  const handleApartChat = () => {
    setApartChatBlack(true);
  };

  return (
    <>
      <div className={styles["apart__detail"]}>
        <div className={styles["apart__detail__location"]}>
          <img src={"/icons/Location.png"} alt="location" />
          <span>{apartData.location}</span>
        </div>
        <div className={styles["apart__detail__basic"]}>
          <div className={styles["apart__detail__basic__title"]}>기본 정보</div>
          <div className={styles["apart__detail__basic__info"]}>
            <dl>
              <dd>입주년도</dd>
              <dt>2015년</dt>
            </dl>
            <dl>
              <dd>총 세대 수</dd>
              <dt>{apartData.buildingCount.toLocaleString()}세대 (10개동)</dt>
            </dl>
            <dl>
              <dd>건물 유형</dd>
              <dt>고층 아파트 (최고 35층)</dt>
            </dl>
            <dl>
              <dd>평형대 구성</dd>
              <dt>
                <span>24평(300세대)</span>
                <span>34평(500세대)</span>
                <span>45평(400세대)</span>
              </dt>
            </dl>
            <dl>
              <dd>
                관리 사무소 <br /> 연락처
              </dd>
              <dt>010-1234-1234</dt>
            </dl>
          </div>
          <div className={styles["apart__detail__basic__pictures"]}>
            {apartData.picture!.slice(0, 4).map((ad: string, index: number) => (
              <div
                className={`${styles["apart__detail__basic__pictures__card"]} ${
                  index === 3 && apartData.picture!.length > 4
                    ? styles["apart__detail__basic__pictures__card__black"]
                    : ""
                }`}
              >
                <img src={ad} alt="pictures_card" />
                {index === 3 && apartData.picture!.length > 4 && (
                  <span>+{apartData.picture!.length - 4}</span>
                )}
              </div>
            ))}
          </div>
          <div className={styles["apart__detail__basic__chat__button"]}>
            <button onClick={handleApartChat}>단지 채팅 참여하기</button>
          </div>
          {apartChatBlack && <ApartChatModal apartData={apartData} />}
        </div>
        <div className={styles["apart__detail__environment"]}>
          <div className={styles["apart__detail__environment__title"]}>
            거주 환경
          </div>
          <div className={styles["apart__detail__environment__info"]}>
            <dl>
              <dd>평균 매매가</dd>
              <dt>32평 기준 22억원</dt>
            </dl>
            <dl>
              <dd>전세가</dd>
              <dt>
                <span>전세가 12억원</span>
                <span>월세 500만원 (보증금 3억)</span>
              </dt>
            </dl>
            <dl>
              <dd>주차 공간</dd>
              <dt>
                <span>세대 당 1.5대</span>
                <span>총 1,800대 주차 가능</span>
              </dt>
            </dl>
            <dl>
              <dd>층간 소음</dd>
              <dt>
                <img src="/icons/star_on.svg" alt="on" />
                <img src="/icons/star_on.svg" alt="on" />
                <img src="/icons/star_on.svg" alt="on" />
                <img src="/icons/star_off.png" alt="off" />
                <img src="/icons/star_off.png" alt="off" />
              </dt>
            </dl>
            <dl>
              <dd>단열 / 냉난방</dd>
              <dt>우수</dt>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApartDetail;
