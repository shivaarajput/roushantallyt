import React from "react";

const Sayari = () => {
  // Dynamic list of YouTube video IDs
  const videos = [
    {
        "title": "Maa ka aanchal Maa ka aanchal nhi maano bhrahma ka koi ashtra ho",
        "id": "NcCw8zDtq5g"
    },
    {
        "title": "Achhe aur bure wakt me maine sirf apni maa ko apne sath paya hai",
        "id": "4zIoZvWoQZM"
    },
    {
        "title": "Jitna Maa mujhse pyaar karti hai utna koi kar payega kya",
        "id": "RG1ECShCxTY"
    },
    {
        "title": "Kya hi koi maa ka chehra padh payega",
        "id": "ZeBqKNCRWVk"
    }
  ];

  return (
    <section id="sayari" className="py-16 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Sayari</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore the wonders of Sayari! Here you'll find a collection of
          curated videos showcasing the best highlights, explorations, and
          tutorials about Sayari. Dive in and let your curiosity guide you.
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
        {videos.map((video) => (
          <div key={video.id} className="rounded-lg overflow-hidden shadow-md">
            {/* Embedded YouTube Video */}
            <iframe
              className="w-full h-56"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Video Title */}
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-700">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sayari;
