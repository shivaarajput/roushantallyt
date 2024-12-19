import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold text-white">Shiva</h3>
          <p className="text-gray-400 mt-4">
            At Shiva, we are committed to delivering exceptional services that exceed our clients' expectations. We specialize in providing innovative solutions across various domains, ensuring quality and customer satisfaction every step of the way.
          </p>
        </div>

          {/* Quick Links */}                                                                                       <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>                                    <ul className="space-y-2">                                                                                  <li>                                                                                                        <a href="#home" className="text-gray-400 hover:text-gray-200 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-400 hover:text-gray-200 transition">
                About
              </a>
            </li>
            <li>
              <a href="#sayari" className="text-gray-400 hover:text-gray-200 transition">
                Sayari
              </a>
            </li>
            <li>
              <a href="#gallery" className="text-gray-400 hover:text-gray-200 transition">
                Gallery
              </a>
            </li>
            <li>
              <a href="#testimonial" className="text-gray-400 hover:text-gray-200 transition">
                Testimonial
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:text-gray-200 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <p className="text-gray-400 mb-4">
            Stay connected with us through social media!
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/shivamsinghamrajput"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://github.com/shivaarajput"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://t.me/themoonlightphoenix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/shivadhruva"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        <p>&copy; 2023 Shiva. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
