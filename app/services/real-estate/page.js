"use client";

import React from "react";
import { motion } from "framer-motion";

function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-900 rounded-lg overflow-hidden shadow-xl hover:shadow-neonBlue transition duration-300"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2 text-neonBlue">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <a
          href="/project-details"
          className="inline-block px-6 py-2 bg-neonBlue text-black font-semibold rounded-full hover:scale-105 transition"
        >
          Learn More
        </a>
      </div>
    </motion.div>
  );
}

export default function RealEstatePage() {
  const projects = {
    current: [
      {
        id: 1,
        title: "Skyline Residences",
        description: "Modern residential towers redefining urban luxury.",
        image: "https://via.placeholder.com/600x400?text=Current+Real+Estate+1",
      },
      {
        id: 2,
        title: "Urban Oasis",
        description: "Luxury condos with panoramic city views.",
        image: "https://via.placeholder.com/600x400?text=Current+Real+Estate+2",
      },
    ],
    completed: [
      {
        id: 3,
        title: "Heritage Villa",
        description:
          "A timeless villa blending tradition with modern innovation.",
        image:
          "https://via.placeholder.com/600x400?text=Completed+Real+Estate+1",
      },
      {
        id: 4,
        title: "Global Towers",
        description: "Iconic skyscrapers that set new global benchmarks.",
        image:
          "https://via.placeholder.com/600x400?text=Completed+Real+Estate+2",
      },
    ],
    upcoming: [
      {
        id: 5,
        title: "Futuristic Habitat",
        description: "A visionary project promising next-generation living.",
        image:
          "https://via.placeholder.com/600x400?text=Upcoming+Real+Estate+1",
      },
      {
        id: 6,
        title: "Eco Smart Living",
        description: "Sustainable design meeting modern aesthetics.",
        image:
          "https://via.placeholder.com/600x400?text=Upcoming+Real+Estate+2",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HERO SECTION */}
      <section
        className="relative flex items-center justify-center bg-fixed bg-center bg-cover px-4
             min-h-[50vh] md:min-h-[50vh] mt-12 overflow-hidden" // ✅ 1/2 screen height for both mobile & web
      >
        {/* ✅ Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/real_estate.mp4" // Replace with your actual video file
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-6xl font-extrabold text-gradient mb-2 md:mb-4"
          >
            Real Estate Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-2xl text-gray-300 mb-4 md:mb-6"
          >
            Redefining urban living with luxury and sustainable innovation.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#current-projects"
            className="px-6 py-2 md:px-8 md:py-4 bg-neonBlue text-black font-semibold rounded-full transition"
          >
            Explore Our Portfolio
          </motion.a>
        </div>
      </section>

      {/* ✅ FIXED TEXT SECTION BELOW (1/2 screen height) */}
      <section className="py-12 bg-gray-900 text-white min-h-[50vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-neonBlue">
            Our Vision in Real Estate
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            At <span className="text-white font-semibold">M R Consultants</span>
            , we redefine urban living by seamlessly integrating luxury,
            sustainability, and cutting-edge design. Our projects transform
            cityscapes into iconic landmarks worldwide.
          </p>
          <ul className="text-lg text-gray-300 space-y-4">
            <li>
              ✅{" "}
              <span className="font-semibold text-white">
                Innovative Urban Architecture:
              </span>{" "}
              Designs that inspire and elevate cityscapes.
            </li>
            <li>
              ✅{" "}
              <span className="font-semibold text-white">
                Sustainable & Eco-Friendly:
              </span>{" "}
              Building for a greener tomorrow.
            </li>
            <li>
              ✅{" "}
              <span className="font-semibold text-white">
                Global Excellence:
              </span>{" "}
              World-class projects with international acclaim.
            </li>
            <li>
              ✅{" "}
              <span className="font-semibold text-white">Premium Spaces:</span>{" "}
              Exquisite residential and commercial developments.
            </li>
          </ul>
        </div>
      </section>

      {/* PROJECT SECTIONS */}
      {Object.entries(projects).map(([key, projectList]) => (
        <section key={key} id={`${key}-projects`} className="py-20 bg-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 capitalize">
              {key} Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectList.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ✅ CALL-TO-ACTION SECTION WITH BACKGROUND VIDEO */}
      <section className="relative flex items-center justify-center bg-fixed bg-center bg-cover px-4 min-h-[50vh] md:min-h-[50vh] overflow-hidden">
        {/* ✅ Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/buildd.mp4" // Replace with your actual video file
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* ✅ CTA Content */}
        <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-extrabold text-gradient mb-4"
          >
            Ready to Transform Your Space?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-xl text-gray-300 mb-6"
          >
            Connect with us to discuss how our innovative real estate solutions
            can elevate your property portfolio.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="/contact"
            className="px-6 py-2 md:px-8 md:py-4 bg-neonBlue text-black font-semibold rounded-full transition"
          >
            Contact Us Today
          </motion.a>
        </div>
      </section>
    </div>
  );
}
