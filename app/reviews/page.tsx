import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import Testimonials from "@/components/testimonials/Testimonials";
import StatsSection from "@/components/features/StatsSection";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata: Metadata = {
  title: "Reviews & Feedback | What Families Say About Mindovo",
  description: "Read verified customer reviews about Mindovo puzzles and party games. Learn how we help thousands of families entertain themselves screen-free.",
  keywords: [
    "Mindovo Reviews",
    "Mindovo Ratings",
    "Family Board Games Feedback",
    "Spectacles Eyewear Trust"
  ],
  openGraph: {
    title: "Reviews & Feedback | What Families Say About Mindovo",
    description: "Read verified customer reviews about Mindovo puzzles and party games.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  }
};

export default function ReviewsPage() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1 pt-24 bg-brand-bg">
        {/* Reviews Section */}
        <Testimonials />

        {/* Stats Counters */}
        <StatsSection />

        {/* Conversion CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
