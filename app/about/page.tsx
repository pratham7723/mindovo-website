import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import { ArrowUpRight, ShieldCheck, Heart, Sparkles, Star, ToyBrick, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Mindovo & The House of Fashion Dux",
  description: "Learn about Mindovo's premium puzzles and games, our parent company Fashion Dux (eyewear seller trusted by 100k+ customers), and sister brand OTTAVO.",
  keywords: [
    "Mindovo About Us",
    "Fashion Dux",
    "OTTAVO Guardian Bells",
    "OTTAVO Keychains",
    "Premium Jigsaw Puzzles",
    "Spectacles India",
    "Amazon Best Sellers"
  ],
  openGraph: {
    title: "About Us | Mindovo & The House of Fashion Dux",
    description: "Learn about Mindovo's premium puzzles and games, our parent company Fashion Dux, and sister brand OTTAVO.",
    type: "website",
    locale: "en_US",
    siteName: "Mindovo",
  }
};

export default function AboutPage() {
  const differences = [
    { emoji: "🧩", title: "Premium Materials", text: "Thick rigid blueboard and velvet-matte coatings" },
    { emoji: "🎨", title: "Unique Artwork", text: "Custom illustrations designed to captivate" },
    { emoji: "🎁", title: "Gift-Ready Box", text: "Luxury stamped packaging ideal for sharing" },
    { emoji: "⭐", title: "Customer Trust", text: "Over 100,000 satisfied shoppers on Amazon" },
    { emoji: "🏆", title: "Parent Heritage", text: "Backed by the House of Fashion Dux & OTTAVO" },
    { emoji: "👨‍👩‍👧‍👦", title: "Offline Connection", text: "Designed for screen-free family memories" },
  ];

  // Structured data for SEO combining the brand portfolio
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": "Mindovo",
    "description": "Mindovo is a premium board game and jigsaw puzzle brand from the House of Fashion Dux.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Fashion Dux",
      "foundingDate": "2018",
      "url": "https://fashiondux.com",
      "brand": [
        {
          "@type": "Brand",
          "name": "Mindovo",
          "description": "Premium board games, card games, and puzzles."
        },
        {
          "@type": "Brand",
          "name": "OTTAVO",
          "description": "Leading seller of premium Guardian bells and keychains on Amazon."
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SmoothScrollProvider>
        {/* Floating Navbar */}
        <Navbar />

        <main className="flex-1 flex flex-col pt-32 pb-24 bg-brand-bg relative overflow-hidden">
          {/* Decorative Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Ambient Blobs */}
          <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-puzzle-blue/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-puzzle-orange/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full px-6 md:px-8 relative z-10">
            
            {/* Title Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[10px] font-display font-bold tracking-[0.45em] text-puzzle-orange uppercase">
                Brand Biography
              </span>
              <h1 id="about-us-heading" className="text-5xl md:text-7xl font-display font-black leading-tight text-brand-text tracking-tighter mt-4">
                Play, Style <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-puzzle-blue via-puzzle-orange to-puzzle-red">
                  & Curation.
                </span>
              </h1>
              <p className="text-base md:text-lg text-brand-text/60 mt-6 leading-relaxed">
                Discover the story of <strong className="font-black text-brand-text">Mindovo</strong>—our flagship puzzles and games—and the heritage of trust, quality, and community established by our parent company, <strong className="font-black text-brand-text">Fashion Dux</strong>, and sister brand, <strong className="font-black text-brand-text">OTTAVO</strong>.
              </p>
            </div>

            {/* COMBINED SECTION 1: MINDOVO & WHY MINDOVO DIFFERENTIATORS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-28">
              {/* Left Column: Mindovo Details & Image */}
              <div className="lg:col-span-7 flex flex-col gap-8 text-left">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-puzzle-blue" />
                    <span className="text-[10px] font-display font-black tracking-widest uppercase text-brand-text/40">
                      Creative Entertainment
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-display font-black text-brand-text tracking-tight leading-tight">
                    Mindovo: Premium Puzzles & Screen-Free Play.
                  </h2>

                  <div className="flex flex-col gap-5 text-sm md:text-base text-brand-text/70 leading-relaxed font-sans">
                    <p>
                      <strong>Mindovo</strong> was born from a passion for meaningful play and thoughtful design. We create puzzles and games that bring together creativity, quality, and screen-free bonding, ensuring that every puzzle is precision-cut from premium thick board materials with a non-glare velvet-matte finish.
                    </p>
                    <p>
                      Every Mindovo puzzle is carefully crafted using premium materials, vibrant artwork, and precision-cut pieces to ensure a satisfying experience from the first piece to the final fit. Whether you're enjoying a quiet evening, spending quality time with family, or searching for the perfect gift, Mindovo transforms simple moments into memorable experiences.
                    </p>
                  </div>
                </div>

                {/* Mindovo Lifestyle Image Mockup */}
                <div className="relative p-3 bg-white rounded-3xl shadow-xl border border-brand-text/5 overflow-hidden w-full">
                  <div className="absolute top-6 right-6 z-20 bg-brand-text text-brand-bg px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                    <ToyBrick className="w-3 h-3 text-puzzle-blue" />
                    <span className="text-[9px] font-display font-black uppercase tracking-wider">Family Bonding</span>
                  </div>
                  <img
                    src="/lifestyle-assembling.png"
                    alt="Family happily assembling a Mindovo Jigsaw Puzzle on a table"
                    className="w-full h-auto object-cover rounded-2xl aspect-[16/10]"
                  />
                </div>
              </div>

              {/* Right Column: Differentiators Card (Why Mindovo) */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-white rounded-3xl p-8 border border-brand-text/5 shadow-md flex flex-col justify-between">
                  <h3 className="text-lg md:text-xl font-display font-black text-brand-text tracking-tight mb-6 pb-3 border-b border-brand-text/5">
                    What Makes Mindovo Different?
                  </h3>

                  {/* Differentiators list using pure CSS hover animations */}
                  <div className="flex flex-col gap-4">
                    {differences.map((diff, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-3.5 rounded-xl hover:bg-brand-bg transition-all duration-300 transform hover:translate-x-1.5 cursor-default group"
                      >
                        <span className="text-2xl select-none shrink-0" role="img" aria-hidden="true">
                          {diff.emoji}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-brand-text group-hover:text-puzzle-blue transition-colors duration-200">
                            {diff.title}
                          </span>
                          <span className="text-xs text-brand-text/60 mt-0.5 leading-relaxed">
                            {diff.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: PARENT BRAND FASHION DUX & SISTER BRAND OTTAVO */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
              {/* Left Column: Eyewear Image */}
              <div className="lg:col-span-6">
                <div className="relative p-3 bg-white rounded-3xl shadow-xl border border-brand-text/5 overflow-hidden">
                  <div className="absolute top-4 left-4 z-20 bg-brand-text text-brand-bg px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-puzzle-orange" />
                    <span className="text-[9px] font-display font-black uppercase tracking-wider">Luxury Curation</span>
                  </div>
                  <img
                    src="/fashion-dux-eyewear.png"
                    alt="Premium Fashion Dux Sunglasses and Spectacles Collection"
                    className="w-full h-auto object-cover rounded-2xl aspect-[4/3] lg:aspect-square"
                  />
                </div>
              </div>

              {/* Right Column: Fashion Dux & OTTAVO Details */}
              <div className="lg:col-span-6 flex flex-col gap-6 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-puzzle-orange" />
                  <span className="text-[10px] font-display font-black tracking-widest uppercase text-brand-text/40">
                    The House of Fashion Dux
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-black text-brand-text tracking-tight leading-tight">
                  Fashion Dux & OTTAVO: Built on Trust.
                </h2>

                <p className="text-sm md:text-base text-brand-text/70 leading-relaxed font-sans">
                  Mindovo is backed by the standards, quality, and shipping infrastructure of <strong>Fashion Dux</strong>, founded in 2018. Over the years, Fashion Dux has rapidly established itself as a premier destination for stylish eyewear, trusted by more than 100,000 customers on Amazon for premium sunglasses, spectacles, lenses, and frames across India.
                </p>

                <p className="text-sm md:text-base text-brand-text/70 leading-relaxed font-sans">
                  Alongside eyewear, the House of Fashion Dux also brings you <strong>OTTAVO</strong>—a market-leading seller of premium Guardian bells and keychains on Amazon, celebrated for its craftsmanship and durability. Together, we bring a legacy of trust and quality to every product we create.
                </p>

                {/* Metrics Highlight */}
                <div className="grid grid-cols-3 gap-4 border-t border-brand-text/5 pt-6 mt-2">
                  <div>
                    <span className="block text-2xl font-display font-black text-puzzle-orange">2018</span>
                    <span className="text-[9px] font-display font-bold uppercase tracking-wider text-brand-text/40 block mt-0.5">Est. Year</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-display font-black text-puzzle-blue">100k+</span>
                    <span className="text-[9px] font-display font-bold uppercase tracking-wider text-brand-text/40 block mt-0.5">Eyewear Buyers</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-display font-black text-puzzle-green">Top Seller</span>
                    <span className="text-[9px] font-display font-bold uppercase tracking-wider text-brand-text/40 block mt-0.5">Amazon Ratings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Philosophy quote section (Why Mindovo quote) */}
            <div className="my-20 py-10 border-t border-b border-brand-text/5 text-center relative max-w-4xl mx-auto">
              <Quote className="w-10 h-10 text-[#CA8A04] opacity-20 mx-auto mb-4" />
              <p className="text-lg md:text-2xl font-display font-black italic tracking-wide text-brand-text/80 leading-relaxed">
                "At Mindovo, we believe a puzzle is more than just pieces. It's a journey of discovery, focus, creativity, and connection."
              </p>
            </div>

            {/* Brand CTA */}
            <div className="bg-neutral-950 text-white rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden text-center mt-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
              
              <span className="text-[10px] font-display font-bold tracking-[0.4em] text-[#CA8A04] uppercase">
                Explore Our Brands
              </span>
              
              <h3 className="text-3xl md:text-4xl font-display font-black text-white mt-4 tracking-tight">
                Crafting Quality Across Categories
              </h3>
              
              <p className="text-xs md:text-sm text-white/50 max-w-md mx-auto mt-4 leading-relaxed">
                Whether you are assembling a luxury jigsaw puzzle, selecting stylish prescription eyewear, or choosing a protective Guardian bell, the House of Fashion Dux delivers perfection.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  id="btn-visit-fashion-dux"
                  href="https://fashiondux.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-target inline-flex items-center justify-center gap-2 bg-white text-neutral-950 hover:bg-[#FAF8F5] font-display text-xs font-black tracking-widest uppercase px-6 py-4 rounded-xl transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  data-cursor-hint="External"
                >
                  <span>Visit FashionDux.com</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  id="btn-amazon-ottavo"
                  href="https://www.amazon.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-target inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/60 bg-transparent text-white hover:bg-white/5 font-display text-xs font-black tracking-widest uppercase px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer text-center"
                >
                  <span>Shop OTTAVO on Amazon</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </main>

        {/* Global Footer */}
        <Footer />
      </SmoothScrollProvider>
    </>
  );
}
