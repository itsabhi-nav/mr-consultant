// app/project-details/page.js
"use client";
import React from "react";

export default function ProjectDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/project-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gradient mb-4">
            Project Title
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            A glimpse into our futuristic design and innovative solutions.
          </p>
        </div>
      </section>

      {/* PROJECT OVERVIEW */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Project Overview</h2>
          <p className="text-lg text-gray-300 mb-8">
            This project embodies our commitment to innovation, sustainability,
            and luxury. Developed using cutting-edge technology and design, it
            stands as a benchmark in modern architecture.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-3">
            <li>
              <span className="font-semibold">Location:</span> City, Country
            </li>
            <li>
              <span className="font-semibold">Year Completed:</span> 2023
            </li>
            <li>
              <span className="font-semibold">Project Type:</span> Residential /
              Commercial / Mixed-use
            </li>
            <li>
              <span className="font-semibold">Key Features:</span> Sustainable
              design, smart technology integration, luxury finishes.
            </li>
          </ul>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Project Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={`https://via.placeholder.com/600x400?text=Project+Image+${i}`}
                  alt={`Project Image ${i}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED DESCRIPTION */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Detailed Description</h2>
          <p className="text-lg text-gray-300 mb-8">
            In this section, we describe the project in depth—from the initial
            concept and design challenges to the final execution and impact. Our
            team integrated the latest in sustainable practices and modern
            aesthetics to create a space that is both functional and visually
            stunning.
          </p>
          <p className="text-lg text-gray-300">
            The project features advanced smart technologies, eco-friendly
            materials, and bespoke design elements that ensure a unique and
            immersive experience. Client testimonials, industry accolades, and
            media coverage further validate its excellence.
          </p>
        </div>
      </section>

      {/* CALL-TO-ACTION */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Interested in This Project?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Contact us to learn more about our work and how we can help bring
            your vision to life.
          </p>
          <a
            href="/contact"
            className="px-8 py-4 bg-neonBlue text-black font-semibold rounded-full hover:scale-105 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
