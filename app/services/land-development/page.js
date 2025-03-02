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

export default function LandDevelopmentPage() {
  const projects = {
    current: [
      {
        id: 1,
        title: "Urban Renewal Project",
        description: "Revitalizing raw land into vibrant urban communities.",
        image: "https://via.placeholder.com/600x400?text=Current+Land+1",
      },
      {
        id: 2,
        title: "Green Park Initiative",
        description:
          "Developing eco-friendly public spaces in urban environments.",
        image: "https://via.placeholder.com/600x400?text=Current+Land+2",
      },
    ],
    completed: [
      {
        id: 3,
        title: "Suburban Community Hub",
        description: "Transforming vacant land into thriving neighborhoods.",
        image: "https://via.placeholder.com/600x400?text=Completed+Land+1",
      },
      {
        id: 4,
        title: "Riverside Development",
        description:
          "Harmonizing modern design with natural landscapes along the river.",
        image: "https://via.placeholder.com/600x400?text=Completed+Land+2",
      },
    ],
    upcoming: [
      {
        id: 5,
        title: "Smart City District",
        description:
          "Integrating technology with urban planning for tomorrow’s cities.",
        image: "https://via.placeholder.com/600x400?text=Upcoming+Land+1",
      },
      {
        id: 6,
        title: "Eco Living Campus",
        description: "A visionary initiative for sustainable community living.",
        image: "https://via.placeholder.com/600x400?text=Upcoming+Land+2",
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
          src="/land_cta.mp4" // Replace with your actual video file
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
            Land Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-2xl text-gray-300 mb-4 md:mb-6"
          >
            Transforming raw land into dynamic, sustainable communities.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#current-projects"
            className="px-6 py-2 md:px-8 md:py-4 bg-neonBlue text-black font-semibold rounded-full transition"
          >
            Explore Our Projects
          </motion.a>
        </div>
      </section>

      {/* ✅ TEXT SECTION (Left Aligned on Web, Centered on Mobile) */}
      <section className="py-12 bg-gray-900 text-white min-h-[50vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-neonBlue">
            Innovative Land Development
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            We transform raw land into dynamic, sustainable communities by
            blending visionary planning with environmental stewardship.
          </p>
          <ul className="text-lg text-gray-300 space-y-4">
            <li>
              ✅{" "}
              <span className="font-semibold text-white">
                Strategic Master Planning:
              </span>{" "}
              Thoughtful designs to maximize land potential.
            </li>
            <li>
              ✅{" "}
              <span className="font-semibold text-white">
                Eco-Friendly Infrastructure:
              </span>{" "}
              Building foundations for a sustainable future.
            </li>
            <li>
              ✅{" "}
              <span className="font-semibold text-white">
                Community-Centric Design:
              </span>{" "}
              Creating spaces that foster connectivity and growth.
            </li>
            <li>
              ✅{" "}
              <span className="font-semibold text-white">
                Innovative Land Utilization:
              </span>{" "}
              Modern methods that redefine property development.
            </li>
          </ul>
        </div>
      </section>

      {/* ✅ PROJECT SECTIONS */}
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

      {/* ✅ CALL-TO-ACTION SECTION WITH Background Video */}
      <section className="relative flex items-center justify-center bg-fixed bg-center bg-cover px-4 min-h-[50vh] md:min-h-[50vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/land.mp4" // Replace with your actual video file
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
            Ready to Transform Your Land?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-xl text-gray-300 mb-6"
          >
            Let’s collaborate to unlock the full potential of your property.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="/contact"
            className="px-6 py-2 md:px-8 md:py-4 bg-neonBlue text-black font-semibold rounded-full transition"
          >
            Get in Touch
          </motion.a>
        </div>
      </section>
    </div>
  );
}
