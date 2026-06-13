"use client";

import { products } from "@/data/products";
import { Mail, ShieldCheck, Heart, Sparkles, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  const activeProducts = products.filter((p) => p.isPublished);
  const comingSoonProducts = products.filter((p) => p.isComingSoon);

  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Decorative subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand details (col-span-4) */}
          <div className="md:col-span-4 flex flex-col items-start text-left">
            <div className="flex items-center select-none mb-4">
              <img src="/mindovo.svg" alt="Mindovo Logo" className="h-6 w-auto brightness-0 invert" />
            </div>
            <p className="text-xs md:text-sm text-white/50 mt-4 leading-relaxed max-w-sm">
              We create premium physical games, puzzles, and offline social entertainment designed to stimulate your focus, rest your eyes, and bring families together.
            </p>
            {/* Visual indicators */}
            <div className="flex gap-4 mt-6">
              <span className="text-[10px] font-display font-bold tracking-wider text-white/40 uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#CA8A04]" />
                <span>Premium Quality</span>
              </span>
              <span className="text-[10px] font-display font-bold tracking-wider text-white/40 uppercase flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-puzzle-red" />
                <span>Eco-Friendly</span>
              </span>
            </div>
          </div>

          {/* Column 2: Active Products (col-span-3) */}
          <div className="md:col-span-3 flex flex-col text-left">
            <h4 className="text-xs font-display font-black tracking-wider text-[#CA8A04] uppercase mb-4">
              Products
            </h4>
            <div className="flex flex-col gap-2.5">
              {activeProducts.map((p) => (
                <a
                  key={p.id}
                  href={p.websiteUrl}
                  className="text-xs text-white/60 hover:text-white transition-colors duration-200"
                >
                  {p.name}
                </a>
              ))}
              {comingSoonProducts.map((p) => (
                <div
                  key={p.id}
                  className="text-xs text-white/30 flex items-center gap-1.5"
                >
                  <span>{p.name}</span>
                  <span className="text-[8px] font-display bg-white/5 text-white/40 px-1 py-0.2 rounded border border-white/5 font-semibold uppercase">
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Sitemap navigation (col-span-2) */}
          <div className="md:col-span-2 flex flex-col text-left">
            <h4 className="text-xs font-display font-black tracking-wider text-[#CA8A04] uppercase mb-4">
              Explore
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="/"
                className="text-xs text-white/60 hover:text-white transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="/products"
                className="text-xs text-white/60 hover:text-white transition-colors duration-200"
              >
                Games & Puzzles
              </a>
              <a
                href="/experience"
                className="text-xs text-white/60 hover:text-white transition-colors duration-200"
              >
                Experience
              </a>
              <a
                href="/reviews"
                className="text-xs text-white/60 hover:text-white transition-colors duration-200"
              >
                Reviews
              </a>
              <a
                href="/faq"
                className="text-xs text-white/60 hover:text-white transition-colors duration-200"
              >
                FAQ
              </a>
              <a
                href="/about"
                className="text-xs text-white/60 hover:text-white transition-colors duration-200"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Column 4: Contact details (col-span-3) */}
          <div className="md:col-span-3 flex flex-col text-left">
            <h4 className="text-xs font-display font-black tracking-wider text-[#CA8A04] uppercase mb-4">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:support@mindovo.in"
                className="text-xs text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                <span>support@mindovo.in</span>
              </a>
              <a
                href="tel:+919925212340"
                className="text-xs text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                <span>+91 99252 12340</span>
              </a>
              <div className="flex items-start gap-2 text-xs text-white/60 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#CA8A04] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase font-display font-black tracking-wider mb-1">Address</span>
                  <p className="text-[11px] leading-relaxed text-white/50">
                    Fashion Dux, Office No.324, Universal Trade Centre, old Shree Raj Cinema, Opp. Siromani Complex, Sanganva Chowk, Rajkot-360001
                  </p>
                  <a
                    href="https://share.google/VivvIROG1HW6mNpc0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#CA8A04] hover:text-[#E8D8BA] font-display font-bold mt-1.5 transition-colors duration-200"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Metadata block */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span className="text-[10px] text-white/40 font-sans">
            &copy; {new Date().getFullYear()} Mindovo. All rights reserved.
          </span>
          <div className="flex items-center gap-1.5 text-[10px] text-white/40">
            <span>Handcrafted with precision and</span>
            <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
            <span>by Mindovo Team</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
