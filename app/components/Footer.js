// app/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-gradient">
            M R Consultants
          </h3>
          <p className="text-gray-400">
            We are a leading firm in real estate, construction, land
            development, and home interior design—delivering futuristic
            solutions that redefine innovation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-neonBlue transition">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-neonBlue transition">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-neonBlue transition">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-neonBlue transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">
            123 Future St, Innovation City, Country
          </p>
          <p className="text-gray-400">Email: info@mrconsultants.com</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neonBlue transition"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.037-1.85-3.037-1.85 0-2.133 1.445-2.133 2.939v5.667h-3.553v-11.5h3.412v1.571h.049c.475-.9 1.637-1.85 3.369-1.85 3.601 0 4.266 2.37 4.266 5.455v6.324zm-16.447-13.902c-1.144 0-2.07-.927-2.07-2.071 0-1.144.926-2.07 2.07-2.07 1.145 0 2.07.926 2.07 2.07 0 1.144-.925 2.07-2.07 2.07zm1.777 13.902h-3.554v-11.5h3.554v11.5zm18.223-20.452h-22.447c-1.105 0-2 .895-2 2v20.447c0 1.105.895 2 2 2h22.447c1.105 0 2-.895 2-2v-20.447c0-1.105-.895-2-2-2z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neonBlue transition"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.464h-1.261c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.987c4.781-.75 8.438-4.887 8.438-9.878z" />
              </svg>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neonBlue transition"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.292 4.292 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.91 12.14 12.14 0 01-8.81-4.47 4.27 4.27 0 001.32 5.7 4.21 4.21 0 01-1.94-.54v.06a4.28 4.28 0 003.43 4.19 4.29 4.29 0 01-1.93.07 4.28 4.28 0 004 2.98 8.6 8.6 0 01-5.32 1.84 8.68 8.68 0 01-1.02-.06 12.16 12.16 0 006.59 1.93c7.91 0 12.24-6.55 12.24-12.24l-.01-.56a8.7 8.7 0 002.15-2.21z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} M R Consultants. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
