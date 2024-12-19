// src/pages/NotFound.jsx
import React from "react";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mt-4">
          The page you are looking for doesn't exist. Please check the URL or go back to the home page.
        </p>
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800 mt-6 inline-block text-lg"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
