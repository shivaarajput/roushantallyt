import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; // Import Firebase functions

const Gallery = () => {
  const [images, setImages] = useState([]); // State to store images
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  // Fetch images from Firebase
  useEffect(() => {
    const database = getDatabase(); // Initialize Firebase database
    const galleryRef = ref(database, "gallery"); // Reference to 'gallery' in the database

    // Subscribe to value changes
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      // Transform object to an array with keys and values
      const loadedImages = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : [];
      setImages(loadedImages); // Update state
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  // Function to open the modal with the clicked image
  const openImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Function to close the modal
  const closeModal = () => {
    setCurrentImageIndex(null);
  };

  // Navigate to the next image
  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Navigate to the previous image
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <section id="gallery" className="py-16 bg-gray-100">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Gallery</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Dive into our collection of stunning visuals. From mesmerizing sunsets
          to breathtaking landscapes, explore the beauty captured through our lens.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-12">
        {images.map((image, index) => (
         image.approved ? (
          <div
            key={image.id} // Use Firebase ID as the key
            className="relative group overflow-hidden rounded-lg shadow-lg"
            onClick={() => openImage(index)}
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.alt || "Gallery Image"} // Default alt text if missing
              className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110 cursor-pointer"
            />
          </div>
         ) : null
        ))}
      </div>

      {/* Full-Screen Modal */}
      {currentImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl font-bold p-2 rounded-md hover:bg-gray-700 transition"
          >
            ✕
          </button>
          <button
            onClick={prevImage}
            className={`absolute left-4 text-white text-2xl p-4 rounded-md hover:bg-gray-700 transition ${
              currentImageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentImageIndex === 0}
          >
            ←
          </button>
          <img
            src={images[currentImageIndex]?.src}
            alt={images[currentImageIndex]?.alt || "Gallery Image"}
            className="max-w-4xl max-h-[90%] object-contain"
          />
          <button
            onClick={nextImage}
            className={`absolute right-4 text-white text-2xl p-4 rounded-md hover:bg-gray-700 transition ${
              currentImageIndex === images.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentImageIndex === images.length - 1}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
