import React from "react";
import AdminGallery from "../components/AdminGallery";
import AdminTestimonial from "../components/AdminTestimonial";
import AdminMessages from "../components/AdminMessages";
import AdminNav from "../components/AdminNav";

const Admin = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <AdminNav />

      {/* Gallery Management */}
      <AdminGallery />

      {/* Testimonial Management */}
      <AdminTestimonial />

      {/* Messages Management */}
      <AdminMessages />
    </div>
  );
};

export default Admin;
