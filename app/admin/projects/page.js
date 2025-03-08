"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function AdminProjectsPage() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "real-estate";
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "current",
    overview: "",
    details: "",
    hero_image: "",
  });
  const [file, setFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [service]);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("service", service);
    if (error) console.error("Error fetching projects", error);
    else setProjects(data);
    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Upload file to Cloudinary via API route
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
    let galleryUrls = [];
    for (let gf of galleryFiles) {
      try {
        const url = await uploadFileToCloudinary(gf);
        galleryUrls.push(url);
      } catch (error) {
        console.error("Gallery image upload failed:", error);
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
    };
    const { error } = await supabase.from("projects").insert([newProject]);
    if (error) {
      console.error("Error inserting project:", error);
    } else {
      alert("Project added successfully!");
      setForm({
        title: "",
        description: "",
        category: "current",
        overview: "",
        details: "",
        hero_image: "",
      });
      setFile(null);
      setGalleryFiles([]);
      fetchProjects();
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit {service.replace(/-/g, " ")} Projects
      </h1>
      <form onSubmit={handleSubmit} className="mb-8">
        {/* Input fields for project details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="p-2 rounded bg-gray-800"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="p-2 rounded bg-gray-800"
          >
            <option value="current">Current</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short Description"
            className="p-2 rounded bg-gray-800"
            required
          />
          <input
            type="text"
            name="hero_image"
            value={form.hero_image}
            onChange={handleChange}
            placeholder="Hero Image URL (optional)"
            className="p-2 rounded bg-gray-800"
          />
        </div>
        <textarea
          name="overview"
          value={form.overview}
          onChange={handleChange}
          placeholder="Project Overview"
          className="p-2 rounded bg-gray-800 w-full mt-4"
          required
        />
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder="Project Details (each point on a new line)"
          className="p-2 rounded bg-gray-800 w-full mt-4"
        />
        <div className="mt-4">
          <label>Main Image Upload:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block mt-2"
          />
        </div>
        <div className="mt-4">
          <label>Gallery Images Upload:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setGalleryFiles([...e.target.files])}
            className="block mt-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-neonBlue text-black font-semibold rounded"
        >
          Add Project
        </button>
      </form>
      <div>
        <h2 className="text-2xl font-bold mb-4">Existing Projects</h2>
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project.id} className="mb-2">
                <strong>{project.title}</strong> - {project.category}
                {/* You can add edit/delete functionality here */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
