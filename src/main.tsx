// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { LoginPage } from './pages/loginPage/loginPage.tsx'
// import LandingPage from './Landing/LandingPage.tsx'
// import { BrowserRouter } from 'react-router-dom';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     {/* <App /> */}
//     {/* <LoginPage /> */}
//     <BrowserRouter>
//       <LandingPage/>
//     </BrowserRouter>
//   </StrictMode>
// )

import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import React from 'react';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('루트 엘리먼트가 없습니다.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);