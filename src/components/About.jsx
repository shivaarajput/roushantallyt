import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center py-16 bg-gray-100"
    >
      {/* Title */}
      <h2 className="text-4xl font-bold text-gray-800 mb-8">About Me</h2>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center max-w-4xl px-6 space-y-8 md:space-y-0 md:space-x-8">
        {/* Image */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://raw.githubusercontent.com/shivaarajput/RaushanSir/refs/heads/master/static/assets/img/me.jpg"
            alt="About Me"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-lg text-gray-600 leading-relaxed">
            Hi, I’m <span className="font-semibold">Roushan Kumar</span>, a passionate
            <span className="font-semibold text-blue-600"> Tally Teacher</span> based in Biharsharif, India. I specialize in accounting with Tally and enjoy
            working with numbers to ensure accurate financial records.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            My journey in accounting started years ago, and since then, I’ve helped numerous students and professionals gain a solid understanding of Tally
            and accounting practices. I am committed to making complex concepts easy and accessible to everyone.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
