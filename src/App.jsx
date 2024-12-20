import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Main application
import Admin from "./pages/Admin"; // Admin dashboard
import NotFound from "./pages/NotFound"; // Not found page
import LoginPage from "./pages/LoginPage"; // Login page
import Loader from "./components/Loader"; // Login page
import { auth } from "./firebase"; // Firebase authentication import
import { onAuthStateChanged } from "firebase/auth"; // Auth state change handler

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null to indicate loading state
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Optionally, to track any authentication errors

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Set loading to false once authentication state is resolved
    });

    return () => unsubscribe(); // Cleanup subscription when the component unmounts
  }, []);

  // If authentication state is still being checked, show loading state
  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        {/* Main Application */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Dashboard (Protected Route) */}
        <Route
          path="/admin-private-route"
          element={isAuthenticated ? <Admin /> : <LoginPage />}
        />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* NotFound page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
