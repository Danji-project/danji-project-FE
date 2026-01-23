import { useState, useEffect } from "react";

import { BrowserRouter as Router } from "react-router";
import LandingIntro from "./components/landing/LandingIntro";
import HomeSkeleton from "./components/common/home-skeleton/HomeSkeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WebSocketProvider } from "./hooks/WebSocketContext";

const queryClient = new QueryClient();

// QueryClientProvider 내부에서 사용하는 컴포넌트
function AppContent() {
  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    globalThis.addEventListener("error", () => {
      setHasError(true);
    });
    return () => {
      setIsMounted(false);
      globalThis.removeEventListener("error", () => {
        setHasError(false);
      });
    };
  }, []);

  if (!isMounted) {
    return <HomeSkeleton />;
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
    <Router>
      <div id="main__app">
        <LandingIntro />
      </div>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <AppContent />
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
