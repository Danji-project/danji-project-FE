import { useRef, useState } from "react";
import { useUserInfo } from "../../stores/userStore";
import { useProfileImageUpload } from "../../hooks/useProfileImageUpload";
import styles from "./ProfileImageEditor.module.scss";

const ProfileImageEditor = () => {
  const { profileImage } = useUserInfo();
  const { uploadProfileImage, uploadPending } = useProfileImageUpload();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadProfileImage(file);
    }
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className={styles.profile__editor}>
      <div className={styles.profile__editor__image}>
        {(imageLoading || uploadPending) && (
          <div className={styles.profile__editor__loading}>
            <div className={styles.profile__editor__spinner}></div>
          </div>
        )}
        <img
          src={
            !profileImage ||
            profileImage === null ||
            profileImage === "/profile_imgSrc.jpg"
              ? "./profile_imgSrc.jpg"
              : "https://s3.ap-northeast-2.amazonaws.com/danjitalk/" +
                profileImage
          }
          alt="profile"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
          style={{ opacity: imageLoading || uploadPending ? 0 : 1 }}
        />
        <button
          type="button"
          className={styles.profile__editor__edit}
          onClick={() => fileRef.current?.click()}
          disabled={uploadPending || imageLoading}
        >
          <img src={"/icons/image-edit.svg"} alt="edit" />
        </button>
      </div>
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ProfileImageEditor;
