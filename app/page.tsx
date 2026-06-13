"use client";

import LoadingScreen from "@/components/ui/LoadingScreen";
import CheckoutModal from "@/components/ui/CheckoutModal";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import SignatureScroll from "@/components/products/SignatureScroll";
import ProductShowcase from "@/components/products/ProductShowcase";
import JigsawPuzzleSection from "@/components/jigsaw-puzzle/JigsawPuzzleSection";
import BollywoodBattleSection from "@/components/bollywood-battle/BollywoodBattleSection";
import WhyMindovo from "@/components/features/WhyMindovo";
import FeatureBentoGrid from "@/components/features/FeatureBentoGrid";
import GiftingSection from "@/components/features/GiftingSection";
import ProductGallery from "@/components/products/ProductGallery";
import Testimonials from "@/components/testimonials/Testimonials";
import StatsSection from "@/components/features/StatsSection";
import FAQ from "@/components/faq/FAQ";
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
          {/* Hero Banner */}
          <Hero />

          {/* Pinned Scroll Assembly experience */}
          <SignatureScroll />

          {/* Main Products catalog */}
          <ProductShowcase />

          {/* Dedicated Product details: Jigsaw Puzzle */}
          <JigsawPuzzleSection />

          {/* Dedicated Product details: Bollywood Battle */}
          <BollywoodBattleSection />

          {/* Bento grid characteristics */}
          <FeatureBentoGrid />

          {/* Emotional Pitch: Why Mindovo */}
          <WhyMindovo />

          {/* Gifting promotion */}
          <GiftingSection />

          {/* Horizontal visual showroom gallery */}
          <ProductGallery />

          {/* Testimonials */}
          <Testimonials />

          {/* Stats Counters */}
          <StatsSection />

          {/* FAQ Accordion */}
          <FAQ />

          {/* Closing purchase CTA */}
          <FinalCTA />
        </main>

        {/* Sitemap Footer */}
        <Footer />

      </SmoothScrollProvider>

      {/* 3. Preloader Loading Sequence - Overlays and unmounts itself when finished */}
      <LoadingScreen onComplete={() => {}} />

      {/* Global Checkout Modal for "Buy on Our Website" options */}
      <CheckoutModal />
    </>
  );
}
