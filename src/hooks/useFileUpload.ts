import { useUserInfo } from "../stores/userStore";

export interface UseFileUploadReturn {
  // 상태 (최적화됨)
  isUploading: boolean;
  uploadProgress: number;
  uploadError: string | null;
  profileImage: string;

  // 액션 (최적화됨)
  updateMemberProfile: (
    memberData?: {
      password?: string;
      name?: string;
      nickname?: string;
      phoneNumber?: string;
    },
    profileFile?: File
  ) => Promise<{
    uploadResponse: any;
    userInfo: any;
    profileImageUrl: string;
  }>;
  validateImageFile: (file: File) => { isValid: boolean; error?: string };
  compressImage: (
    file: File,
    options?: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
      maxSizeKB?: number;
    }
  ) => Promise<File>;
  fileToBase64: (file: File) => Promise<string>;
  resetUploadState: () => void;
  setProfileImage: (imageUrl: string) => void;
}

/**
 * 파일 업로드 관련 기능을 제공하는 커스텀 훅 (최적화됨)
 * userStore의 파일 업로드 기능을 래핑하여 사용하기 쉽게 만든 훅
 *
 * 새로운 기능:
 * - 이미지 자동 압축
 * - 업로드 진행률 표시
 * - 중복 업로드 방지
 * - 향상된 에러 처리
 */
export const useFileUpload = (): UseFileUploadReturn => {
  const {
    isUploading,
    uploadProgress,
    uploadError,
    profileImage,
    updateMemberProfile,
    validateImageFile,
    compressImage,
    fileToBase64,
    resetUploadState,
    setProfileImage,
  } = useUserInfo();

  return {
    // 상태
    isUploading,
    uploadProgress,
    uploadError,
    profileImage,

    // 액션
    updateMemberProfile,
    validateImageFile,
    compressImage,
    fileToBase64,
    resetUploadState,
    setProfileImage,
  };
};

/**
 * 프로필 이미지 업로드에 특화된 훅 (최적화됨)
 * 간단한 인터페이스로 프로필 관련 기능만 제공
 */
export const useProfileImageUpload = () => {
  const {
    isUploading,
    uploadProgress,
    uploadError,
    profileImage,
    updateMemberProfile,
    validateImageFile,
    compressImage,
    resetUploadState,
  } = useUserInfo();

  // 프로필 이미지만 업로드 (회원 정보는 변경하지 않음)
  const uploadProfileImageOnly = async (file: File): Promise<void> => {
    try {
      const result = await updateMemberProfile({}, file);
      console.log("프로필 이미지 업로드 완료:", {
        profileImageUrl: result.profileImageUrl,
        hasUserInfo: !!result.userInfo,
      });
    } catch (error) {
      console.error("Profile image upload failed:", error);
      throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록
    }
  };

  // 회원 정보와 프로필 이미지를 함께 업데이트
  const updateFullProfile = async (
    memberData: {
      password?: string;
      name?: string;
      nickname?: string;
      phoneNumber?: string;
    },
    profileFile?: File
  ): Promise<void> => {
    try {
      const result = await updateMemberProfile(memberData, profileFile);
      console.log("전체 프로필 업데이트 완료:", {
        updatedData: memberData,
        profileImageUrl: result.profileImageUrl,
        fileId: result.userInfo?.data?.fileId,
      });
    } catch (error) {
      console.error("Full profile update failed:", error);
      throw error;
    }
  };

  // 이미지 압축 및 미리보기
  const previewCompressedImage = async (
    file: File
  ): Promise<{
    compressedFile: File;
    previewUrl: string;
    compressionRatio: number;
  }> => {
    const compressedFile = await compressImage(file);
    const previewUrl = (await validateImageFile(file).isValid)
      ? URL.createObjectURL(compressedFile)
      : "";

    const compressionRatio =
      file.size > 0 ? compressedFile.size / file.size : 1;

    return {
      compressedFile,
      previewUrl,
      compressionRatio,
    };
  };

  return {
    // 상태
    profileImage,
    isUploading,
    uploadProgress,
    uploadError,

    // 액션
    uploadProfileImageOnly, // 이미지만 업로드 (GET /api/member로 최신 정보 가져옴)
    updateFullProfile, // 전체 프로필 업데이트 (PUT + GET)
    previewCompressedImage, // 압축된 이미지 미리보기
    validateImageFile,
    compressImage,
    resetUploadState,
  };
};
