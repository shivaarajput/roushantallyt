import { useState, useEffect } from "react";

const GallerySection = ({ gallery }) => {
  const [filter, setFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const categories = gallery
    ? ["All", ...new Set(gallery.map(g => g.category || "General"))]
    : [];

  const filtered =
    filter === "All"
      ? gallery || []
      : (gallery || []).filter(g => g.category === filter);

  // ✅ Always runs
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") setSelectedIndex(null);

      if (e.key === "ArrowRight")
        setSelectedIndex(prev =>
          prev === filtered.length - 1 ? 0 : prev + 1
        );

      if (e.key === "ArrowLeft")
        setSelectedIndex(prev =>
          prev === 0 ? filtered.length - 1 : prev - 1
        );
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, filtered.length]);

  // ✅ Early return AFTER hooks
  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="gallery" className="py-24 px-4 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Heading + Filter */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Life at Tally Teacher
          </h2>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => {
                  setFilter(c);
                  setSelectedIndex(null);
                }}
                className={`px-6 py-2 rounded-full font-bold transition-colors ${filter === c
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setSelectedIndex(index)}
              className="relative group overflow-hidden rounded-xl aspect-square bg-slate-200 dark:bg-slate-800 cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-bold text-sm md:text-base">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-sm">

            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-slate-800 dark:text-white text-3xl"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={() =>
                setSelectedIndex(prev =>
                  prev === 0 ? filtered.length - 1 : prev - 1
                )
              }
              className="absolute left-6 text-slate-800 dark:text-white text-5xl font-bold"
            >
              ‹
            </button>

            {/* Image */}
            <div className="max-w-5xl w-full px-6 text-center">
              <img
                src={filtered[selectedIndex].url}
                alt=""
                className="max-h-[80vh] mx-auto rounded-xl"
              />
              <p className="text-slate-800 dark:text-white mt-4 text-lg">
                {filtered[selectedIndex].caption}
              </p>
            </div>

            {/* Next */}
            <button
              onClick={() =>
                setSelectedIndex(prev =>
                  prev === filtered.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-6 text-slate-800 dark:text-white text-5xl font-bold"
            >
              ›
            </button>

          </div>
        )}

      </div>
    </section>
  );
};

export default GallerySection;