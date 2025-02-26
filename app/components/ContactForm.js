"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your form submission logic
    alert("Form submitted! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      className="relative py-20 bg-gradient-to-br from-gray-900 to-black overflow-hidden"
      id="contact"
    >
      {/* Futuristic animated background overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full bg-[url('/futuristic-pattern.svg')] bg-cover bg-center animate-pulse"
          // Replace the URL above with your own futuristic pattern or animated SVG
        ></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8 text-neonBlue drop-shadow-lg">
          Get in Touch
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-70 backdrop-blur-lg p-8 rounded-lg shadow-2xl max-w-xl mx-auto transform transition-all hover:scale-105"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-semibold mb-1 text-neonBlue"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neonBlue transition"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-semibold mb-1 text-neonBlue"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neonBlue transition"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block font-semibold mb-1 text-neonBlue"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neonBlue transition"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-neonBlue text-black px-8 py-3 rounded font-semibold transition hover:scale-105 hover:bg-white"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
