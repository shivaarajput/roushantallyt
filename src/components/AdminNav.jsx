import React, { useState } from "react";
import { database } from "../firebase";
import { ref, update } from "firebase/database";

const AdminNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    backgroundImage: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
      github: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["facebook", "twitter", "linkedin", "github"].includes(name)) {
      setProfile((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const profileRef = ref(database, "profile");
    update(profileRef, profile)
      .then(() => {
        alert("Profile updated successfully!");
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      });
  };

  return (
    <div>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Background Image */}
              <div>
                <label className="block text-gray-700 font-medium">Background Image URL</label>
                <input
                  type="text"
                  name="backgroundImage"
                  value={profile.backgroundImage}
                  onChange={handleInputChange}
                  placeholder="Enter background image URL"
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Social Links */}
              {Object.keys(profile.socialLinks).map((social) => (
                <div key={social}>
                  <label className="block text-gray-700 font-medium capitalize">
                    {social} Link
                  </label>
                  <input
                    type="text"
                    name={social}
                    value={profile.socialLinks[social]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${social} link`}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNav;
