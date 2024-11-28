import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import Catinfo from "./components/Catinfo";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Background />} />
        <Route path="/catinfo" element={<Catinfo />} />
      </Routes>
    </Router>
  );
};

export default App;