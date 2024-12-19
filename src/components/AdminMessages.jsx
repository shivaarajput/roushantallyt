import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database"; 
import { database } from "../firebase"; 

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    const messagesRef = ref(database, "messages"); 
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : [];
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (messageId) => {
    setMessageToDelete(messageId);
    setShowConfirmation(true); // Show the confirmation modal
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      const messageRef = ref(database, `messages/${messageToDelete}`);
      remove(messageRef) // Delete the message from Firebase
        .then(() => {
          setShowConfirmation(false);
          setMessageToDelete(null);
        })
        .catch((error) => {
          console.error("Error deleting message: ", error);
        });
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation modal without deleting
    setMessageToDelete(null);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Manage and view the messages sent from the contact form.
        </p>
      </div>

      {/* Horizontal Scroll for Message Cards */}
      <div className="flex overflow-x-auto snap-x snap-mandatory px-6 md:px-12 space-x-6 scrollbar-hide">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 snap-center space-y-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {message.name}
                  </h3>
                  <p className="text-sm text-gray-600">{message.phone}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </div>

              <div>
                <p className="font-medium text-gray-800">Subject: {message.subject}</p>
                <p className="text-gray-600">{message.message}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => handleDelete(message.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 italic mx-auto">No messages yet.</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-4 max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800">
              Are you sure you want to delete this message?
            </h3>
            <p className="text-gray-600">
              This action cannot be undone. Please confirm.
            </p>
            <div className="flex justify-around space-x-4">
              <button
                onClick={confirmDelete}
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
    </section>
  );
};

export default AdminMessages;
