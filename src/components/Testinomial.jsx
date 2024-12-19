import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database"; // Import Firebase functions

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]); // State to store testimonials
  const [error, setError] = useState(null);

  // Fetch data from Firebase on component mount
  useEffect(() => {
    const database = getDatabase(); // Initialize Firebase database
    const testimonialRef = ref(database, "testimonials"); // Reference to 'testimonials' in the database

    // Subscribe to value changes
    const unsubscribe = onValue(testimonialRef, (snapshot) => {
      const data = snapshot.val();
      // Transform object to an array with keys and values
      const loadedTestimonials = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : [];
      setTestimonials(loadedTestimonials); // Update state with fetched testimonials
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="testimonial" className="py-16 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Student Feedback</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Hear what our students have to say about their learning experience
          with us.
        </p>
      </div>

      {/* Smooth Scroll Testimonials */}
      <div className="flex overflow-x-auto snap-x snap-mandatory px-6 md:px-12 space-x-6 scrollbar-hide">
        {testimonials.length > 0 ? (
          testimonials
            .filter((testimonial) => testimonial.approved) // Filter only approved testimonials
            .map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md p-6 snap-center flex flex-col items-center text-center"
              >
                {/* Image */}
                <img
                  src={testimonial.image || "https://via.placeholder.com/100"}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {testimonial.name}
                </h3>
                {/* Feedback */}
                <Message feedback={testimonial.message} />
              </div>
            ))
        ) : (
          <p className="text-gray-600 italic mx-auto">Loading feedback...</p>
        )}
      </div>
    </section>
  );
};

// Truncate long messages with "Read More" functionality
const Message = ({ feedback }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const truncatedFeedback =
    feedback.length > 100 && !expanded
      ? `${feedback.slice(0, 100)}...`
      : feedback;

  return (
    <div>
      <p className="text-gray-600 italic">
        "{truncatedFeedback}"
      </p>
      {feedback.length > 100 && (
        <button
          onClick={toggleExpanded}
          className="text-blue-500 mt-2 text-sm underline"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default Testimonial;
