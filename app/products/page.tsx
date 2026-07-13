import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ProductShowcase from "@/components/products/ProductShowcase";
import FinalCTA from "@/components/ui/FinalCTA";
import { products } from "@/data/products";
import { absoluteUrl, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Party Games, Card Games & Jigsaw Puzzles",
  description: "Browse the official catalog of Mindovo tabletop games, family board games, and premium jigsaw puzzles. Crafted for offline bonding and eye comfort.",
  keywords: [
    "Mindovo Puzzles",
    "Bollywood Battle Game",
    "Mindovo Board Games",
    "Family Game Night India",
    "Gifting Board Games"
  ],
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Games & Puzzles | Mindovo Tabletop Curation",
    description: "Browse the official catalog of Mindovo tabletop games, family board games, and premium jigsaw puzzles.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  }
};

export default function ProductsPage() {
  const publishedProducts = products.filter((product) => product.isPublished);
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mindovo Party Games, Card Games and Jigsaw Puzzles",
    url: absoluteUrl("/products"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: publishedProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(product.websiteUrl),
        name: product.name,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(collectionJsonLd) }} />
      <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1 pt-16 bg-brand-bg">
        <h1 className="sr-only">Mindovo Party Games, Card Games and Jigsaw Puzzles</h1>
        <ProductShowcase bgColor="bg-brand-bg" />
        <FinalCTA />
      </main>
      <Footer />
      </SmoothScrollProvider>
    </>
  );
}
