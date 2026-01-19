import { useEffect, useRef, useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Header from "../../layouts/Header";
import styles from "./RegisterApart.module.scss";
import RegisterApartInput from "./RegisterApartInput";
import { useApartRegisterStore } from "../../stores/useApartRegisterStore";
import useApartDetail from "../../stores/useApartDetail";
import { useUserInfoStore } from "../../stores/userStore";
import dayjs from "dayjs";

const RegisterApart = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const isEdit = type === "edit";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const {
    apartmentId,
    dong,
    ho,
    liveDate,
    livePeople,
    carNumber,
    reset,
    setAll,
    memberApartmentId,
  } = useApartRegisterStore();
  const { setData, data: apartmentDetail } = useApartDetail();
  const { data: userInfo } = useUserInfoStore();
  const queryClient = useQueryClient();

  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();
  const isMountedRef = useRef(false);

  // 실제 언마운트 시에만 reset (Strict Mode 대응)
  useEffect(() => {
    isMountedRef.current = true;

    // 수정 모드인 경우 기존 정보를 스토어에 세팅
    if (isEdit && userInfo && !isInitialized) {
      setAll({
        memberApartmentId: userInfo.memberApartmentId,
        apartmentId: userInfo.apartmentId,
        dong: Number(userInfo.building) || 101,
        ho: userInfo.unit || 101,
        liveDate: userInfo.moveInDate || dayjs().format("YYYY-MM-DD"),
        livePeople: String(userInfo.numberOfResidents || ""),
        carNumber: typeof userInfo.carNumbers === "string" ? userInfo.carNumbers.split(",") : [],
      });
      setIsInitialized(true);
    }

    return () => {
      isMountedRef.current = false;
      setTimeout(() => {
        if (!isMountedRef.current) {
          reset();
        }
      }, 0);
    };
  }, [reset, isEdit, userInfo, setAll]);

  useEffect(() => {
    const getDanji = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/apartment?id=${apartmentId}`, {
          withCredentials: true,
        });
        console.log(response.data);
        setData(response.data.data, apartmentId!);
      } catch (e: unknown) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (apartmentId !== null) {
      getDanji();
    }
  }, [apartmentId]);

  const submitDanji = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const requestBody = {
        apartmentId,
        building: String(dong),
        unit: String(ho),
        moveInDate: liveDate,
        numberOfResidents: Number(livePeople),
        carNumbers: carNumber,
      };

      if (isEdit && memberApartmentId) {
        await axios.put(`/api/member-apartments/${memberApartmentId}`, requestBody, {
          withCredentials: true,
        });
      } else {
        await axios.post("/api/member-apartments", requestBody, {
          withCredentials: true,
        });
      }

      await queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });
      navigate("/my-page");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert("이미 등록된 단지입니다.");
          await queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });
          navigate("/my-page");
        }
      } else {
        console.log(error);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <Header title={isEdit ? "단지 수정하기" : "단지 등록하기"} hasBackButton />
      <form onSubmit={submitDanji}>
        <div className={styles["register__apart"]}>
          <RegisterApartInput
            title="단지 정보"
            className="danji__info"
            isDanjiInfo
            loading={isLoading}
            apartmentDetail={apartmentDetail}
          />
          <RegisterApartInput
            title="동"
            className="dong"
            isSelector
            apartmentDetail={apartmentDetail}
          />
          <RegisterApartInput title="호" className="ho" isSelector isHo />
          <RegisterApartInput
            title="입주일"
            className="live__date"
            isCalendar
          />
          <RegisterApartInput
            title="거주인원"
            className="live__people"
            isInputPeople
          />
          <RegisterApartInput
            title="차량번호"
            className="add__car"
            isInputCar
          />
          <button
            disabled={
              !apartmentId ||
              !dong ||
              !ho ||
              !liveDate ||
              livePeople === "" ||
              submitLoading
            }
          >
            {submitLoading ? "처리 중..." : "완료"}
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterApart;
