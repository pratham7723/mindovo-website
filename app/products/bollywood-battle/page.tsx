import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import BollywoodBattleSection from "@/components/bollywood-battle/BollywoodBattleSection";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Bollywood Battle Game | Cinematic Party Trivia Card Game",
  description: "Experience Bollywood Battle, the premium party card game featuring over 200 dialogue, singing, and action trivia cards. Designed for 3-10 players.",
  keywords: [
    "Bollywood Battle Game",
    "Bollywood Trivia Cards",
    "Bollywood Card Game India",
    "Party Board Games India"
  ],
  openGraph: {
    title: "Bollywood Battle Game | Cinematic Party Trivia Card Game",
    description: "Experience Bollywood Battle, the premium party card game featuring over 200 dialogue, singing, and action trivia cards.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  }
};

export default function BollywoodBattlePage() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1 pt-24 bg-brand-bg">
        {/* Back Link Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8">
          <a
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-display font-black tracking-widest uppercase text-brand-text/50 hover:text-brand-text transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Games & Puzzles</span>
          </a>
        </div>

        <BollywoodBattleSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
