"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// Custom hook for session management remains the same
function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      } else {
        setSession(data.session);
      }
    }
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
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

  // For dynamic gallery uploads, store an array of files.
  const [galleryFiles, setGalleryFiles] = useState([]);

  // For new gallery input field
  const addGalleryFileInput = () => {
    setGalleryFiles((prev) => [...prev, null]);
  };

  // Handle individual gallery file change
  const handleGalleryFileChange = (index, file) => {
    setGalleryFiles((prev) => prev.map((f, i) => (i === index ? file : f)));
  };

  // Remove a gallery file input
  const removeGalleryFileInput = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Fetch projects for the selected service
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("service", service);
      if (error) console.error("Error fetching projects", error);
      else setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, [service]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Upload a file to Cloudinary via our API route
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

    let imageUrl = "";
    if (file) {
      try {
        imageUrl = await uploadFileToCloudinary(file);
      } catch (error) {
        console.error("Main image upload failed:", error);
      }
    }

    // Upload each gallery file (skip null values)
    let galleryUrls = [];
    for (let gf of galleryFiles) {
      if (gf) {
        try {
          const url = await uploadFileToCloudinary(gf);
          galleryUrls.push(url);
        } catch (error) {
          console.error("Gallery image upload failed:", error);
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
    } else {
      alert("Project added successfully!");
      // Reset the form
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
      setGalleryFiles([]);
      // Refresh projects
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("service", service);
      if (error) console.error("Error fetching projects", error);
      else setProjects(data);
    }
  }

  // Delete a project by id
  async function deleteProject(id) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.error("Error deleting project:", error);
    } else {
      alert("Project deleted successfully");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  }

  // Logout function to clear the session
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  }

  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category || "others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(project);
    return acc;
  }, {});

  // If no session, show login form with futuristic design
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // For phone: same as before
      // For laptop: larger container & more padding
      className="container mx-auto 
                 px-4 sm:px-6 lg:px-8 
                 py-6 pt-24 
                 bg-gradient-to-br from-gray-900 to-black 
                 text-white 
                 max-w-screen-md lg:max-w-screen-lg"
    >
      {/* Top bar: keep phone layout; more spacing & bigger text on lg */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between 
                      mb-8 sm:space-y-0 space-y-4 
                      lg:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neonBlue drop-shadow-lg">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition shadow-lg 
                     w-full sm:w-auto"
        >
          Sign Out
        </button>
      </div>

      <p className="mb-4 text-lg lg:text-xl">
        Select the service you want to edit:
      </p>

      {/* Service buttons in a grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 lg:mb-12">
        {SERVICES.map((s) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            key={s.value}
            onClick={() => setService(s.value)}
            className={`px-4 py-2 rounded backdrop-blur-md bg-white/10 transition text-center
              ${
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

      {/* Form wrapped in a subtle background card */}
      <div className="bg-white/5 rounded-lg p-4 sm:p-6 lg:p-8 mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Title */}
            <div>
              <label className="block mb-2 font-semibold">Project Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project Title"
                className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                required
              />
            </div>

            {/* Category */}
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

            {/* Short Description */}
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
                className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                required
              />
            </div>

            {/* Hero Image URL */}
            <div>
              <label className="block mb-2 font-semibold">Hero Image URL</label>
              <input
                type="text"
                name="hero_image"
                value={form.hero_image}
                onChange={handleChange}
                placeholder="Hero Image URL (optional)"
                className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 font-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
              />
            </div>

            {/* Year Completed */}
            <div>
              <label className="block mb-2 font-semibold">Year Completed</label>
              <input
                type="text"
                name="year_completed"
                value={form.year_completed}
                onChange={handleChange}
                placeholder="Year Completed"
                className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block mb-2 font-semibold">Project Type</label>
              <input
                type="text"
                name="project_type"
                value={form.project_type}
                onChange={handleChange}
                placeholder="Residential, Commercial, Mixed-use, etc."
                className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
              />
            </div>

            {/* Key Features */}
            <div>
              <label className="block mb-2 font-semibold">Key Features</label>
              <textarea
                name="key_features"
                value={form.key_features}
                onChange={handleChange}
                placeholder="Key Features (each point on a new line)"
                className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
              />
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <label className="block mb-2 font-semibold">Project Overview</label>
            <textarea
              name="overview"
              value={form.overview}
              onChange={handleChange}
              placeholder="Project Overview"
              className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
              required
            />
          </div>

          {/* Project Details */}
          <div>
            <label className="block mb-2 font-semibold">Project Details</label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="Project Details (each point on a new line)"
              className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
            />
          </div>

          {/* Main Image Upload */}
          <div>
            <label className="block mb-2 font-semibold">
              Main Image Upload
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block mt-2 text-white bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue"
            />
          </div>

          {/* Gallery Upload Section with + icon */}
          <div>
            <label className="block mb-2 font-semibold">
              Gallery Images Upload
            </label>
            {galleryFiles.map((gf, index) => (
              <div key={index} className="flex items-center gap-3 mt-2">
                <input
                  type="file"
                  onChange={(e) =>
                    handleGalleryFileChange(index, e.target.files[0])
                  }
                  className="block text-white bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryFileInput(index)}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addGalleryFileInput}
              className="mt-3 flex items-center gap-2 text-neonBlue hover:text-neonBlue/80 transition"
            >
              <FaPlus /> Add More
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-neonBlue text-black font-bold rounded hover:bg-neonBlue/80 transition shadow-lg 
                       w-full sm:w-auto"
          >
            Add Project
          </button>
        </form>
      </div>

      {/* Existing Projects */}
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
          Existing Projects
        </h2>
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          Object.entries(groupedProjects).map(([category, projectList]) => (
            <div key={category} className="mb-8 lg:mb-12">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold capitalize mb-4">
                {category} Projects
              </h3>
              <ul className="space-y-4">
                {projectList.map((project) => (
                  <li
                    key={project.id}
                    className="flex items-center justify-between p-4 lg:p-6 bg-white/10 rounded backdrop-blur-md shadow-lg"
                  >
                    <span className="text-lg font-semibold">
                      {project.title}
                    </span>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
