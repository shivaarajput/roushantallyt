import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

const Home = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    backgroundImage: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
      github: "",
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
          backgroundImage: data.backgroundImage || "https://raw.githubusercontent.com/shivaarajput/RaushanSir/refs/heads/master/static/assets/img/home-bg.jpg",
          socialLinks: {
            facebook: data.socialLinks?.facebook || "#",
            twitter: data.socialLinks?.twitter || "#",
            linkedin: data.socialLinks?.linkedin || "#",
            github: data.socialLinks?.github || "#",
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
            <a
              href={profileData.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all"
            >
              <FaFacebookF size={20} className="text-white" />
            </a>
            <a
              href={profileData.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-400 hover:bg-blue-500 transition-all"
            >
              <FaTwitter size={20} className="text-white" />
            </a>
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-700 hover:bg-blue-800 transition-all"
            >
              <FaLinkedinIn size={20} className="text-white" />
            </a>
            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-800 transition-all"
            >
              <FaGithub size={20} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
