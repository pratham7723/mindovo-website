import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import FAQ from "@/components/faq/FAQ";
import FinalCTA from "@/components/ui/FinalCTA";
import { faqItems } from "@/data/faq";
import { breadcrumbJsonLd, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Help & FAQ | Mindovo Tabletop Games Support",
  description: "Find answers to frequently asked questions about Mindovo board games, jigsaw puzzles, order shipping times, and support requests.",
  keywords: [
    "Mindovo FAQ",
    "Mindovo Support",
    "Mindovo Rules",
    "Tabletop Help India"
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Help & FAQ | Mindovo Tabletop Games Support",
    description: "Find answers to frequently asked questions about Mindovo board games, jigsaw puzzles, order shipping times.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  }
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([faqJsonLd, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]) }} />
      <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1 pt-24 bg-brand-bg">
        <h1 className="sr-only">Mindovo Frequently Asked Questions</h1>
        {/* FAQ Accordion Section */}
        <FAQ />

        {/* Conversion CTA */}
        <FinalCTA />
      </main>
      <Footer />
      </SmoothScrollProvider>
    </>
  );
}
