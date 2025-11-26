import ChattingBodies from "../../components/common/chatting-bodies/ChattingBodies";
import Header from "../../layouts/Header";
import styles from "./ChattingPage.module.scss";

const ChattingPage = () => {
  return (
    <div className={styles["chatting__page"]}>
      <Header title={"채팅"} hasBackButton />
      <ChattingBodies />
    </div>
  );
};

export default ChattingPage;
