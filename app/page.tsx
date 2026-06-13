"use client";

import LoadingScreen from "@/components/ui/LoadingScreen";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import SignatureScroll from "@/components/products/SignatureScroll";
import ProductShowcase from "@/components/products/ProductShowcase";
import InteractiveGameZone from "@/components/home/InteractiveGameZone";
import Testimonials from "@/components/testimonials/Testimonials";
import StatsSection from "@/components/features/StatsSection";
import FinalCTA from "@/components/ui/FinalCTA";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      {/* Smooth Scroll Wrapper & Main Website Hydrated immediately in the background */}
      <SmoothScrollProvider>
        
        {/* Header navbar */}
        <Navbar />

        {/* Main Content Layout sections */}
        <main className="flex-1 flex flex-col">
          {/* Hero Banner with 3D Canvas */}
          <Hero />

          {/* Signature GSAP Scroll-Trigger Jigsaw Assembly Experience */}
          <SignatureScroll />

          {/* Main Products catalog */}
          <ProductShowcase />

          {/* Interactive Game Demo Zone */}
          <InteractiveGameZone />

          {/* Testimonials Review Slider */}
          <Testimonials />

          {/* Stats counters section */}
          <StatsSection />

          {/* Closing purchase CTA */}
          <FinalCTA />
        </main>

        {/* Sitemap Footer */}
        <Footer />

      </SmoothScrollProvider>

      {/* Preloader Loading Sequence - Overlays and unmounts itself when finished */}
      <LoadingScreen onComplete={() => {}} />
    </>
  );
}
