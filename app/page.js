// app/page.js
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import StatsSection from "./components/StatsSection";
import ProcessSection from "./components/ProcessSection";
import ParallaxCTA from "./components/ParallaxCTA";
import TeamSection from "./components/TeamSection";
import PortfolioSection from "./components/PortfolioSection";
import GallerySection from "./components/GallerySection"; // <-- New import
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import VideoSection from "./components/VideoSection";
import ContactForm from "./components/ContactForm";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Services />
      <StatsSection />
      <ProcessSection />
      <ParallaxCTA />
      <TeamSection />
      <PortfolioSection />
      <GallerySection /> {/* <-- Render the new GallerySection here */}
      <TestimonialsSection />
      <FAQSection />
      <VideoSection />
      <ContactForm />
      <ScrollToTopButton />
    </main>
  );
}
