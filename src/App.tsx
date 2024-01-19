import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoggInn from "./pages/LoggInn";
import Hjem from "./pages/Hjem";
import StartAktivitet from "./pages/StartAktivitet";
import Retro from "./pages/Retro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoggInn />} />
      <Route path="/hjem" element={<Hjem />} />
      <Route path="/startaktivitet" element={<StartAktivitet />} />
      <Route path="/retrospektiv" element={<Retro />} />
    </Routes>
  );
}

export default App;
