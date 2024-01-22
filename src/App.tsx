import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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

  onAuthStateChanged(bruker, (teamBruker) => {
    if (teamBruker) {
      console.log("setter team bruker i App");
      setTeamBruker(teamBruker);
    } else {
    }
  });
  return (
    <Routes>
      <Route path="/" element={<LoggInn />} />
      <Route path="/startaktivitet" element={<StartAktivitet />} />
      <Route path="/retrospektiv" element={<Retro />} />
    </Routes>
  );
}

export default App;
