import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
<div className="flex-shrink-0 flex items-center">
  <img src="https://raw.githubusercontent.com/shivaarajput/RaushanSir/refs/heads/master/static/assets/img/logo.png" alt="Logo" className="w-20 h-auto" />
</div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6" onClick={toggleMenu}>
              <a href="#home" className="text-gray-800 hover:text-blue-600">
                Home
              </a>
              <a href="#about" className="text-gray-800 hover:text-blue-600">
                About
              </a>
              <a href="#sayari" className="text-gray-800 hover:text-blue-600">
                Sayari
              </a>
              <a href="#gallery" className="text-gray-800 hover:text-blue-600">
                Gallery
              </a>
              <a href="#testimonial" className="text-gray-800 hover:text-blue-600">
                Testimonial
              </a>
              <a href="#contact" className="text-gray-800 hover:text-blue-600">
                Contact
              </a>
              <a href="/admin-private-route" className="text-gray-800 hover:text-blue-600">
                Admin Login
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-800 hover:text-blue-600 focus:outline-none"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" onClick={toggleMenu}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#home"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </a>
              <a
                href="#sayari"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Sayari
              </a>
              <a
                href="#gallery"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Gallery
              </a>
              <a
                href="#testimonial"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Testimonial
              </a>
              <a
                href="#contact"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </a>
              <a 
                href="/admin-private-route" 
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Admin Login
              </a>
            </div>
          </div>
        )}
      </nav>

      
    </>
  );
};

export default Navbar;
