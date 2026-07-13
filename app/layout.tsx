import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { jsonLd, organizationJsonLd, websiteJsonLd, siteConfig } from "@/lib/seo";

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mindovo | Party Games & Premium Jigsaw Puzzles",
    template: "%s | Mindovo",
  },
  description: siteConfig.description,
  applicationName: "Mindovo",
  category: "Games & puzzles",
  keywords: [
    "Mindovo",
    "party games India",
    "jigsaw puzzles India",
    "family games",
    "Bollywood Battle",
    "Bollywood trivia game",
    "card games",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Mindovo | Party Games & Premium Jigsaw Puzzles",
    description: siteConfig.description,
    url: "/",
    type: "website",
    locale: "en_IN",
    siteName: "Mindovo",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mindovo party games and premium jigsaw puzzles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindovo | Party Games & Premium Jigsaw Puzzles",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd([organizationJsonLd, websiteJsonLd]) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-brand-bg text-brand-text antialiased">
        {children}
      </body>
    </html>
  );
}
