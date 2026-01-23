import React from "react";
import { useFeedRegisterStore } from "../../stores/useFeedRegisterStore";
import styles from "./CommunityWriteContents.module.scss";
import CommunityWriteInput from "./CommunityWriteInput";
import { useModalTextStore } from "../../stores/useModalText";
import { usePendingStore } from "../../stores/usePendingStore";
import TextModal from "../../components/common/text-modal/TextModal";

const CommunityWriteContents = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    setFile,
    previewUrls,
    setPreviewUrls,
  } = useFeedRegisterStore();

  const { setModalText, setModalTitle, modalText } = useModalTextStore();
  const { setModalPending, modalPending } = usePendingStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (files.length > 5) {
      setModalTitle("경고");
      setModalText("최대 5개까지만 첨부할 수 있습니다.");
      setModalPending(true);
      e.target.value = "";
      return;
    }

    setFile(Array.from(files));

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleRemoveImage = (index: number) => {
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newUrls);
  };

  const titleErrorMessage = title.trim() === "" ? "제목을 입력해주세요." : "";
  const titleValid = title.trim() !== "";

  const contentErrorMessage =
    content.trim() === "" ? "내용을 입력해주세요" : "";
  const contentValid = content.trim() !== "";

  return (
    <div className={styles["community__write__wrapper"]}>
      {modalPending && (
        <TextModal
          text={modalText}
          usingConfirm
          onConfirm={() => setModalPending(false)}
        />
      )}
      <CommunityWriteInput
        title={"제목"}
        isTitle
        placeholder={"제목을 입력해주세요."}
        titleData={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        errorMessage={titleErrorMessage}
        valid={titleValid}
      />
      <CommunityWriteInput
        isTextArea
        placeholder={"내용을 입력해주세요"}
        textAreaData={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        errorMessage={contentErrorMessage}
        valid={contentValid}
      />
      <CommunityWriteInput
        title={"사진첨부"}
        isPhoto
        onFileChange={handleFileChange}
        previewUrls={previewUrls}
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
};

export default CommunityWriteContents;
