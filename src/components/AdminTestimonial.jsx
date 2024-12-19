import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, push, onValue, remove, update } from "firebase/database";

const AdminTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    image: "",
    message: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  useEffect(() => {
    const testimonialsRef = ref(database, "testimonials");
    onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      const feedback = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setTestimonials(feedback);
    });
  }, []);

  const addTestimonial = () => {
    if (newTestimonial.name && newTestimonial.image && newTestimonial.message) {
      const testimonialsRef = ref(database, "testimonials");
      push(testimonialsRef, { ...newTestimonial, approved: false });
      setNewTestimonial({ name: "", image: "", message: "" });
    }
  };

  const deleteTestimonial = (id) => {
    const testimonialRef = ref(database, `testimonials/${id}`);
    remove(testimonialRef);
    setShowConfirmation(false); // Close the confirmation modal
    setTestimonialToDelete(null); // Reset the testimonial to delete
  };

  const toggleApproval = (id, approved) => {
    const testimonialRef = ref(database, `testimonials/${id}`);
    update(testimonialRef, { approved: !approved });
  };

  const handleDeleteClick = (id) => {
    setTestimonialToDelete(id); // Set the testimonial ID to delete
    setShowConfirmation(true); // Show the confirmation modal
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation modal
    setTestimonialToDelete(null); // Reset the testimonial to delete
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage Testimonials</h2>

      {/* Add Testimonial Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newTestimonial.name}
          onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newTestimonial.image}
          onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Message"
          value={newTestimonial.message}
          onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <button onClick={addTestimonial} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add Testimonial
        </button>
      </div>

      {/* Horizontal Scrolling Testimonials */}
      <div className="flex overflow-x-auto space-x-6 px-6 py-4 scrollbar-hide">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="flex-shrink-0 w-64 border rounded-lg p-4">
            <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mb-2" />
            <p className="font-bold">{testimonial.name}</p>
            
            {/* Testimonial Message with "See More" functionality */}
            <MessageFeedback message={testimonial.message} />

            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => toggleApproval(testimonial.id, testimonial.approved)}
                className={`px-4 py-2 rounded-lg ${
                  testimonial.approved ? "bg-green-600" : "bg-gray-600"
                } text-white`}
              >
                {testimonial.approved ? "Hide" : "Show"}
              </button>
              <button
                onClick={() => handleDeleteClick(testimonial.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-4 max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800">
              Are you sure you want to delete this testimonial?
            </h3>
            <p className="text-gray-600">
              This action cannot be undone. Please confirm.
            </p>
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => deleteTestimonial(testimonialToDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Component to handle the "See More" functionality for testimonial messages
const MessageFeedback = ({ message }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const truncatedMessage = message.length > 100 && !expanded ? `${message.slice(0, 100)}...` : message;

  return (
    <div>
      <p className="text-gray-700">"{truncatedMessage}"</p>
      {message.length > 100 && (
        <button
          onClick={toggleExpanded}
          className="text-blue-500 mt-2 text-sm underline"
        >
          {expanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default AdminTestimonial;
