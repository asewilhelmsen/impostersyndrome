import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoggInn from "./pages/LoggInn";
import Hjem from "./pages/Hjem";
import StartAktivitet from "./pages/StartAktivitet";
import Retro from "./pages/Retro";
import { useTeamContext } from "./TeamContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase/firebase_setup/firebase";

function App() {
  const { setTeamBruker } = useTeamContext();

  const bruker = getAuth(app);
  const navigate = useNavigate();

  onAuthStateChanged(bruker, (teamBruker) => {
    if (teamBruker) {
      console.log("setter team bruker i App");
      setTeamBruker(teamBruker);
    } else {
      navigate("/");
    }
  });
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
