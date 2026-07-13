import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import JigsawPuzzleSection from "@/components/jigsaw-puzzle/JigsawPuzzleSection";
import InteractiveGameZone from "@/components/home/InteractiveGameZone";
import { ChevronLeft } from "lucide-react";
import { breadcrumbJsonLd, jsonLd, productJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "300-Piece Jigsaw Puzzle",
  description: "Explore the premium Mindovo 300-piece Jigsaw Puzzle. Velvet-matte anti-glare coatings, rigid packaging, and robust eco-friendly blueboard pieces.",
  keywords: [
    "Mindovo Jigsaw Puzzle",
    "300 Piece Puzzle India",
    "Eco Friendly Jigsaw Puzzle",
    "Anti Glare Board Games"
  ],
  alternates: { canonical: "/products/jigsaw-puzzle" },
  openGraph: {
    title: "Mindovo Jigsaw Puzzle | Premium 300-Piece Tabletop Puzzle",
    description: "Explore the premium Mindovo 300-piece Jigsaw Puzzle. Velvet-matte anti-glare coatings, rigid packaging.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  }
};

export default function JigsawPuzzlePage() {
  const product = productJsonLd("jigsaw-puzzle");
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Games & Puzzles", path: "/products" },
    { name: "Mindovo Jigsaw Puzzle", path: "/products/jigsaw-puzzle" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([product, breadcrumbs]) }} />
      <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1 pt-24 bg-brand-bg">
        {/* Back Link Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8">
          <a
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-display font-black tracking-widest uppercase text-brand-text/75 hover:text-brand-text transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Games & Puzzles</span>
          </a>
        </div>

        <JigsawPuzzleSection />
        <InteractiveGameZone hideTabs defaultTab="jigsaw" />
      </main>
      <Footer />
      </SmoothScrollProvider>
    </>
  );
}
