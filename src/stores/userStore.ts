import { create } from "zustand";
import axios from "axios";
import { API_ENDPOINTS } from "../api/endpoints";

interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}

interface IUserInfoBase {
  email: string;
  password: string;
  nickname: string;
  isLogin: boolean;
  error: string;
  profileImage: string;
  isUploading: boolean;
  uploadError: string | null;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  setIsLogin: (result: boolean) => void;
  setError: (error: string) => void;
  setProfileImage: (imageUrl: string) => void;
  setIsUploading: (isUploading: boolean) => void;
  setUploadError: (error: string | null) => void;

  // 파일 업로드 관련 메서드
  validateImageFile: (file: File) => { isValid: boolean; error?: string };
  uploadProfileImage: (file: File) => Promise<string>;
  fileToBase64: (file: File) => Promise<string>;
  resetUploadState: () => void;
}

export const useUserInfo = create<IUserInfoBase>((set, get) => ({
  email: "",
  password: "",
  nickname: "",
  isLogin: false,
  error: "",
  profileImage: "/profile_imgSrc.jpg",
  isUploading: false,
  uploadError: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setNickname: (nickname) => set({ nickname }),
  setIsLogin: (result) => set({ isLogin: result }),
  setError: (error) => set({ error }),
  setProfileImage: (imageUrl) => set({ profileImage: imageUrl }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setUploadError: (error) => set({ uploadError: error }),

  // 파일 검증
  validateImageFile: (file: File) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const maxSizeInMB = 5;
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

  // Base64 변환
  fileToBase64: (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // 프로필 이미지 업로드
  uploadProfileImage: async (file: File) => {
    const {
      validateImageFile,
      setIsUploading,
      setUploadError,
      setProfileImage,
      fileToBase64,
    } = get();

    // 파일 검증
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // 미리보기를 위해 즉시 Base64로 변환하여 표시
      const previewUrl = await fileToBase64(file);
      setProfileImage(previewUrl);

      // 실제 서버 업로드
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `/api${API_ENDPOINTS.UPLOAD.PROFILE_IMAGE}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const uploadResult: UploadResponse = response.data;

      // 서버에서 반환된 URL로 이미지 업데이트
      setProfileImage(uploadResult.url);
      return uploadResult.url;
    } catch (error) {
      // 업로드 실패 시 원래 이미지로 되돌리기
      setProfileImage("/profile_imgSrc.jpg");

      let errorMessage = "파일 업로드에 실패했습니다.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setUploadError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  },

  // 업로드 상태 초기화
  resetUploadState: () =>
    set({
      isUploading: false,
      uploadError: null,
    }),
}));
