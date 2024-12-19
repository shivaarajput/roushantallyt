import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Main application
import Admin from "./pages/Admin"; // Admin dashboard

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Application */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
