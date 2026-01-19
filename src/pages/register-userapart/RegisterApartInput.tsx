import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./RegisterApartInput.module.scss";
import ApartRegisterInfo from "./ApartRegisterInfo";
import { useNavigate } from "react-router-dom";
import ApartSelector from "./ApartSelector";
import type { ApartmentDetail } from "../../hooks/useApartmentList";
import ApartInfoSkeleton from "./ApartInfoSkeleton";
import { makeDongRange } from "../../utils/makeDongRange";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { useApartRegisterStore } from "../../stores/useApartRegisterStore";

const RegisterApartInput = ({
  title,
  className,
  isDanjiInfo,
  isSelector,
  isHo,
  isCalendar,
  isInputPeople,
  isInputCar,
  loading,
  apartmentDetail,
}: {
  title: string;
  className: string;
  isDanjiInfo?: boolean;
  isSelector?: boolean;
  isHo?: boolean;
  isCalendar?: boolean;
  isInputPeople?: boolean;
  isInputCar?: boolean;
  loading?: boolean;
  apartmentDetail?: ApartmentDetail;
}) => {
  const navigate = useNavigate();

  const {
    dong,
    setDong,
    ho,
    setHo,
    setLiveDate,
    liveDate,
    setLivePeople,
    livePeople,
    carNumber,
    setCarNumber,
    removeCarNumber,
  } = useApartRegisterStore();

  const dongArray = useMemo(() => {
    if (!apartmentDetail?.buildingRange) return [];
    return makeDongRange(apartmentDetail.buildingRange);
  }, [apartmentDetail?.buildingRange]);

  const hoArray = [101, 102, 103, 201, 202, 203, 301, 302, 303];

  const [dongOpen, setDongOpen] = useState<boolean>(false);
  const [hoOpen, setHoOpen] = useState<boolean>(false);

  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const [carInput, setCarInput] = useState<string>("");

  const handleAddCar = () => {
    if (carInput.trim()) {
      setCarNumber(carInput.trim());
      setCarInput("");
    }
  };

  return (
    <div
      className={`register__input ${className}`}
      style={{ marginTop: "30px" }}
    >
      <h2 className={styles["register__input__title"]}>{title}</h2>
      {isDanjiInfo && !loading && apartmentDetail?.kaptAddr && (
        <ApartRegisterInfo sd={apartmentDetail} />
      )}
      {isDanjiInfo && loading && <ApartInfoSkeleton />}
      {isDanjiInfo &&
        Object.keys(apartmentDetail!).length === 0 &&
        !loading && (
          <div className={styles["no__register"]}>
            <span>단지를 등록해주세요.</span>
            <button onClick={() => navigate("/apart-setting")}>
              단지 등록하기
            </button>
          </div>
        )}
      {isSelector && !isHo && (
        <ApartSelector
          array={dongArray}
          selected={dong}
          setSelected={setDong}
          open={dongOpen}
          setOpen={setDongOpen}
        />
      )}
      {isSelector && isHo && (
        <ApartSelector
          array={hoArray}
          selected={ho}
          setSelected={setHo}
          open={hoOpen}
          setOpen={setHoOpen}
        />
      )}
      {isCalendar && (
        <div className={styles["calendar__wrapper"]}>
          <button
            className={styles["calendar__value"]}
            onClick={() => setCalendarOpen(true)}
            type="button"
          >
            {liveDate}
          </button>
          {calendarOpen && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                className={styles["date__picker"]}
                value={dayjs(liveDate)}
                onChange={(newValue) => {
                  setLiveDate(newValue?.format("YYYY-MM-DD") ?? "");
                  setCalendarOpen(false);
                }}
              />
            </LocalizationProvider>
          )}
        </div>
      )}
      {isInputPeople && (
        <input
          type="text"
          value={livePeople}
          placeholder="인원 수를 입력해주세요."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLivePeople(e.target.value);
          }}
          style={{
            marginTop: "16px",
            paddingBottom: "16px",
            border: "none",
            borderBottom: "1px solid black",
            width: "100%",
            outline: "none",
            fontSize: "16px",
          }}
        />
      )}
      {isInputCar && (
        <div className={styles["input__car__wrapper"]}>
          <input
            type="text"
            value={carInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCarInput(e.target.value);
            }}
            placeholder="차량번호를 입력해주세요."
            style={{
              marginTop: "16px",
              paddingBottom: "16px",
              border: "none",
              borderBottom: "1px solid black",
              width: "100%",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <button type="button" onClick={handleAddCar}>
            차량 추가 등록
          </button>
          <div className={styles["car__list"]}>
            {carNumber.map((car, index) => (
              <div key={index} className={styles["car__item"]}>
                <span>{car}</span>
                <button
                  type="button"
                  onClick={() => removeCarNumber(car)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterApartInput;
