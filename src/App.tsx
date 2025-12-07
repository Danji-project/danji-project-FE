// export default App
import { useState, useEffect } from "react";

import { BrowserRouter as Router } from "react-router";
import LandingIntro from "./components/landing/LandingIntro";
import AppSkeleton from "./components/common/app-skeleton/AppSkeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserInfoMutation } from "./hooks/useUserInfoMutation";

const queryClient = new QueryClient();

function App() {
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { getUserInfo } = useUserInfoMutation();

  useEffect(() => {
    // 초기 로그인 상태 확인
    const checkInitialLoginStatus = async () => {
      try {
        // 토큰이 있으면 사용자 정보 조회
        await new Promise((resolve) => {
          getUserInfo.mutate();
          resolve(true);
        });
      } catch (error) {
        console.error("초기 로그인 상태 확인 실패:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    checkInitialLoginStatus();

    const handleError = () => {
      setHasError(true);
    };

    globalThis.addEventListener("error", handleError);
    return () => globalThis.removeEventListener("error", handleError);
  }, []);

  // 초기화 완료 후 마운트 상태 설정
  useEffect(() => {
    if (isInitialized) {
      setTimeout(() => {
        setIsMounted(true);
      }, 500);
    }
  }, [isInitialized]);

  if (!isMounted) {
    return <AppSkeleton />;
  }

  if (hasError) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>문제가 발생했습니다</h2>
        <p>페이지를 새로고침하거나 나중에 다시 시도해주세요.</p>
        <button onClick={() => globalThis.location.reload()}>새로고침</button>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div id="main__app">
          <LandingIntro />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
