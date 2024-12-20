import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, update, onValue } from "firebase/database";
import { supabase } from "../supabaseClient";
import { FaPencilAlt, FaHamburger, FaTimes } from "react-icons/fa"; // Pencil icon for editing, Hamburger for menu, Times for closing

const AdminNav = () => {
  const [profile, setProfile] = useState({
    name: "",
    profileImage: "",
    backgroundImage: "",
    socialLinks: {
      phone: "",
      instagram: "",
      youtube: "",
      telegram: "",
    },
  });
  const [dataLoaded, setDataLoaded] = useState(false); // Flag to track data loading


  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  // Load profile data from the database on mount
  useEffect(() => {
    const profileRef = ref(database, "profile");
    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data && !dataLoaded) {
        setProfile(data); // Set profile data if not loaded
        setDataLoaded(true); // Mark data as loaded
      }
    });
  }, [dataLoaded]); // Only run effect when dataLoaded changes

  const showMessage = (type, text, duration = 3000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({}), duration);
  };

  // Toggle profile visibility (open/close modal)
  const toggleProfileVisibility = () => setIsProfileOpen((prev) => !prev);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["phone", "instagram", "youtube", "telegram"].includes(name)) {
      setProfile((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle profile image upload
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingProfile(true);
    const staticFileName = "profile-image.jpg"; // Static name for the profile image

    try {
      // Upload the new profile image with the static name (will overwrite the old one)
      const { data, error } = await supabase.storage
        .from("superman")
        .upload(`profile/${staticFileName}`, file, { cacheControl: "3600", upsert: true });

      if (error) throw new Error("Failed to upload profile image.");

      // Get the new image URL after upload
      const imageUrl = `https://fsubnjfvklblrbyyetps.supabase.co/storage/v1/object/public/superman/profile/${staticFileName}`;

      // Update state with the new profile image URL
      setProfile((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));

      showMessage("success", "Profile image uploaded successfully!");
    } catch (error) {
      console.error(error);
      showMessage("error", "Error uploading profile image.");
    } finally {
      setUploadingProfile(false);
    }
  };

  // Handle background image upload
  const handleBackgroundImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingBackground(true);
    const staticFileName = "background-image.jpg"; // Static name for the background image

    try {
      // Upload the new background image
      const { data, error } = await supabase.storage
        .from("superman")
        .upload(`profile/${staticFileName}`, file, { cacheControl: "3600", upsert: true});

      if (error) throw new Error("Failed to upload background image.");

      // Get the new image URL after upload
      const imageUrl = `https://fsubnjfvklblrbyyetps.supabase.co/storage/v1/object/public/superman/profile/${staticFileName}`;

      // Update state with the new background image URL
      setProfile((prev) => ({
        ...prev,
        backgroundImage: imageUrl,
      }));
      showMessage("success", "Background image uploaded successfully!");
    } catch (error) {
      console.error(error);
      showMessage("error", "Error uploading background image.");
    } finally {
      setUploadingBackground(false);
    }
  };

  // Save profile data to the database
  const handleSave = async () => {
    try {
      const profileRef = ref(database, "profile");
      await update(profileRef, profile);
      showMessage("success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      showMessage("error", "Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      {/* Hamburger Button to open the profile modal */}
      <button
        className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-full"
        onClick={toggleProfileVisibility}
      >
        <FaHamburger size={24} />
      </button>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
            {/* Close (times) Icon to close the modal */}

            {/* Background and Profile Image */}
            <div className="relative">
              {/* Background Image */}
              <img
                src={`https://fsubnjfvklblrbyyetps.supabase.co/storage/v1/object/public/superman/profile/background-image.jpg?${new Date().getTime()}` || "https://via.placeholder.com/800x300"}
                alt="Background"
                className="w-full h-48 object-cover rounded-t-lg"
              />

              {/* Profile Image */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                <img
                  src={`https://fsubnjfvklblrbyyetps.supabase.co/storage/v1/object/public/superman/profile/profile-image.jpg?${new Date().getTime()}` || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                />
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white px-2 py-1 rounded-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                  />
                  {uploadingProfile ? "Uploading..." : <FaPencilAlt className="w-4 h-4" />}
                </label>
              </div>


              {/* Background Image Change */}
              <label className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundImageUpload}
                  className="hidden"
                />
                {uploadingBackground ? "Uploading..." : <FaPencilAlt className="w-4 h-4" />}
              </label>
            </div>

            <button
              onClick={toggleProfileVisibility}
              className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full"
            >
              <FaTimes size={24} />
            </button>


            {/* Success/Failure Message */}
            {message.text && (
              <div
                className={`mt-2 p-2 rounded ${
                  message.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Profile Details */}
            <div className="p-6 space-y-4">
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

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold">Social Links</h3>
                {Object.keys(profile.socialLinks).map((social) => (
                  <div key={social} className="mb-2">
                    <label className="block text-gray-700 capitalize">
                      {social === "phone" ? "Phone Number" : `${social} Link`}
                    </label>
                    <input
                      type="text"
                      name={social}
                      value={profile.socialLinks[social]}
                      onChange={handleInputChange}
                      placeholder={`Enter ${social}`}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNav;
