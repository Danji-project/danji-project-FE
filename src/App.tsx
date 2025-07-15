

// export default App


import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './Landing/LandingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import './App.css'

const queryClient = new QueryClient();

function App() {
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (!isMounted) {
    return <div>로딩 중...</div>;
  }

  if (hasError) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h2>문제가 발생했습니다</h2>
        <p>페이지를 새로고침하거나 나중에 다시 시도해주세요.</p>
        <button onClick={() => window.location.reload()}>새로고침</button>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main className="wrapper">
          <LandingPage />
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
