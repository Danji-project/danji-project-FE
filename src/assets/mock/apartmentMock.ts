import type { BaseApartInfo } from "../../model/BaseApartInfoModel";

export const fetchedApartments: BaseApartInfo[] = [
  {
    id: 1,
    location: "서울 강남구 역삼동",
    name: "힐스테이트",
    region: "강남 힐스테이트",
    apartDetailName: "힐스테이트 브리즈 강남",
    houseSize: 32,
    buildingCount: 1200,
    totalCount: 1200,
    moveAbleMonth: 3,
    thumbnailFileUrl: "/icons/gangnam_hill.png",
    isUseBookmark: true,
    bookmark: false,
  },
  {
    id: 2,
    location: "서울 강남구 역삼동",
    name: "래미안",
    region: "래미안 루체라 강남",
    apartDetailName: "힐스테이트 브리즈 강남",
    houseSize: 32,
    buildingCount: 800,
    totalCount: 1200,
    moveAbleMonth: 3,
    thumbnailFileUrl: "/icons/gangnam_ruchera.png",
    isUseBookmark: true,
    bookmark: false,
  },
];
