import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mindovo | Premium Games, Puzzles & Family Experiences",
  description: "Discover premium, screen-free entertainment designed to bring friends and family together. Explore Jigsaw Puzzles, Bollywood Battle, and more.",
  keywords: [
    "Mindovo",
    "Jigsaw Puzzle India",
    "Bollywood Battle",
    "Board Games India",
    "Family Games India",
    "Educational Games India",
    "Party Games India"
  ],
  openGraph: {
    title: "Mindovo | Premium Games, Puzzles & Family Experiences",
    description: "Discover premium, screen-free entertainment designed to bring friends and family together.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindovo | Premium Games, Puzzles & Family Experiences",
    description: "Discover premium, screen-free entertainment designed to bring friends and family together.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mindovo",
    "url": "https://mindovo.com",
    "logo": "https://mindovo.com/logo.png",
    "sameAs": [
      "https://facebook.com/mindovo",
      "https://instagram.com/mindovo"
    ],
    "description": "Mindovo is a premium entertainment brand creating experiences that bring people together through games, puzzles, learning, fun, and competition."
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld-json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-brand-bg text-brand-text antialiased">
        {children}
      </body>
    </html>
  );
}
