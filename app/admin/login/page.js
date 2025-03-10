"use client";

import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabaseClient";
import { FaTrashAlt } from "react-icons/fa";
import { MdCheckCircle, MdError } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Enhanced Notification Component with icons
function Notification({ message, type, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className={`fixed top-4 right-4 z-50 flex items-center gap-2 p-4 rounded-lg shadow-xl text-white ${
          type === "success"
            ? "bg-gradient-to-r from-green-500 to-green-600"
            : "bg-gradient-to-r from-red-500 to-red-600"
        }`}
      >
        {type === "success" ? (
          <MdCheckCircle size={24} />
        ) : (
          <MdError size={24} />
        )}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 text-xl font-bold">
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// Custom hook for session management
function useSession() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error getting session:", error);
      else setSession(data.session);
    }
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => setSession(session)
    );
    return () => authListener.subscription.unsubscribe();
  }, []);
  return session;
}

const SERVICES = [
  { label: "Real Estate", value: "real-estate" },
  { label: "Building Construction", value: "building-construction" },
  { label: "Land Development", value: "land-development" },
  { label: "Home Interior Design", value: "home-interior-design" },
];

export default function AdminDashboard() {
  const session = useSession();
  const [service, setService] = useState("real-estate");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingProjectIds, setDeletingProjectIds] = useState([]);

  // Form state with additional fields
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "current",
    overview: "",
    details: "",
    hero_image: "",
    location: "",
    year_completed: "",
    project_type: "",
    key_features: "",
  });
  const [file, setFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  // For gallery uploads (multiple files allowed)
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // A reset key to force re-mounting of file inputs after submission
  const [resetKey, setResetKey] = useState(0);

  // Helper: Show notifications
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch projects for the selected service
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("service", service);
      if (error) {
        console.error("Error fetching projects", error);
        showNotification("Error fetching projects", "error");
      } else {
        setProjects(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, [service]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function uploadFileToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsUploading(true);

    let imageUrl = "";
    if (file) {
      try {
        imageUrl = await uploadFileToCloudinary(file);
      } catch (error) {
        console.error("Main image upload failed:", error);
        showNotification("Main image upload failed", "error");
        setIsUploading(false);
        return;
      }
    }

    let galleryUrls = [];
    for (const gf of galleryFiles) {
      if (gf) {
        try {
          const url = await uploadFileToCloudinary(gf);
          galleryUrls.push(url);
        } catch (error) {
          console.error("Gallery image upload failed:", error);
          showNotification("Gallery image upload failed", "error");
        }
      }
    }

    const newProject = {
      service,
      title: form.title,
      description: form.description,
      category: form.category,
      overview: form.overview,
      details: form.details,
      hero_image: form.hero_image,
      image: imageUrl,
      gallery: galleryUrls,
      location: form.location,
      year_completed: form.year_completed,
      project_type: form.project_type,
      key_features: form.key_features,
    };

    const { error } = await supabase.from("projects").insert([newProject]);
    if (error) {
      console.error("Error inserting project:", error);
      showNotification("Error inserting project", "error");
    } else {
      showNotification("Project added successfully!", "success");
      // Reset form state and file inputs by updating the resetKey.
      setForm({
        title: "",
        description: "",
        category: "current",
        overview: "",
        details: "",
        hero_image: "",
        location: "",
        year_completed: "",
        project_type: "",
        key_features: "",
      });
      setFile(null);
      setMainImagePreview(null);
      setGalleryFiles([]);
      setGalleryPreviews([]);
      setResetKey((prev) => prev + 1);
      // Refresh projects list
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("service", service);
      if (error) {
        console.error("Error fetching projects", error);
        showNotification("Error fetching projects", "error");
      } else {
        setProjects(data);
      }
    }
    setIsUploading(false);
  }

  // Enhanced delete function with per-project deletion state
  async function deleteProject(project) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingProjectIds((prev) => [...prev, project.id]);
    try {
      const res = await fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: project.image,
          gallery: project.gallery || [],
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete images from Cloudinary");
      }
    } catch (error) {
      console.error("Error deleting images from Cloudinary:", error);
      showNotification("Error deleting images from Cloudinary", "error");
      setDeletingProjectIds((prev) => prev.filter((id) => id !== project.id));
      return;
    }
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);
    if (error) {
      console.error("Error deleting project:", error);
      showNotification("Error deleting project", "error");
    } else {
      showNotification("Project deleted successfully", "success");
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    }
    setDeletingProjectIds((prev) => prev.filter((id) => id !== project.id));
  }

  // Drag & drop handlers for gallery files
  const handleGalleryDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      setGalleryFiles((prev) => [...prev, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...previews]);
    }
  }, []);

  const handleGalleryDragOver = (e) => {
    e.preventDefault();
  };

  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category || "others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(project);
    return acc;
  }, {});

  if (!session) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6"
      >
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold mb-6 text-neonBlue">
            Admin Login
          </h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });
              if (error) alert(error.message);
            }}
            className="flex flex-col gap-4 w-full max-w-sm"
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neonBlue"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neonBlue"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-neonBlue text-black font-bold rounded hover:bg-neonBlue/80 transition"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 bg-gradient-to-br from-gray-900 to-black text-white max-w-screen-lg"
      >
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:space-y-0 space-y-4 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neonBlue drop-shadow-lg">
            Admin Dashboard
          </h1>
          <button
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.error("Error signing out:", error);
            }}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition shadow-lg w-full sm:w-auto"
          >
            Sign Out
          </button>
        </div>

        <p className="mb-4 text-lg lg:text-xl">
          Select the service you want to edit:
        </p>

        {/* Service Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 lg:mb-12">
          {SERVICES.map((s) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              key={s.value}
              onClick={() => setService(s.value)}
              className={`px-4 py-2 rounded backdrop-blur-md bg-white/10 transition text-center ${
                service === s.value
                  ? "bg-neonBlue text-black font-bold shadow-lg"
                  : "bg-gray-800 hover:bg-neonBlue hover:text-black"
              }`}
            >
              {s.label}
            </motion.button>
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
          Editing {SERVICES.find((s) => s.value === service)?.label} Projects
        </h2>

        {/* Two-Column Layout for Form and Projects List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/5 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Project Title"
                    className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                  >
                    <option value="current">Current</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    Short Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    Hero Image URL
                  </label>
                  <input
                    type="text"
                    name="hero_image"
                    value={form.hero_image}
                    onChange={handleChange}
                    placeholder="Hero Image URL (optional)"
                    className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    Year Completed
                  </label>
                  <input
                    type="text"
                    name="year_completed"
                    value={form.year_completed}
                    onChange={handleChange}
                    placeholder="Year Completed"
                    className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    Project Type
                  </label>
                  <input
                    type="text"
                    name="project_type"
                    value={form.project_type}
                    onChange={handleChange}
                    placeholder="Residential, Commercial, Mixed-use, etc."
                    className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    Key Features
                  </label>
                  <textarea
                    name="key_features"
                    value={form.key_features}
                    onChange={handleChange}
                    placeholder="Key Features (each point on a new line)"
                    className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Project Overview
                </label>
                <textarea
                  name="overview"
                  value={form.overview}
                  onChange={handleChange}
                  placeholder="Project Overview"
                  className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Project Details
                </label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  placeholder="Project Details (each point on a new line)"
                  className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
              </div>
              {/* Main Image Upload with Preview */}
              <div>
                <label className="block mb-2 font-semibold">
                  Main Image Upload
                </label>
                <input
                  key={resetKey}
                  type="file"
                  onChange={(e) => {
                    const selected = e.target.files[0];
                    setFile(selected);
                    setMainImagePreview(
                      selected ? URL.createObjectURL(selected) : null
                    );
                  }}
                  className="block mt-2 text-white bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
                {mainImagePreview && (
                  <div className="mt-2">
                    <img
                      src={mainImagePreview}
                      alt="Main Preview"
                      className="max-h-40 rounded shadow-md"
                    />
                  </div>
                )}
              </div>
              {/* Gallery Images Upload with Drag & Drop and Previews */}
              <div>
                <label className="block mb-2 font-semibold">
                  Gallery Images Upload
                </label>
                <div
                  onDrop={handleGalleryDrop}
                  onDragOver={handleGalleryDragOver}
                  className="border-dashed border-2 border-gray-700 p-4 rounded text-center text-gray-400 mb-2"
                >
                  Drag & drop images here, or use the file selector below.
                </div>
                <input
                  key={resetKey}
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setGalleryFiles((prev) => [...prev, ...files]);
                    const previews = files.map((file) =>
                      URL.createObjectURL(file)
                    );
                    setGalleryPreviews((prev) => [...prev, ...previews]);
                  }}
                  className="block mb-4 text-white bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
                {galleryPreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {galleryPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Gallery Preview ${index + 1}`}
                          className="h-20 w-full object-cover rounded shadow-md"
                        />
                        <button
                          onClick={() => {
                            setGalleryFiles((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                            setGalleryPreviews((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                        >
                          <FaTrashAlt size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isUploading}
                className={`mt-6 w-full px-6 py-3 bg-neonBlue text-black font-bold rounded transition shadow-lg ${
                  isUploading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-neonBlue/80"
                }`}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-black mr-2"></div>
                    Uploading...
                  </div>
                ) : (
                  "Add Project"
                )}
              </button>
            </form>
          </div>
          {/* Existing Projects Section */}
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Existing Projects</h2>
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neonBlue"></div>
              </div>
            ) : (
              Object.entries(groupedProjects).map(([category, projectList]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-xl font-bold capitalize mb-4">
                    {category} Projects
                  </h3>
                  <ul className="space-y-4">
                    {projectList.map((project) => (
                      <li
                        key={project.id}
                        className="flex items-center justify-between p-4 bg-white/10 rounded shadow-lg"
                      >
                        <span className="text-lg font-semibold">
                          {project.title}
                        </span>
                        <div className="flex gap-2">
                          <Link
                            href={`/project/${project.id}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                          >
                            Learn More
                          </Link>
                          <button
                            onClick={() => deleteProject(project)}
                            disabled={deletingProjectIds.includes(project.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-70"
                          >
                            {deletingProjectIds.includes(project.id) ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            ) : (
                              "Delete"
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
