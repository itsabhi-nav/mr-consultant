"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error("Error fetching project:", error);
      else setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found.</div>;

  // Split key_features into an array (if available)
  const keyFeatures = project.key_features
    ? project.key_features.split("\n")
    : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            project.hero_image || "/assets/project-hero.jpg"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gradient mb-4">
            {project.title}
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
          <p className="text-lg text-gray-300 mb-8">{project.overview}</p>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-3">
            <li>
              <span className="font-semibold">Location:</span>{" "}
              {project.location}
            </li>
            <li>
              <span className="font-semibold">Year Completed:</span>{" "}
              {project.year_completed}
            </li>
            <li>
              <span className="font-semibold">Project Type:</span>{" "}
              {project.project_type}
            </li>
            <li>
              <span className="font-semibold">Key Features:</span>
              <ul className="ml-4 mt-2">
                {keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
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
            {project.gallery?.map((imgUrl, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={imgUrl}
                  alt={`Project Image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
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
