// app/components/Header.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex items-center justify-between py-4 px-8">
        <div className="text-2xl font-bold text-gradient">M R Consultants</div>

        {/* Hamburger button (visible on mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {navOpen ? (
                // X icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <span className="hover:text-neonBlue transition cursor-pointer">
              Home
            </span>
          </Link>
          <a href="#services" className="hover:text-neonBlue transition">
            Services
          </a>
          <a href="#about" className="hover:text-neonBlue transition">
            About
          </a>
          <a href="#contact" className="hover:text-neonBlue transition">
            Contact
          </a>
        </nav>
      </div>

      {/* Mobile Nav (shown when navOpen = true) */}
      {navOpen && (
        <div className="md:hidden bg-black bg-opacity-70 px-8 pb-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/">
              <span
                className="hover:text-neonBlue transition cursor-pointer"
                onClick={() => setNavOpen(false)}
              >
                Home
              </span>
            </Link>
            <a
              href="#services"
              className="hover:text-neonBlue transition"
              onClick={() => setNavOpen(false)}
            >
              Services
            </a>
            <a
              href="#about"
              className="hover:text-neonBlue transition"
              onClick={() => setNavOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-neonBlue transition"
              onClick={() => setNavOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
