import React from "react";
import Home from "./pages/Home";
import "./App.css";
import "./styles/btn.css";
import "./styles/BarraSuperior.css";
import "./styles/Login.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./components/UserContext";
import ProtectedRoute from "./Auth/ProtectedRoute"
import Login from "./components/Login";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;


