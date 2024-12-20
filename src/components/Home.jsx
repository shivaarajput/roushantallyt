import React, { useState, useEffect } from "react";
import { FaPhone, FaInstagram, FaYoutube, FaTelegramPlane } from "react-icons/fa"; // New icons for the social links
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

const Home = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    backgroundImage: "",
    socialLinks: {
      phone: "",
      instagram: "",
      youtube: "",
      telegram: "",
    },
  });

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const profileRef = ref(database, "profile");

    onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfileData({
          name: data.name || "Roushan Kumar",
          backgroundImage: `https://fsubnjfvklblrbyyetps.supabase.co/storage/v1/object/public/superman/profile/profile-image.jpg?${new Date().getTime()}` || "https://via.placeholder.com/800x300",
          socialLinks: {
            phone: data.socialLinks?.phone || "#",
            instagram: data.socialLinks?.instagram || "#",
            youtube: data.socialLinks?.youtube || "#",
            telegram: data.socialLinks?.telegram || "#",
          },
        });
      }
    });
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      {/* Main Content Wrapper */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center px-6 py-12">
        {/* Left Side: Profile Image */}
        <div className="lg:w-1/2 w-full mb-8 lg:mb-0 flex justify-center">
          <div className="relative w-64 h-64 lg:w-80 lg:h-80 overflow-hidden rounded-full border-4 border-gray-300 shadow-lg">
            <img
              src={profileData.backgroundImage}
              alt={profileData.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right Side: Profile Info */}
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{profileData.name}</h1>
          <h2 className="text-xl text-gray-600 mb-6">
            I’m a <span className="text-blue-500 font-semibold">Tally Teacher</span>
          </h2>

          {/* Social Media Links */}
          <div className="flex justify-center lg:justify-start gap-6 mt-6">
            {/* Phone Link */}
            <a
              href={`tel:${profileData.socialLinks.phone}`}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600 transition-all"
            >
              <FaPhone size={20} className="text-white" />
            </a>

            {/* Instagram Link */}
            <a
              href={profileData.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-pink-500 hover:bg-pink-600 transition-all"
            >
              <FaInstagram size={20} className="text-white" />
            </a>

            {/* YouTube Link */}
            <a
              href={profileData.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 transition-all"
            >
              <FaYoutube size={20} className="text-white" />
            </a>

            {/* Telegram Link */}
            <a
              href={profileData.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-all"
            >
              <FaTelegramPlane size={20} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
