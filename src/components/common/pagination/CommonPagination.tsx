import type { Dispatch, SetStateAction } from "react";
import styles from "./CommonPagination.module.scss";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from "react-icons/bs";

const CommonPagination = ({
  pagination,
  totalResultCount,
  setPagination,
  perNumber,
}: {
  pagination: number;
  totalResultCount: number;
  setPagination: Dispatch<SetStateAction<number>>;
  perNumber: number;
}) => {
  const paginationAllLength = Math.floor(totalResultCount / perNumber);
  const paginationArray = Array.from(
    { length: paginationAllLength },
    (_, i) => i
  );

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className={styles["pagination__flex"]}>
      <button
        onClick={() => {
          setPagination(0);
          scrollToBottom();
        }}
      >
        <BsChevronDoubleLeft />
      </button>
      <button
        onClick={() => {
          if (pagination > 0) {
            setPagination((prev) => prev - 1);
            scrollToBottom();
          }
        }}
      >
        <BsChevronLeft />
      </button>
      {paginationArray.length > 10 ? (
        <>
          {pagination !== paginationArray.at(-1)! - 1 && (
            <>
              <button
                className={
                  pagination == paginationArray.at(-1)! - 1
                    ? ""
                    : styles["active"]
                }
              >
                {pagination + 1}
              </button>
              <span>...</span>
            </>
          )}
          <button
            className={
              pagination === paginationArray.at(-1)! - 1 ? styles["active"] : ""
            }
            onClick={() => setPagination(paginationArray.at(-1)! - 1)}
          >
            {paginationArray.at(-1)}
          </button>
        </>
      ) : (
        paginationArray.map((index) => (
          <button
            key={index}
            className={pagination === index ? styles["active"] : ""}
            onClick={() => {
              setPagination(index);
              scrollToBottom();
            }}
          >
            {index + 1}
          </button>
        ))
      )}
      <button
        onClick={() => {
          if (pagination < paginationArray.at(-1)! - 1) {
            setPagination((prev) => prev + 1);
            scrollToBottom();
          }
        }}
      >
        <BsChevronRight />
      </button>
      <button
        onClick={() => {
          setPagination(paginationArray.at(-1)! - 1);
          scrollToBottom();
        }}
      >
        <BsChevronDoubleRight />
      </button>
    </div>
  );
};

export default CommonPagination;
