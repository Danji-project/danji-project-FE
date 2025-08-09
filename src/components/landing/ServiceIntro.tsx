import { useNavigate, useLocation } from "react-router-dom";

const ServiceIntro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChatActive = location.pathname.startsWith("/chat");

  const handleChatClick = () => {
    navigate("/chat");
  };

  return (
    <div className="service-intro">
      <div className="logo-wrapper">
        <img src="/logo-danji.png" alt="logo" />
      </div>
      <div className="logo-name">
        <span>단지톡</span>
        <span>아파트 생활의 시작</span>
      </div>
      <div className="service-body">
        <h3>단지 생활을 더 쉽게!</h3>
        <span>관리자와 입주민을 위한 스마트한 소통 플랫폼</span>
      </div>
      <ul className="service-list">
        <li>
          <button
            onClick={handleChatClick}
            aria-current={isChatActive ? "page" : undefined}
            style={{
              color: isChatActive ? "#2773e6" : undefined,
              fontWeight: isChatActive ? 700 : undefined,
              borderBottom: isChatActive ? "2px solid #2773e6" : undefined,
            }}
          >
            채팅
          </button>
        </li>
        <li>
          <button>공지사항</button>
        </li>
        <li>
          <button>시설정보</button>
        </li>
        <li>
          <button>문의하기</button>
        </li>
      </ul>
    </div>
  );
};

export default ServiceIntro;
