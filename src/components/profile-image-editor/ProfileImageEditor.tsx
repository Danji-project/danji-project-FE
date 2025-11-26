import { useState } from "react";
import styles from "./ProfileImageEditor.module.scss";

interface ProfileImageEditorProps {
  currentImage?: string;
  onImageChange?: (imageFile: File) => void;
  size?: "small" | "medium" | "large";
}

const ProfileImageEditor = ({
  currentImage = "/profile_imgSrc.jpg",
  onImageChange,
  size = "large",
}: ProfileImageEditorProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(currentImage);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);

      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return styles["profile-editor--small"];
      case "medium":
        return styles["profile-editor--medium"];
      case "large":
        return styles["profile-editor--large"];
      default:
        return styles["profile-editor--large"];
    }
  };

  return (
    <div className={`${styles["profile-editor"]} ${getSizeClass()}`}>
      <div className={styles["profile-editor__image-container"]}>
        <img
          src={selectedImage}
          alt="프로필 이미지"
          className={styles["profile-editor__image"]}
        />
        <div className={styles["profile-editor__overlay"]}>
          <label
            htmlFor="profile-image-upload"
            className={styles["profile-editor__upload-btn"]}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z"
                fill="white"
              />
              <path
                d="M3 16.1317C3 17.6098 3 18.3488 3.35371 18.9101C3.70742 19.4714 4.36395 19.7849 5.677 20.412L6.323 20.7332C7.63605 21.3603 8.29257 21.6738 9 21.6738C9.70743 21.6738 10.364 21.3603 11.677 20.7332L12.323 20.412C13.636 19.7849 14.2926 19.4714 14.6463 18.9101C15 18.3488 15 17.6098 15 16.1317V15.8683C15 14.3902 15 13.6512 14.6463 13.0899C14.2926 12.5286 13.636 12.2151 12.323 11.588L11.677 11.2668C10.364 10.6397 9.70743 10.3262 9 10.3262C8.29257 10.3262 7.63605 10.6397 6.323 11.2668L5.677 11.588C4.36395 12.2151 3.70742 12.5286 3.35371 13.0899C3 13.6512 3 14.3902 3 15.8683V16.1317Z"
                fill="white"
              />
              <path
                d="M15 8V6C15 4.89543 14.1046 4 13 4H11C9.89543 4 9 4.89543 9 6V8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className={styles["profile-editor__upload-text"]}>
              사진 변경
            </span>
          </label>
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles["profile-editor__upload-input"]}
          />
        </div>
      </div>
      <div className={styles["profile-editor__size-info"]}>100 × 100</div>
    </div>
  );
};

export default ProfileImageEditor;
