import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import { ArrowUpRight, ShieldCheck, Heart, Sparkles, Star, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Fashion Dux | Premium Eyewear & Gifting Destination",
  description: "Founded in 2018, Fashion Dux is a top Amazon seller trusted by over 100,000 customers across India. Discover our mission to provide high-quality sunglasses, spectacles, and frames.",
  keywords: [
    "Fashion Dux",
    "About Fashion Dux",
    "Premium Eyewear India",
    "Spectacles Rajkot",
    "Spectacles India",
    "Sunglasses Amazon Seller",
    "Luxury Spectacle Frames"
  ],
  openGraph: {
    title: "About Fashion Dux | Premium Eyewear & Gifting Destination",
    description: "Founded in 2018, Fashion Dux is a top Amazon seller trusted by over 100,000 customers across India. Discover our mission.",
    type: "website",
    locale: "en_US",
    siteName: "Fashion Dux",
  }
};

export default function AboutPage() {
  // Structured data for Eyewear Brand SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": "Fashion Dux",
    "description": "Fashion Dux is a leading Indian eyewear brand offering high-quality lenses, sunglasses, spectacles, and frames.",
    "logo": "https://fashiondux.com/logo.png",
    "url": "https://fashiondux.com",
    "foundingDate": "2018",
    "knowsAbout": ["Eyewear", "Sunglasses", "Spectacles", "Frames", "Gifting"]
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

          {/* Background Ambient Blobs */}
          <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-puzzle-orange/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-puzzle-blue/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full px-6 md:px-8 relative z-10">
            
            {/* Breadcrumb / Category Tag */}
            <div className="flex justify-center mb-4">
              <span className="text-[10px] font-display font-black tracking-[0.45em] text-puzzle-orange uppercase">
                The House of Fashion Dux
              </span>
            </div>

            {/* Main Page Title */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 id="about-us-heading" className="text-5xl md:text-7xl font-display font-black leading-tight text-brand-text tracking-tighter">
                See the World <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-puzzle-blue via-puzzle-orange to-puzzle-red">
                  In Style.
                </span>
              </h1>
              <p className="text-base md:text-lg text-brand-text/60 mt-6 leading-relaxed">
                Founded in 2018, Fashion Dux is a leading Indian eyewear brand on Amazon trusted by over 100,000 customers. We believe eyewear should be a reflection of your personal style.
              </p>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
              <div className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-brand-text/5 text-center transition-all duration-300 hover:-translate-y-1">
                <span className="block text-4xl md:text-5xl font-display font-black text-puzzle-blue">
                  2018
                </span>
                <span className="text-[10px] font-display font-bold tracking-widest text-brand-text/45 uppercase mt-2 block">
                  Year Founded
                </span>
              </div>
              <div className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-brand-text/5 text-center transition-all duration-300 hover:-translate-y-1">
                <span className="block text-4xl md:text-5xl font-display font-black text-puzzle-orange">
                  100k+
                </span>
                <span className="text-[10px] font-display font-bold tracking-widest text-brand-text/45 uppercase mt-2 block">
                  Customers Trusted
                </span>
              </div>
              <div className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-brand-text/5 text-center transition-all duration-300 hover:-translate-y-1">
                <span className="block text-4xl md:text-5xl font-display font-black text-puzzle-green">
                  Free
                </span>
                <span className="text-[10px] font-display font-bold tracking-widest text-brand-text/45 uppercase mt-2 block">
                  Shipping Across India
                </span>
              </div>
              <div className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-brand-text/5 text-center transition-all duration-300 hover:-translate-y-1">
                <span className="block text-4xl md:text-5xl font-display font-black text-puzzle-red">
                  4.8★
                </span>
                <span className="text-[10px] font-display font-bold tracking-widest text-brand-text/45 uppercase mt-2 block">
                  Amazon rating
                </span>
              </div>
            </div>

            {/* Split Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
              {/* Left Side: Brand Story */}
              <div className="lg:col-span-6 flex flex-col gap-6 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-puzzle-orange" />
                  <span className="text-[10px] font-display font-black tracking-widest uppercase text-brand-text/40">
                    Our Mission & Vision
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display font-black text-brand-text tracking-tight leading-tight">
                  Stylish Eyewear, Handcrafted Quality, Unbeatable Prices.
                </h2>
                
                <p className="text-sm md:text-base text-brand-text/70 leading-relaxed font-sans">
                  At Fashion Dux, we believe eyewear is more than a functional medical device. It is a powerful fashion statement and a reflection of your personality. That’s why we curate a diverse range of sunglasses, spectacles, lenses, frames, and gifting items to cater to every aesthetic preference.
                </p>

                <p className="text-sm md:text-base text-brand-text/70 leading-relaxed font-sans">
                  Our commitment to excellence extends from premium material curations to our customer support. With our community expanding beyond 100,000 Amazon users, your trust drives us to innovate, design, and deliver premium eyewear to your doorstep.
                </p>

                {/* Icons Grid */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-puzzle-blue/5 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-puzzle-blue" />
                    </div>
                    <div>
                      <h4 className="text-xs font-display font-black text-brand-text uppercase">Premium Lenses</h4>
                      <p className="text-[10px] text-brand-text/50 mt-0.5">High definition, scratch resistant</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-puzzle-green/5 flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4 text-puzzle-green" />
                    </div>
                    <div>
                      <h4 className="text-xs font-display font-black text-brand-text uppercase">Free Shipping</h4>
                      <p className="text-[10px] text-brand-text/50 mt-0.5">Reliable delivery across India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-puzzle-orange/5 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-puzzle-orange" />
                    </div>
                    <div>
                      <h4 className="text-xs font-display font-black text-brand-text uppercase">Top Seller</h4>
                      <p className="text-[10px] text-brand-text/50 mt-0.5">100,000+ Amazon customers</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-puzzle-red/5 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 text-puzzle-red" />
                    </div>
                    <div>
                      <h4 className="text-xs font-display font-black text-brand-text uppercase">Ideal Gifts</h4>
                      <p className="text-[10px] text-brand-text/50 mt-0.5">Beautifully packaged sets</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Generated Image mockup with premium frame */}
              <div className="lg:col-span-6">
                <div className="relative p-3 bg-white rounded-3xl shadow-xl border border-brand-text/5 overflow-hidden">
                  <div className="absolute top-4 right-4 z-20 bg-brand-text text-brand-bg px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-puzzle-orange" />
                    <span className="text-[9px] font-display font-black uppercase tracking-wider">Premium Curation</span>
                  </div>
                  <img
                    src="/fashion-dux-eyewear.png"
                    alt="Luxury Sunglasses and reading glasses from Fashion Dux Collection"
                    className="w-full h-auto object-cover rounded-2xl aspect-square"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Conversion Section */}
            <div className="bg-neutral-950 text-white rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
              
              <span className="text-[10px] font-display font-bold tracking-[0.4em] text-[#CA8A04] uppercase">
                Explore The Catalogue
              </span>
              
              <h3 className="text-3xl md:text-5xl font-display font-black text-white mt-4 tracking-tight">
                Ready to Upgrade Your Eyewear?
              </h3>
              
              <p className="text-xs md:text-sm text-white/50 max-w-md mx-auto mt-4 leading-relaxed">
                Visit our official flagship store to browse our complete collection of spectacles, frames, sunglasses, and custom lens configurations.
              </p>

              <div className="mt-8 flex justify-center">
                <a
                  id="btn-visit-fashion-dux"
                  href="https://fashiondux.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-target inline-flex items-center gap-2 bg-white text-neutral-950 hover:bg-[#FAF8F5] font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  data-cursor-hint="External"
                >
                  <span>Visit FashionDux.com</span>
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
