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

export default function BuildingConstructionPage() {
  const projects = {
    current: [
      {
        id: 1,
        title: "Modern Office Complex",
        description: "Innovative workspace solutions with a futuristic edge.",
        image:
          "https://via.placeholder.com/600x400?text=Current+Construction+1",
      },
      {
        id: 2,
        title: "Luxury Residential Tower",
        description: "High-tech design combined with luxurious living.",
        image:
          "https://via.placeholder.com/600x400?text=Current+Construction+2",
      },
    ],
    completed: [
      {
        id: 3,
        title: "City Center Mall",
        description: "A transformative project revitalizing urban commerce.",
        image:
          "https://via.placeholder.com/600x400?text=Completed+Construction+1",
      },
      {
        id: 4,
        title: "High-Rise Apartments",
        description:
          "Residential towers that set new standards in modern construction.",
        image:
          "https://via.placeholder.com/600x400?text=Completed+Construction+2",
      },
    ],
    upcoming: [
      {
        id: 5,
        title: "Futuristic Business Park",
        description: "Redefining corporate workspaces with innovative design.",
        image:
          "https://via.placeholder.com/600x400?text=Upcoming+Construction+1",
      },
      {
        id: 6,
        title: "Next-Gen Convention Center",
        description: "A state-of-the-art venue designed for future events.",
        image:
          "https://via.placeholder.com/600x400?text=Upcoming+Construction+2",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ✅ HERO SECTION with Background Video */}
      <section
        className="relative flex items-center justify-center bg-fixed bg-center bg-cover px-4
             min-h-[50vh] md:min-h-[50vh] mt-12 overflow-hidden"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/build_video.mp4" // Replace with your actual video file
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black opacity-65"></div>

        <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-6xl font-extrabold text-gradient mb-2 md:mb-4"
          >
            Building Construction
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-2xl text-gray-300 mb-4 md:mb-6"
          >
            Constructing the future with precision, durability, and visionary
            design.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#current-projects"
            className="px-6 py-2 md:px-8 md:py-4 bg-neonBlue text-black font-semibold rounded-full transition"
          >
            Discover Our Work
          </motion.a>
        </div>
      </section>

      {/* ✅ TEXT SECTION (Left Aligned on Web, Centered on Mobile) */}
      <section className="py-6 md:py-10 bg-gray-900 text-white min-h-[35vh] md:min-h-[45vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-left">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5 text-neonBlue">
            Excellence in Construction
          </h2>
          <p className="text-sm md:text-lg text-gray-300 leading-snug md:leading-relaxed mb-3 md:mb-5">
            We blend cutting-edge technology with sustainable practices to build
            robust, innovative structures.
          </p>
          <ul className="text-sm md:text-lg text-gray-300 space-y-1.5 md:space-y-3">
            <li className="flex items-start">
              ✅{" "}
              <span className="ml-2">
                <span className="font-semibold text-white">
                  Revolutionary Engineering:
                </span>{" "}
                Pushing the boundaries of modern construction.
              </span>
            </li>
            <li className="flex items-start">
              ✅{" "}
              <span className="ml-2">
                <span className="font-semibold text-white">
                  Sustainable Materials:
                </span>{" "}
                Committed to eco-friendly and durable solutions.
              </span>
            </li>
            <li className="flex items-start">
              ✅{" "}
              <span className="ml-2">
                <span className="font-semibold text-white">
                  Precision in Every Build:
                </span>{" "}
                Uncompromising attention to detail.
              </span>
            </li>
            <li className="flex items-start">
              ✅{" "}
              <span className="ml-2">
                <span className="font-semibold text-white">
                  Award-Winning Designs:
                </span>{" "}
                Recognized for groundbreaking innovation.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ✅ PROJECT SECTIONS */}
      {Object.entries(projects).map(([key, projectList]) => (
        <section
          key={key}
          id={`${key}-projects`}
          className="py-12 md:py-16 bg-gray-800"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 capitalize">
              {key} Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projectList.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ✅ CALL-TO-ACTION SECTION WITH Background Video */}
      <section className="relative flex items-center justify-center bg-fixed bg-center bg-cover px-4 min-h-[50vh] md:min-h-[50vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/building.mp4" // Replace with your actual video file
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-extrabold text-gradient mb-4"
          >
            Build Your Future Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-xl text-gray-300 mb-6"
          >
            Partner with us to create structures that stand the test of time.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="/contact"
            className="px-6 py-2 md:px-8 md:py-4 bg-neonBlue text-black font-semibold rounded-full transition"
          >
            Let's Get Started
          </motion.a>
        </div>
      </section>
    </div>
  );
}
