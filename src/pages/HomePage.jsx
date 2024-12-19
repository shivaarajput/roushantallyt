import React from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import About from "../components/About";
import Sayari from "../components/Sayari";
import Gallery from "../components/Gallery";
import Testinomial from "../components/Testinomial";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Home Section */}
      <Home />

      {/* About Section */}
      <About />

      {/* Sayari Section */}
      <Sayari />

      {/* Gallery Section */}
      <Gallery />

      {/* Testinomial Section */}
      <Testinomial />

      {/* Contact Section */}
      <Contact />

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default HomePage;
