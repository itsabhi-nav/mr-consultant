"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GallerySection() {
  const galleryItems = [
    {
      id: 1,
      title: "Modern House",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    },
    {
      id: 2,
      title: "Futuristic Skyscraper",
      image: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
    },
    {
      id: 3,
      title: "Luxury Villa",
      image:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    },
    {
      id: 4,
      title: "Urban Living",
      image:
        "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2hvdy1za3lzY3JhcGVycy13b3JrLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fX19",
    },
    {
      id: 5,
      title: "Innovative Office",
      image: "https://images.pexels.com/photos/442577/pexels-photo-442577.jpeg",
    },
    {
      id: 6,
      title: "Architectural Marvel",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 bg-gray-900" id="gallery">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition duration-300">
                <span className="text-lg font-semibold text-white opacity-0 hover:opacity-100 transition duration-300">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-3xl max-h-full rounded-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
