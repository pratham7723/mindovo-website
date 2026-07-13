import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import SignatureScroll from "@/components/products/SignatureScroll";
import FeatureBentoGrid from "@/components/features/FeatureBentoGrid";
import GiftingSection from "@/components/features/GiftingSection";
import ProductGallery from "@/components/products/ProductGallery";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata: Metadata = {
  title: "The Mindovo Experience | Premium Materials & Gifting Curation",
  description: "Learn how the magic comes together. Discover our premium velvet-touch matte finishes, rigid gift boxes, sustainable blueboard, and luxury gifting packages.",
  keywords: [
    "Mindovo Quality",
    "Gifting Board Games",
    "Premium Puzzle Materials",
    "Velvet Touch Puzzles"
  ],
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "The Mindovo Experience | Premium Materials & Gifting Curation",
    description: "Learn how the magic comes together. Discover our premium velvet-touch matte finishes, rigid gift boxes, sustainable blueboard.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  }
};

export default function ExperiencePage() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1 pt-16">
        <h1 className="sr-only">The Mindovo Experience: Premium Games and Puzzles</h1>
        {/* Pinned Scroll Assembly experience */}
        <SignatureScroll />

        {/* Bento characteristics of material quality */}
        <FeatureBentoGrid />

        {/* Parallax horizontal photo showroom */}
        <ProductGallery />

        {/* Gifting promotion layout */}
        <GiftingSection />

        {/* Conversion Footer */}
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
