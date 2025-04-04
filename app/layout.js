import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./loader"; // 👈 Import your loader here

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "M R Consultants | Real Estate & Construction",
  description:
    "M R Consultants specializes in national and international real estate, building construction, land development, and home interior design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Loader />{" "}
        {/* 👈 Place the loader at the top to show it during transitions */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
