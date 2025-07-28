import { useUserInfo } from "../stores/userStore";

export interface UseFileUploadReturn {
  // 상태
  isUploading: boolean;
  uploadError: string | null;
  profileImage: string;

  // 액션
  uploadProfileImage: (file: File) => Promise<string>;
  validateImageFile: (file: File) => { isValid: boolean; error?: string };
  fileToBase64: (file: File) => Promise<string>;
  resetUploadState: () => void;
  setProfileImage: (imageUrl: string) => void;
}

/**
 * 파일 업로드 관련 기능을 제공하는 커스텀 훅
 * userStore의 파일 업로드 기능을 래핑하여 사용하기 쉽게 만든 훅
 */
export const useFileUpload = (): UseFileUploadReturn => {
  const {
    isUploading,
    uploadError,
    profileImage,
    uploadProfileImage,
    validateImageFile,
    fileToBase64,
    resetUploadState,
    setProfileImage,
  } = useUserInfo();

  return {
    // 상태
    isUploading,
    uploadError,
    profileImage,

    // 액션
    uploadProfileImage,
    validateImageFile,
    fileToBase64,
    resetUploadState,
    setProfileImage,
  };
};

/**
 * 프로필 이미지 업로드에 특화된 훅
 * 프로필 이미지 관련 상태와 업로드 함수만 제공
 */
export const useProfileImageUpload = () => {
  const {
    isUploading,
    uploadError,
    profileImage,
    uploadProfileImage,
    validateImageFile,
    resetUploadState,
  } = useUserInfo();

  const handleFileUpload = async (file: File): Promise<void> => {
    try {
      await uploadProfileImage(file);
    } catch (error) {
      // 에러는 이미 store에서 처리됨
      console.error("Profile image upload failed:", error);
    }
  };

  return {
    profileImage,
    isUploading,
    uploadError,
    uploadProfileImage: handleFileUpload,
    validateImageFile,
    resetUploadState,
  };
};
