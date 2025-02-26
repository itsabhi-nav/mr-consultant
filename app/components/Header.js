"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-50 backdrop-blur-lg shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold text-white tracking-wide">
          <span className="text-neonBlue">M R</span> Consultants
        </div>

        {/* Hamburger button (visible on mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
            className="text-white focus:outline-none"
          >
            <motion.svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              initial={{ rotate: 0 }}
              animate={{ rotate: navOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {navOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </motion.svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {["Home", "Services", "About", "Contact"].map((item, idx) => (
            <Link
              key={idx}
              href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
            >
              <span className="text-white text-lg font-medium cursor-pointer hover:text-neonBlue transition-all duration-300">
                {item}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation - Slide Down Effect */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-black bg-opacity-80 backdrop-blur-md shadow-lg md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col space-y-4 px-6 py-4 text-center">
              {["Home", "Services", "About", "Contact"].map((item, idx) => (
                <Link
                  key={idx}
                  href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                >
                  <span
                    className="text-white text-lg font-medium cursor-pointer hover:text-neonBlue transition-all duration-300"
                    onClick={() => setNavOpen(false)}
                  >
                    {item}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
