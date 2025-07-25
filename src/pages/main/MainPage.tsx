import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserInfoContext";

const MainPageHeader = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleMyPageClick = () => {
    if (user.isLogin) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        height: "56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <h1 style={{ fontWeight: "600", fontSize: "20px", margin: 0 }}>
        DANJITALK
      </h1>

      <button
        onClick={handleMyPageClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          backgroundColor: user.isLogin ? "#f0f0f0" : "transparent",
        }}
        title={user.isLogin ? "마이페이지" : "로그인"}
      >
        {user.isLogin ? (
          // 로그인된 경우 - 사용자 아바타
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {user.email ? user.email.charAt(0).toUpperCase() : "U"}
          </div>
        ) : (
          // 로그인되지 않은 경우 - 사람 아이콘
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              fill="#666"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export const MainPage = () => {
  return (
    <>
      <div>
        <MainPageHeader />
      </div>
    </>
  );
};
