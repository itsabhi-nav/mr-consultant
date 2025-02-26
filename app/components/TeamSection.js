"use client";

import { motion } from "framer-motion";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "CEO & Founder",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeZ9G91YE6XpA1Ey21OcHQ9jbrRx7PDc2x_A&s",
    },
    {
      name: "Bob Williams",
      role: "Lead Architect",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_h65aXYjcTaX4Ufq4-QWbt6n0C6YmzxXyFw&s",
    },
    {
      name: "Carol Davis",
      role: "Interior Designer",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg",
    },
    {
      name: "David Lee",
      role: "Construction Manager",
      image:
        "https://media.istockphoto.com/id/1388648617/photo/confident-caucasian-young-man-in-casual-denim-clothes-with-arms-crossed-looking-at-camera.jpg?s=612x612&w=0&k=20&c=YxctPklAOJMmy6Tolyvn45rJL3puk5RlKt39FO46ZeA=",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 bg-gray-900 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Meet the Team</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-black bg-opacity-50 p-6 rounded-lg hover:shadow-2xl transition"
              variants={itemVariants}
            >
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
