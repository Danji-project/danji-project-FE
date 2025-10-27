import { useState } from "react";
import Header from "../../layouts/Header";
import WriteStyle from "../../components/community-register/WriteStyle";
import { useNavigate, useParams } from "react-router-dom";
import { fetchedApartments } from "../../assets/mock/apartmentMock";
import { useFeedRegister } from "../../hooks/useFeedRegister";

const CommunityWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const { id } = useParams();

  const filteredApartData = fetchedApartments.filter(
    (item) => item.id === Number(id)
  )[0];

  const { feedRegister, feedRegisterPending } = useFeedRegister(
    title,
    content,
    filteredApartData.id
  );

  return (
    <>
      <Header
        title="글쓰기"
        hasBackButton
        buttonText="등록"
        buttonDisabled={!title || !content || files.length === 0}
        onClick={() => {
          feedRegister();
          if (!feedRegisterPending)
            navigate(`/apart-info/${filteredApartData.id}`);
        }}
      />
      <WriteStyle
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        files={files}
        setFiles={setFiles}
      />
    </>
  );
};

export default CommunityWrite;
