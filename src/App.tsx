import React from "react";

import { BrowserRouter as Router } from "react-router";
import LandingIntro from "./components/landing/LandingIntro";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
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
