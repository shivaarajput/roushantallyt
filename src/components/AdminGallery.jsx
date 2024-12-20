import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, push, onValue, remove, update } from "firebase/database";
import { supabase } from "../supabaseClient";

const AdminGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = () => {
      const galleryRef = ref(database, "gallery");
      onValue(galleryRef, (snapshot) => {
        const data = snapshot.val();
        const images = data
          ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
          : [];
        setGalleryImages(images);
      });
    };
    fetchGalleryImages();
  }, []);

  const showMessage = (type, text, duration = 3000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({}), duration);
  };

  const handleFileChange = (event) => {
    setImageToUpload(event.target.files[0] || null);
  };

  const handleUploadImage = async () => {
    if (!imageToUpload) {
      showMessage("error", "Please select an image.");
      return;
    }

    setUploading(true);
    const fileName = imageToUpload.name;

    try {
      const { data: existingFile, error: checkError } = await supabase.storage
        .from("superman")
        .list("uploads", { search: fileName });

      if (checkError) {
        throw new Error("Error checking existing files.");
      }

      if (existingFile && existingFile.length > 0) {
        showMessage("error", "File already exists.");
        return;
      }

      const { data, error } = await supabase.storage
        .from("superman")
        .upload(`uploads/${fileName}`, imageToUpload);

      if (error) {
        throw new Error("Image upload failed.");
      }

      const imageUrl = `https://fsubnjfvklblrbyyetps.supabase.co/storage/v1/object/public/superman/uploads/${fileName}`;
      const galleryRef = ref(database, "gallery");
      await push(galleryRef, { src: imageUrl, approved: false });

      setImageToUpload(null);
      document.getElementById("file-input").value = ""; // Clear input field
      showMessage("success", "Image uploaded successfully!");
    } catch (error) {
      console.error(error.message);
      showMessage("error", error.message || "Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id) => {
    const image = galleryImages.find((img) => img.id === id);
    if (!image) return;

    try {
      // Extract filename from image URL
      const fileName = image.src.split("/").pop();

      // Delete image from Supabase storage
      const { error: deleteError } = await supabase.storage
        .from("superman")
        .remove([`uploads/${fileName}`]);

      if (deleteError) {
        throw new Error("Error deleting image from storage.");
      }

      // Delete image entry from Firebase
      const imageRef = ref(database, `gallery/${id}`);
      await remove(imageRef);

      showMessage("success", "Image deleted successfully.");
    } catch (error) {
      console.error(error.message);
      showMessage("error", error.message || "Error deleting image.");
    } finally {
      setShowConfirmation(false);
      setImageToDelete(null);
    }
  };

  const toggleApproval = (id, approved) => {
    const imageRef = ref(database, `gallery/${id}`);
    update(imageRef, { approved: !approved });
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage Gallery</h2>

      <div className="mb-4">
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <button
          onClick={handleUploadImage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        {message.text && (
          <div
            className={`mt-2 p-2 rounded ${
              message.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

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
                onClick={() => {
                  setImageToDelete(image.id);
                  setShowConfirmation(true);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-4 max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800">
              Are you sure you want to delete this image?
            </h3>
            <p className="text-gray-600">This action cannot be undone. Please confirm.</p>
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => deleteImage(imageToDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setImageToDelete(null);
                }}
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
