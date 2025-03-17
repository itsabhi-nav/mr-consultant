"use client";

import Link from "next/link";

export default function BlogSidebar() {
  return (
    <aside className="bg-black bg-opacity-50 p-6 rounded-xl sticky top-24 space-y-6">
      {/* Subscribe */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Subscribe</h3>
        <p className="text-sm opacity-80">
          Get the latest updates and insights directly to your inbox.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-3 py-2 bg-black bg-opacity-40 border border-neonBlue rounded-l focus:outline-none"
          />
          <button className="bg-neonBlue text-black px-3 py-2 rounded-r hover:opacity-80 transition">
            Join
          </button>
        </div>
      </div>
      {/* Popular Posts */}
      <div>
        <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
        <ul className="space-y-2 text-neonBlue">
          <li>
            <Link href="/blog/futuristic-real-estate-trends">
              Futuristic Real Estate Trends
            </Link>
          </li>
          <li>
            <Link href="/blog/building-construction-in-2030">
              Building Construction in 2030
            </Link>
          </li>
        </ul>
      </div>
      {/* Categories */}
      <div>
        <h3 className="text-xl font-bold mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/blog?category=Land Development"
              className="hover:text-neonBlue"
            >
              Land Development
            </Link>
          </li>
          <li>
            <Link
              href="/blog?category=Real Estate"
              className="hover:text-neonBlue"
            >
              Real Estate
            </Link>
          </li>
          <li>
            <Link
              href="/blog?category=Building Construction"
              className="hover:text-neonBlue"
            >
              Building Construction
            </Link>
          </li>
          <li>
            <Link
              href="/blog?category=Interior Design"
              className="hover:text-neonBlue"
            >
              Interior Design
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
