import { useId } from "react";

interface IconButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  imageurl: string;
  text: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  active?: boolean;
}

export const IconButton = ({
  onClick,
  imageurl,
  text,
  className,
  id,
  disabled = false,
  active = false,
}: IconButtonProps) => {
  const btnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.preventDefault();
    onClick(e);
  };

  // 여러개의 element를 하나의 component로 연결
  const generateId = useId();
  const compareId = id || `checkbox-${generateId}`;

  return (
    <div className={`${className}`} style={{ width: "70px" }}>
      <button
        style={{
          cursor: "pointer",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: active ? "#F5F9FF" : "transparent",
          borderRadius: active ? "12px" : undefined,
        }}
        id={compareId}
        onClick={btnClick}
      >
        <img
          style={{ margin: "10px", width: "24px", height: "24px" }}
          id={compareId}
          src={imageurl}
        />
        <label
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: active ? "#2773e6" : "#97BBFF",
          }}
          id={compareId}
        >
          {text}
        </label>
      </button>
    </div>
  );
};
