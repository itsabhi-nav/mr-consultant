"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { MdCheckCircle, MdError } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Notification component
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

// Helper to generate a URL-friendly slug from the title.
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminBlogPanel() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingPostIds, setDeletingPostIds] = useState([]);

  // Form state for new blog post including author details
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Real Estate",
    featured: false,
    authorName: "",
    authorBio: "",
    authorAvatar: "", // Optional URL input
  });
  const [file, setFile] = useState(null); // Cover image file
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  // New state for author avatar file upload
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Valid blog categories for admin (and public filtering)
  const BLOG_CATEGORIES = [
    "Land Development",
    "Real Estate",
    "Building Construction",
    "Interior Design",
  ];

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  async function fetchBlogPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.error("Error fetching blog posts", JSON.stringify(error));
      showNotification("Error fetching blog posts", "error");
    } else {
      setBlogPosts(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        console.error("Cover image upload failed:", error);
        showNotification("Cover image upload failed", "error");
        setIsUploading(false);
        return;
      }
    }
    // Process author avatar: if file uploaded, upload it; else if a URL is entered, use it; else use dummy.
    let avatarUrl = "";
    if (avatarFile) {
      try {
        avatarUrl = await uploadFileToCloudinary(avatarFile);
      } catch (error) {
        console.error("Author avatar upload failed:", error);
        showNotification("Author avatar upload failed", "error");
        setIsUploading(false);
        return;
      }
    } else if (form.authorAvatar.trim() !== "") {
      avatarUrl = form.authorAvatar;
    } else {
      avatarUrl = "https://via.placeholder.com/150"; // Dummy avatar URL
    }

    const newPost = {
      title: form.title,
      slug: generateSlug(form.title),
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      isfeatured: form.featured,
      coverimage: imageUrl,
      author: {
        name: form.authorName,
        bio: form.authorBio,
        avatar: avatarUrl,
      },
      likes: 0,
    };

    const { error } = await supabase.from("blog_posts").insert([newPost]);
    if (error) {
      console.error("Error inserting blog post:", error);
      showNotification("Error inserting blog post", "error");
    } else {
      showNotification("Blog post added successfully!", "success");
      setForm({
        title: "",
        excerpt: "",
        content: "",
        category: "Real Estate",
        featured: false,
        authorName: "",
        authorBio: "",
        authorAvatar: "",
      });
      setFile(null);
      setCoverImagePreview(null);
      setAvatarFile(null);
      setAvatarPreview(null);
      setResetKey((prev) => prev + 1);
      fetchBlogPosts();
    }
    setIsUploading(false);
  }

  async function deleteBlogPost(post) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setDeletingPostIds((prev) => [...prev, post.id]);
    try {
      const res = await fetch("/api/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: post.coverimage }),
      });
      if (!res.ok) throw new Error("Failed to delete image from Cloudinary");
    } catch (error) {
      console.error("Error deleting image:", error);
      showNotification("Error deleting image", "error");
      setDeletingPostIds((prev) => prev.filter((id) => id !== post.id));
      return;
    }
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", post.id);
    if (error) {
      console.error("Error deleting blog post:", error);
      showNotification("Error deleting blog post", "error");
    } else {
      showNotification("Blog post deleted successfully", "success");
      setBlogPosts((prev) => prev.filter((p) => p.id !== post.id));
    }
    setDeletingPostIds((prev) => prev.filter((id) => id !== post.id));
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <h1 className="text-3xl font-bold mb-6">Edit Blog Posts</h1>
      <div className="mb-6">
        <Link href="/admin/projects">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mr-4">
            Edit Services
          </button>
        </Link>
        <Link href="/admin/blog">
          <button className="px-4 py-2 bg-neonBlue text-black rounded hover:bg-neonBlue/80 transition">
            Edit Blog Posts
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white/5 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Blog Post Title"
                className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Excerpt</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                placeholder="Short excerpt of the blog post"
                className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Full content of the blog post (HTML allowed)"
                className="p-3 rounded bg-gray-800 text-white w-full h-40 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Featured</label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Author Name</label>
                <input
                  type="text"
                  name="authorName"
                  value={form.authorName}
                  onChange={handleChange}
                  placeholder="Author Name"
                  className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Author Bio</label>
                <input
                  type="text"
                  name="authorBio"
                  value={form.authorBio}
                  onChange={handleChange}
                  placeholder="Author Bio"
                  className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Author Avatar URL
                </label>
                <input
                  type="text"
                  name="authorAvatar"
                  value={form.authorAvatar}
                  onChange={handleChange}
                  placeholder="Optional: Enter avatar URL"
                  className="p-3 rounded bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  Upload Cover Image
                </label>
                <input
                  key={resetKey}
                  type="file"
                  onChange={(e) => {
                    const selected = e.target.files[0];
                    setFile(selected);
                    setCoverImagePreview(
                      selected ? URL.createObjectURL(selected) : null
                    );
                  }}
                  className="block mt-2 text-white bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
                {coverImagePreview && (
                  <div className="mt-2">
                    <img
                      src={coverImagePreview}
                      alt="Cover Preview"
                      className="max-h-40 rounded shadow-md"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Upload Author Avatar
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setAvatarFile(file);
                    setAvatarPreview(file ? URL.createObjectURL(file) : null);
                  }}
                  className="block mt-2 text-white bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue"
                />
                {avatarPreview && (
                  <div className="mt-2">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="max-h-20 rounded-full"
                    />
                  </div>
                )}
              </div>
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
                "Add Blog Post"
              )}
            </button>
          </form>
        </div>
        <div className="bg-white/5 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Existing Blog Posts</h2>
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neonBlue"></div>
            </div>
          ) : (
            <ul className="space-y-4">
              {blogPosts.map((post) => (
                <li
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-white/10 rounded shadow-lg"
                >
                  <span className="text-lg font-semibold">{post.title}</span>
                  <div className="flex gap-2">
                    <Link href={`/blog/${post.slug}`}>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteBlogPost(post)}
                      disabled={deletingPostIds.includes(post.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-70"
                    >
                      {deletingPostIds.includes(post.id) ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
