import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, push, onValue, remove, update } from "firebase/database";

const AdminGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    const galleryRef = ref(database, "gallery");
    onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      const images = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setGalleryImages(images);
    });
  }, []);

  const addImage = () => {
    if (newImage) {
      const galleryRef = ref(database, "gallery");
      push(galleryRef, { src: newImage, approved: false });
      setNewImage("");
    }
  };

  const deleteImage = (id) => {
    const imageRef = ref(database, `gallery/${id}`);
    remove(imageRef);
    setShowConfirmation(false); // Close the confirmation modal after deletion
    setImageToDelete(null); // Reset the image to delete
  };

  const toggleApproval = (id, approved) => {
    const imageRef = ref(database, `gallery/${id}`);
    update(imageRef, { approved: !approved });
  };

  const handleDeleteClick = (id) => {
    setImageToDelete(id); // Set the image ID to delete
    setShowConfirmation(true); // Show the confirmation modal
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation modal
    setImageToDelete(null); // Reset the image to delete
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage Gallery</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Image URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <button onClick={addImage} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add Image
        </button>
      </div>

      {/* Horizontal Scrolling for Gallery Images */}
      <div className="flex overflow-x-auto space-x-6 px-6 py-4 scrollbar-hide">
        {galleryImages.map((image) => (
          <div key={image.id} className="flex-shrink-0 w-64 border rounded-lg p-4">
            <img src={image.src} alt="Gallery" className="w-full h-48 object-cover rounded-lg mb-2" />
            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleApproval(image.id, image.approved)}
                className={`px-4 py-2 rounded-lg ${
                  image.approved ? "bg-green-600" : "bg-gray-600"
                } text-white`}
              >
                {image.approved ? "Hide" : "Show"}
              </button>
              <button
                onClick={() => handleDeleteClick(image.id)}
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
              Are you sure you want to delete this image?
            </h3>
            <p className="text-gray-600">
              This action cannot be undone. Please confirm.
            </p>
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => deleteImage(imageToDelete)}
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

export default AdminGallery;
