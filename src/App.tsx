import React from "react";

import { BrowserRouter as Router } from "react-router";
import LandingIntro from "./components/landing/LandingIntro";

function App() {
  return (
    <Router>
      <div id="main__app">
        <LandingIntro />
      </div>
    </Router>
  );
}

export default App;
