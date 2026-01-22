import { useRef } from "react";
import styles from "./CommunityWriteInput.module.scss";
import { IoMdClose } from "react-icons/io";

const CommunityWriteInput = ({
  title,
  isTitle,
  isTextArea,
  isPhoto,
  placeholder,
  titleData,
  textAreaData,
  onChange,
  onFileChange,
  onEnter,
  previewUrls,
  onRemoveImage,
  errorMessage,
  valid,
}: {
  title?: string;
  isTitle?: boolean;
  isTextArea?: boolean;
  isPhoto?: boolean;
  placeholder?: string;
  titleData?: string;
  textAreaData?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  previewUrls?: string[];
  onRemoveImage?: (index: number) => void;
  errorMessage?: string;
  valid?: boolean;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles["community__write__input"]}>
      {title && <h2>{title}</h2>}
      {isTitle && (
        <>
          <input
            type="text"
            placeholder={placeholder}
            value={titleData}
            onChange={onChange}
          />
          {!valid && errorMessage && (
            <p className={styles["error__message"]}>{errorMessage}</p>
          )}
        </>
      )}
      {isTextArea && (
        <>
          <textarea
            placeholder={placeholder}
            value={textAreaData}
            onChange={onChange}
            onKeyDown={onEnter}
          />
          {!valid && errorMessage && (
            <p className={styles["error__message"]}>{errorMessage}</p>
          )}
        </>
      )}
      {isPhoto && (
        <>
          <input type="file" multiple onChange={onFileChange} ref={fileRef} />
          <div className={styles["file__upload"]}>
            <button onClick={() => fileRef.current?.click()} type="button">
              <img src="/icons/image.svg" alt="images" />
            </button>
            <p>
              390 * 460 <br /> 최대 10장의 이미지 첨부가 가능합니다.
            </p>
          </div>
          {previewUrls && previewUrls.length > 0 && (
            <div className={styles["preview__container"]}>
              {previewUrls.map((url, index) => (
                <div key={url} className={styles["preview__image__container"]}>
                  <img src={url} alt="preview" />
                  <button type="button" onClick={() => onRemoveImage?.(index)}>
                    <IoMdClose />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommunityWriteInput;
