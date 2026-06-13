import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import FAQ from "@/components/faq/FAQ";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata: Metadata = {
  title: "Help & FAQ | Mindovo Tabletop Games Support",
  description: "Find answers to frequently asked questions about Mindovo board games, jigsaw puzzles, order shipping times, and support requests.",
  keywords: [
    "Mindovo FAQ",
    "Mindovo Support",
    "Mindovo Rules",
    "Tabletop Help India"
  ],
  openGraph: {
    title: "Help & FAQ | Mindovo Tabletop Games Support",
    description: "Find answers to frequently asked questions about Mindovo board games, jigsaw puzzles, order shipping times.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  }
};

export default function FAQPage() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1 pt-24 bg-brand-bg">
        {/* FAQ Accordion Section */}
        <FAQ />

        {/* Conversion CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
