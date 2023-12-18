import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import StartActivity from "./pages/StartActivity";
import Retro from "./pages/Retro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home teamData={""} />} />
      <Route path="/start" element={<StartActivity />} />
      <Route path="/retro" element={<Retro />} />
    </Routes>
  );
}

export default App;
