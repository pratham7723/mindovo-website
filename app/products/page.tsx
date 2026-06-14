import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ProductShowcase from "@/components/products/ProductShowcase";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata: Metadata = {
  title: "Games & Puzzles | Mindovo Tabletop Curation",
  description: "Browse the official catalog of Mindovo tabletop games, family board games, and premium jigsaw puzzles. Crafted for offline bonding and eye comfort.",
  keywords: [
    "Mindovo Puzzles",
    "Bollywood Battle Game",
    "Mindovo Board Games",
    "Family Game Night India",
    "Gifting Board Games"
  ],
  openGraph: {
    title: "Games & Puzzles | Mindovo Tabletop Curation",
    description: "Browse the official catalog of Mindovo tabletop games, family board games, and premium jigsaw puzzles.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  }
};

export default function ProductsPage() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1 pt-16 bg-brand-bg">
        <ProductShowcase bgColor="bg-brand-bg" />
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
