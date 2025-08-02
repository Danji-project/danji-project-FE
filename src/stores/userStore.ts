import { create } from "zustand";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";

interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  profileImageUrl?: string;
}

interface MemberProfileUpdateResponse {
  uploadResponse: any;
  userInfo: any;
  profileImageUrl: string;
}

interface ImageCompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeKB?: number;
}

interface IUserInfoBase {
  // 사용자 데이터
  apartmentID?: string | null;
  apartmentName?: string| null;
  building?: string| null;
  email: string;
  password: string;
  fileID?: string| null;
  location?: string| null;
  memberApartmentID?: string| null;
  moveInDate?: string| null;
  name?: string| null;
  nickname?: string| null;
  phoneNumber?: string| null;
  region?: string| null;
  uint?: string

  // 사용자 데이터 받아온 이후 정해지는 것들
  isLogin: boolean;
  error: string;

  // 아파트 정보
  apartmentId: null;
  apartmentName: null | string;
  building: null;
  carNumber: null | number;
  fileId: null | string | number;
  location: string | null;
  memberApartmentId: number | null;
  moveInDate: null | string;
  numberOfResidents: number | null;
  region: string | null;
  unit: null;

  // 파일 업로드 관련 (최적화됨)
  profileImage: string;
  isUploading: boolean;
  uploadProgress: number;
  uploadError: string | null;
  lastUploadTime: number | null;

  // 기본 setter 함수들
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  setName: (name: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setIsLogin: (result: boolean) => void;
  setError: (error: string) => void;

  // 아파트 정보 setter 함수들
  setApartmentId: (apartmentId: null) => void;
  setApartmentName: (apartmentName: null | string) => void;
  setBuilding: (building: null) => void;
  setCarNumber: (carNumber: null | number) => void;
  setFileId: (fileId: null | string | number) => void;
  setLocation: (location: string | null) => void;
  setMemberApartmentId: (memberApartmentId: number | null) => void;
  setMoveInDate: (moveInDate: null | string) => void;
  setNumberOfResidents: (numberOfResidents: number | null) => void;
  setRegion: (region: string | null) => void;
  setUnit: (unit: null) => void;

  // 파일 업로드 관련 setter 함수들 (최적화됨)
  setProfileImage: (imageUrl: string) => void;
  setIsUploading: (isUploading: boolean) => void;
  setUploadProgress: (progress: number) => void;
  setUploadError: (error: string | null) => void;

  // 파일 업로드 관련 메서드 (최적화됨)
  validateImageFile: (file: File) => { isValid: boolean; error?: string };
  compressImage: (
    file: File,
    options?: ImageCompressionOptions
  ) => Promise<File>;
  updateMemberProfile: (
    memberData?: {
      password?: string;
      name?: string;
      nickname?: string;
      phoneNumber?: string;
    },
    profileFile?: File
  ) => Promise<MemberProfileUpdateResponse>;
  fileToBase64: (file: File) => Promise<string>;
  resetUploadState: () => void;

  // 사용자 정보 일괄 업데이트
  updateUserInfo: (userInfo: Partial<IUserInfoBase>) => void;
  resetUserInfo: () => void;
}

export const useUserInfo = create<IUserInfoBase>((set, get) => ({
  // 기본 정보 초기값
  email: "",
  password: "",
  nickname: "",
  name: "",
  phoneNumber: "",
  isLogin: false,
  error: "",

  // 아파트 정보 초기값
  apartmentId: null,
  apartmentName: null,
  building: null,
  carNumber: null,
  fileId: null,
  location: null,
  memberApartmentId: null,
  moveInDate: null,
  numberOfResidents: null,
  region: null,
  unit: null,

  // 파일 업로드 관련 초기값 (최적화됨)
  profileImage: "/profile_imgSrc.jpg",
  isUploading: false,
  uploadProgress: 0,
  uploadError: null,
  lastUploadTime: null,

  // 기본 setter 함수들
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setNickname: (nickname) => set({ nickname }),
  setName: (name) => set({ name }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setIsLogin: (result) => set({ isLogin: result }),
  setError: (error) => set({ error }),

  // 아파트 정보 setter 함수들
  setApartmentId: (apartmentId) => set({ apartmentId }),
  setApartmentName: (apartmentName) => set({ apartmentName }),
  setBuilding: (building) => set({ building }),
  setCarNumber: (carNumber) => set({ carNumber }),
  setFileId: (fileId) => set({ fileId }),
  setLocation: (location) => set({ location }),
  setMemberApartmentId: (memberApartmentId) => set({ memberApartmentId }),
  setMoveInDate: (moveInDate) => set({ moveInDate }),
  setNumberOfResidents: (numberOfResidents) => set({ numberOfResidents }),
  setRegion: (region) => set({ region }),
  setUnit: (unit) => set({ unit }),

  // 파일 업로드 관련 setter 함수들 (최적화됨)
  setProfileImage: (imageUrl) => set({ profileImage: imageUrl }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  setUploadError: (error) => set({ uploadError: error }),

  // 파일 검증 (최적화됨)
  validateImageFile: (file: File) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const maxSizeInMB = 10; // 압축 전이므로 더 큰 크기 허용
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: "JPG, PNG, GIF, WebP 형식의 이미지만 업로드 가능합니다.",
      };
    }

    if (file.size > maxSizeInBytes) {
      return {
        isValid: false,
        error: `파일 크기는 ${maxSizeInMB}MB 이하여야 합니다.`,
      };
    }

    return { isValid: true };
  },

  // 이미지 압축 (새로 추가)
  compressImage: async (file: File, options: ImageCompressionOptions = {}) => {
    const {
      maxWidth = 800,
      maxHeight = 800,
      quality = 0.8,
      maxSizeKB = 500,
    } = options;

    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // 비율 유지하면서 리사이징
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // 이미지 그리기
        ctx?.drawImage(img, 0, 0, width, height);

        // Blob으로 변환
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("이미지 압축에 실패했습니다."));
              return;
            }

            // 크기 확인
            const sizeKB = blob.size / 1024;
            if (sizeKB > maxSizeKB && quality > 0.1) {
              // 크기가 여전히 크면 품질 낮춰서 재시도
              const newQuality = Math.max(0.1, quality - 0.1);
              get()
                .compressImage(file, { ...options, quality: newQuality })
                .then(resolve)
                .catch(reject);
              return;
            }

            // File 객체로 변환
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error("이미지 로드에 실패했습니다."));
      img.src = URL.createObjectURL(file);
    });
  },

  // Base64 변환
  fileToBase64: (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // 통합된 회원 정보 및 프로필 이미지 업데이트 (최적화됨)
  updateMemberProfile: async (
    memberData: {
      password?: string;
      name?: string;
      nickname?: string;
      phoneNumber?: string;
    } = {},
    profileFile?: File
  ) => {
    const {
      validateImageFile,
      compressImage,
      setIsUploading,
      setUploadProgress,
      setUploadError,
      setProfileImage,
      fileToBase64,
      updateUserInfo,
    } = get();

    // 중복 업로드 방지 (쓰로틀링)
    const now = Date.now();
    const lastUpload = get().lastUploadTime;
    if (lastUpload && now - lastUpload < 1000) {
      throw new Error("너무 빠른 요청입니다. 잠시 후 다시 시도해주세요.");
    }

    // 프로필 파일이 있을 경우 검증 및 압축
    let finalProfileFile = profileFile;
    if (profileFile) {
      const validation = validateImageFile(profileFile);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      try {
        // 이미지 압축
        finalProfileFile = await compressImage(profileFile);
        console.log(
          `이미지 압축: ${(profileFile.size / 1024).toFixed(1)}KB → ${(
            finalProfileFile.size / 1024
          ).toFixed(1)}KB`
        );
      } catch (error) {
        console.warn("이미지 압축 실패, 원본 사용:", error);
        finalProfileFile = profileFile;
      }
    }

    // 업로드 시작
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    set({ lastUploadTime: now });

    // fileId를 이용한 이미지 URL 생성 함수
    const generateProfileImageUrl = (
      fileId: string | number | null
    ): string => {
      if (!fileId) return "/profile_imgSrc.jpg";
      return `https://s3.ap-northeast-2.amazonaws.com/danjitalk/${fileId}`;
    };

    // 여러 방법으로 시도하는 함수
    const tryUpload = async (method: "blob" | "string" | "separate") => {
      const formData = new FormData();

      const requestDto = {
        password: memberData.password || "",
        name: memberData.name || "",
        nickname: memberData.nickname || "",
        phoneNumber: memberData.phoneNumber || "",
      };

      switch (method) {
        case "blob":
          // 방법 1: JSON을 Blob으로 전송 (권장)
          const requestBlob = new Blob([JSON.stringify(requestDto)], {
            type: "application/json",
          });
          formData.append("requestDto", requestBlob);
          break;

        case "string":
          // 방법 2: JSON 문자열로 직접 전송
          formData.append("requestDto", JSON.stringify(requestDto));
          break;

        case "separate":
          // 방법 3: 각 필드를 개별적으로 전송
          Object.entries(requestDto).forEach(([key, value]) => {
            if (value) formData.append(key, value);
          });
          break;
      }

      // 프로필 파일이 있으면 추가
      if (finalProfileFile) {
        formData.append(
          "multipartFile",
          finalProfileFile,
          finalProfileFile.name
        );
      }

      return axios.put(`/api${API_ENDPOINTS.USER.UPDATE_MEMBER}`, formData, {
        withCredentials: true,
        timeout: 30000, // 30초 타임아웃
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              30 + (progressEvent.loaded / progressEvent.total) * 30
            );
            setUploadProgress(progress);
          }
        },
      });
    };

    // GET /api/member로 최신 정보 가져오기
    const fetchLatestUserInfo = async () => {
      try {
        setUploadProgress(70);
        const response = await axios.get(`/api${API_ENDPOINTS.USER.MEMBER}`, {
          withCredentials: true,
          timeout: 10000,
        });
        return response.data;
      } catch (error) {
        console.warn("최신 사용자 정보 조회 실패:", error);
        throw error;
      }
    };

    try {
      // 프로필 이미지 미리보기 (파일이 있는 경우)
      if (finalProfileFile) {
        setUploadProgress(5);
        const previewUrl = await fileToBase64(finalProfileFile);
        setProfileImage(previewUrl);
        setUploadProgress(10);
      }

      setUploadProgress(15);

      let uploadResponse;
      let lastError;

      console.log("FormData 구성:");
      console.log(
        "- requestDto:",
        JSON.stringify({
          password: memberData.password || "",
          name: memberData.name || "",
          nickname: memberData.nickname || "",
          phoneNumber: memberData.phoneNumber || "",
        })
      );
      if (finalProfileFile) {
        console.log(
          "- multipartFile:",
          finalProfileFile.name,
          `(${(finalProfileFile.size / 1024).toFixed(1)}KB)`
        );
      }

      // 1단계: PUT /api/member로 업로드
      try {
        console.log("1단계: PUT /api/member로 파일 업로드 시작");
        setUploadProgress(20);
        uploadResponse = await tryUpload("blob");
        console.log("PUT 요청 성공:", uploadResponse.status);
      } catch (error) {
        console.warn("방법 1 실패:", error);
        lastError = error;

        // 방법 2 시도: JSON 문자열
        try {
          console.log("방법 2 시도: JSON 문자열로 전송");
          setUploadProgress(25);
          uploadResponse = await tryUpload("string");
        } catch (error2) {
          console.warn("방법 2 실패:", error2);
          lastError = error2;

          // 방법 3 시도: 개별 필드
          console.log("방법 3 시도: 개별 필드로 전송");
          setUploadProgress(27);
          uploadResponse = await tryUpload("separate");
        }
      }

      // 2단계: GET /api/member로 최신 정보 가져오기
      console.log("2단계: GET /api/member로 최신 정보 조회 시작");
      setUploadProgress(65);

      const userInfoResponse = await fetchLatestUserInfo();
      setUploadProgress(85);

      console.log("GET 응답 데이터:", userInfoResponse);

      // 3단계: 받아온 정보로 사용자 상태 업데이트
      const userData = userInfoResponse.data;
      const updatedData: any = {};

      // 기본 정보 업데이트
      if (userData.email) updatedData.email = userData.email;
      if (userData.name) updatedData.name = userData.name;
      if (userData.nickname) updatedData.nickname = userData.nickname;
      if (userData.phoneNumber) updatedData.phoneNumber = userData.phoneNumber;

      // 아파트 정보 업데이트
      updatedData.apartmentId = userData.apartmentId;
      updatedData.apartmentName = userData.apartmentName;
      updatedData.building = userData.building;
      updatedData.carNumber = userData.carNumber;
      updatedData.fileId = userData.fileId;
      updatedData.location = userData.location;
      updatedData.memberApartmentId = userData.memberApartmentId;
      updatedData.moveInDate = userData.moveInDate;
      updatedData.numberOfResidents = userData.numberOfResidents;
      updatedData.region = userData.region;
      updatedData.unit = userData.unit;

      // 프로필 이미지 URL 결정 (우선순위: profileImageUrl > fileId > 기본 이미지)
      let finalImageUrl = "/profile_imgSrc.jpg";

      if (userData.profileImageUrl) {
        finalImageUrl = userData.profileImageUrl;
        console.log(
          "서버에서 직접 제공한 profileImageUrl 사용:",
          finalImageUrl
        );
      } else if (userData.fileId) {
        finalImageUrl = generateProfileImageUrl(userData.fileId);
        console.log("fileId로 생성한 이미지 URL 사용:", finalImageUrl);
      } else {
        console.log("기본 프로필 이미지 사용");
      }

      setProfileImage(finalImageUrl);
      setUploadProgress(95);

      // 사용자 정보 일괄 업데이트
      updateUserInfo(updatedData);
      setUploadProgress(100);

      console.log("프로필 업데이트 완료:", {
        updatedFields: Object.keys(updatedData),
        finalImageUrl,
        fileId: userData.fileId,
      });

      // 잠시 후 진행률 초기화
      setTimeout(() => setUploadProgress(0), 1500);

      return {
        uploadResponse: uploadResponse?.data,
        userInfo: userInfoResponse,
        profileImageUrl: finalImageUrl,
      };
    } catch (error) {
      // 실패 시 원래 상태로 복원
      if (finalProfileFile) {
        setProfileImage("/profile_imgSrc.jpg");
      }

      let errorMessage = "회원 정보 수정에 실패했습니다.";
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const responseData = error.response?.data;

        console.error("API 오류 상세:", {
          status,
          statusText: error.response?.statusText,
          data: responseData,
          headers: error.response?.headers,
        });

        switch (status) {
          case 400:
            errorMessage =
              responseData?.message ||
              "잘못된 요청입니다. 입력 데이터를 확인해주세요.";
            break;
          case 413:
            errorMessage = "파일 크기가 너무 큽니다.";
            break;
          case 415:
            errorMessage = "지원하지 않는 파일 형식입니다.";
            break;
          case 422:
            errorMessage = "입력 데이터가 올바르지 않습니다.";
            break;
          case 500:
            errorMessage =
              "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
            break;
          default:
            errorMessage = responseData?.message || errorMessage;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setUploadError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  },

  // 업로드 상태 초기화 (최적화됨)
  resetUploadState: () =>
    set({
      isUploading: false,
      uploadProgress: 0,
      uploadError: null,
      lastUploadTime: null,
    }),

  // 사용자 정보 일괄 업데이트
  updateUserInfo: (userInfo) => set((state) => ({ ...state, ...userInfo })),

  // 사용자 정보 초기화 (최적화됨)
  resetUserInfo: () =>
    set({
      email: "",
      password: "",
      nickname: "",
      name: "",
      phoneNumber: "",
      isLogin: false,
      error: "",
      apartmentId: null,
      apartmentName: null,
      building: null,
      carNumber: null,
      fileId: null,
      location: null,
      memberApartmentId: null,
      moveInDate: null,
      numberOfResidents: null,
      region: null,
      unit: null,
      profileImage: "/profile_imgSrc.jpg",
      isUploading: false,
      uploadProgress: 0,
      uploadError: null,
      lastUploadTime: null,
    }),
}));
