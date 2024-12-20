// components/Logout.jsx
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Your Firebase configuration path
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { FiLogOut } from "react-icons/fi"; // Logout icon

export default function Logout() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const navigate = useNavigate();

  // Function to handle the logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      navigate("/login"); // Redirect to the login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      {/* Logout Button */}
      <button
        onClick={() => setIsModalOpen(true)} // Open modal when clicked
        className="fixed top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200 ease-in-out"
        title="Logout"
      >
        <FiLogOut className="text-xl" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setIsModalOpen(false)} // Close modal when cancelled
                className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
