import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, push, onValue, remove, update } from "firebase/database";
import { supabase } from "../supabaseClient"; // Assuming you are using Supabase for image storage

const AdminTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    image: null,
    message: "",
  });
  const [uploading, setUploading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const testimonialsRef = ref(database, "testimonials");
    onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      const feedback = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setTestimonials(feedback);
    });
  }, []);

  // Handle file input change
  const handleImageChange = (e) => {
    setNewTestimonial({ ...newTestimonial, image: e.target.files[0] });
  };

  // Add new testimonial to Firebase and upload image to Supabase
  const addTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.image || !newTestimonial.message) {
      setErrorMessage("All fields are required!");
      setSuccessMessage("");
      return;
    }

    setUploading(true);
    setErrorMessage("");

    const file = newTestimonial.image;
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("superman")
      .upload(`testimonials/${fileName}`, file);

    if (error) {
      setErrorMessage(`Error uploading file: ${error.message}`);
      setTimeout(() => setErrorMessage(""), 3000);
      setUploading(false);
      return;
    }

    const imageUrl = `https://fsubnjfvklblrbyyetps.supabase.co/storage/v1/object/public/superman/testimonials/${fileName}`;

    // Add the testimonial data to Firebase
    const testimonialsRef = ref(database, "testimonials");
    push(testimonialsRef, { ...newTestimonial, image: imageUrl, approved: false })
      .then(() => {
        setSuccessMessage("Testimonial added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        setNewTestimonial({ name: "", image: null, message: "" });
        setUploading(false);
      })
      .catch((error) => {
        setErrorMessage(`Error adding testimonial: ${error.message}`);
        setTimeout(() => setErrorMessage(""), 3000);
        setUploading(false);
      });
  };

  // Delete testimonial and image from Firebase and Supabase
  const deleteTestimonial = async (id, imageUrl) => {
    try {
      // Extract file name from the image URL
      const fileName = imageUrl.split("/testimonials/")[1];

      // Delete image from Supabase storage
      const { error: deleteError } = await supabase.storage
        .from("superman")
        .remove([`testimonials/${fileName}`]);

      if (deleteError) {
        throw new Error("Error deleting image from storage.");
      }

      // Delete testimonial entry from Firebase
      const testimonialRef = ref(database, `testimonials/${id}`);
      await remove(testimonialRef);

      // Show success message
      showMessage("success", "Testimonial deleted successfully.");
    } catch (error) {
      console.error(error.message);
      showMessage("error", error.message || "Error deleting testimonial.");
    } finally {
      setShowConfirmation(false);
      setTestimonialToDelete(null);
    }
  };

  // Toggle approval status for testimonial
  const toggleApproval = (id, approved) => {
    const testimonialRef = ref(database, `testimonials/${id}`);
    update(testimonialRef, { approved: !approved });
  };

  // Show confirmation modal for deletion
  const handleDeleteClick = (id, imageUrl) => {
    setTestimonialToDelete(id); // Set the testimonial ID to delete
    setShowConfirmation(true); // Show the confirmation modal
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation modal
    setTestimonialToDelete(null); // Reset the testimonial to delete
  };

  // Function to display success/error messages
  const showMessage = (type, message) => {
    if (type === "success") {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 3000);
    } else if (type === "error") {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage Testimonials</h2>

      {/* Success and Error Messages */}
      {successMessage && <div className="text-green-600">{successMessage}</div>}
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}

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
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full p-2 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Message"
          value={newTestimonial.message}
          onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <button
          onClick={addTestimonial}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Testimonial"}
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
                onClick={() => handleDeleteClick(testimonial.id, testimonial.image)}
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
                onClick={() => deleteTestimonial(testimonialToDelete, testimonials.find(t => t.id === testimonialToDelete).image)}
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
