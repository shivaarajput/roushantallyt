import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database"; // Import Firebase functions
import { database } from "../firebase"; // Import Firebase database

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the message object
    const newMessage = {
      name,
      phone,
      subject,
      message,
      timestamp: Date.now(),
    };

    try {
      // Push the message to Firebase
      const messagesRef = ref(database, "messages"); // Reference to 'messages' in the database
      await push(messagesRef, newMessage);

      // Show success message and clear the form
      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage("");
      setName("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (error) {
      // Show error message
      setErrorMessage("There was an error submitting your message. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Feel free to reach out to us! Fill out the form below or contact us
          directly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>
          <p className="text-gray-600 mb-4">
            Have any questions? We'd love to hear from you.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600">roushankumar4soh@gmail.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600">+91 95720 42845, +91 73609 09838</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Address</h4>
              <p className="text-gray-600">Sohdih Sohsarai, Bihar, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white rounded-lg shadow-lg p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="Your Phone Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          {/* Success/Error Messages */}
          {successMessage && (
            <div className="text-green-500 font-semibold">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-500 font-semibold">{errorMessage}</div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
