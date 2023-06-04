import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
