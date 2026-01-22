import { useNavigate } from "react-router-dom";
import styles from "./InitList.module.scss";

const InitList = ({
  title,
  data,
}: {
  title: string;
  data: { keyword: string }[];
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles["init__list"]}>
      <h2>{title}</h2>
      <div className={styles["init__list__buttons"]}>
        {data.map((k: { keyword: string }) => (
          <button
            key={k.keyword}
            onClick={() => navigate(`/search/result?keyword=${k.keyword}`)}
          >
            {k.keyword}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InitList;
