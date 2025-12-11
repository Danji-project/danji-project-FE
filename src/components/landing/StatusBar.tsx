import { useEffect, useState } from "react";

const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const period = now.getHours() < 12 ? "오전" : "오후";
      const displayHours = now.getHours() % 12 || 12;
      setCurrentTime(
        `${period} ${String(displayHours).padStart(2, "0")}:${minutes}`
      );
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <div className="time">{currentTime || "로딩중..."}</div>
      <div className="icon__wrapper">
        <div className="wifi">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="battery">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5h6.75V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
