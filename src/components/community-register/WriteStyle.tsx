import React, {
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import styles from "./WriteStyle.module.scss";

const WriteStyle = ({
  title,
  setTitle,
  content,
  setContent,
  files,
  setFiles,
}: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleContentKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setContent((prev) => prev + "<br />");
    }
  };

  const handleFileClick = () => {
    inputRef?.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    if (files.length < 10) {
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  React.useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <form>
      <div className={styles["write__style__wrapper"]}>
        <div className={styles["write__style__title"]}>
          <label>제목</label>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            onChange={handleTitle}
            value={title}
          />
        </div>
        <div className={styles["write__style__content"]}>
          <textarea
            onChange={handleContent}
            value={content}
            onKeyDown={handleContentKeyDown}
          />
        </div>
        <div className={styles["write__style__photo"]}>
          <label>사진 첨부</label>
          <input type="file" ref={inputRef} onChange={handleFile} multiple />
          <div className={styles["write__style__photo__button"]}>
            <button onClick={handleFileClick} type="button">
              <img src={"/icons/image.png"} alt="none-image" />
            </button>
            {files.length === 0 && (
              <div>
                <span>390 * 460</span>
                <span>최대 10장의 이미지 첨부가 가능합니다.</span>
              </div>
            )}
            <div className={styles["write__style__photo__lists"]}>
              {files.map((f: File) => (
                <div>
                  <img src={URL.createObjectURL(f)} alt={f.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default WriteStyle;
