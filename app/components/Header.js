"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-60 backdrop-blur-lg shadow-md">
      <div className="flex items-center justify-between py-4 px-6 sm:px-10">
        {/* 🔹 Brand Name */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-extrabold text-neonBlue cursor-pointer"
        >
          M R Consultants
        </motion.div>

        {/* 🔹 Hamburger button (visible on mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {navOpen ? (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              ) : (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </svg>
          </button>
        </div>

        {/* 🔹 Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          <Link href="/" className="hover:text-neonBlue transition">
            Home
          </Link>

          {/* 🔹 Services Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="hover:text-neonBlue transition flex items-center">
              Services
              <svg
                className="ml-2 w-4 h-4 text-neonBlue"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12l-4-4h8l-4 4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-60 bg-black bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg py-2"
                >
                  <Link
                    href="/services/real-estate"
                    className="block px-4 py-3 hover:bg-neonBlue transition rounded-lg"
                  >
                    Real Estate
                  </Link>
                  <Link
                    href="/services/building-construction"
                    className="block px-4 py-3 hover:bg-neonBlue transition rounded-lg"
                  >
                    Building Construction
                  </Link>
                  <Link
                    href="/services/land-development"
                    className="block px-4 py-3 hover:bg-neonBlue transition rounded-lg"
                  >
                    Land Development
                  </Link>
                  <Link
                    href="/services/home-interior-design"
                    className="block px-4 py-3 hover:bg-neonBlue transition rounded-lg"
                  >
                    Home Interior Design
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="#about" className="hover:text-neonBlue transition">
            About
          </Link>
          <Link href="#contact" className="hover:text-neonBlue transition">
            Contact
          </Link>
        </nav>
      </div>

      {/* 🔹 Mobile Navigation */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black bg-opacity-80 backdrop-blur-md px-6 pb-4 rounded-b-lg"
          >
            <nav className="flex flex-col space-y-5">
              <Link
                href="/"
                className="hover:text-neonBlue transition"
                onClick={() => setNavOpen(false)}
              >
                Home
              </Link>

              {/* 🔹 Mobile Services Dropdown */}
              <div className="relative">
                <button
                  className="w-full text-left font-semibold hover:text-neonBlue transition flex items-center"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  Services
                  <svg
                    className="ml-2 w-4 h-4 text-neonBlue"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12l-4-4h8l-4 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 pl-4 space-y-3"
                    >
                      <Link
                        href="/services/real-estate"
                        className="block hover:text-neonBlue transition"
                        onClick={() => setNavOpen(false)}
                      >
                        Real Estate
                      </Link>
                      <Link
                        href="/services/building-construction"
                        className="block hover:text-neonBlue transition"
                        onClick={() => setNavOpen(false)}
                      >
                        Building Construction
                      </Link>
                      <Link
                        href="/services/land-development"
                        className="block hover:text-neonBlue transition"
                        onClick={() => setNavOpen(false)}
                      >
                        Land Development
                      </Link>
                      <Link
                        href="/services/home-interior-design"
                        className="block hover:text-neonBlue transition"
                        onClick={() => setNavOpen(false)}
                      >
                        Home Interior Design
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="#about"
                className="hover:text-neonBlue transition"
                onClick={() => setNavOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="hover:text-neonBlue transition"
                onClick={() => setNavOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
