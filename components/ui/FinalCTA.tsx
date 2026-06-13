"use client";

import { products } from "@/data/products";
import { ArrowUpRight, ShoppingBag, Mail } from "lucide-react";

export default function FinalCTA() {
  const activeProducts = products.filter((p) => p.isPublished);
  const puzzle = activeProducts.find((p) => p.slug === "jigsaw-puzzle");
  const game = activeProducts.find((p) => p.slug === "bollywood-battle");

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Floating Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-puzzle-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-puzzle-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
        
        {/* Core Tag */}
        <span className="text-[10px] font-display font-black tracking-[0.45em] text-puzzle-orange uppercase">
          Unplug & Engage
        </span>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-display font-black text-brand-text mt-4 tracking-tighter">
          Ready To Play?
        </h2>

        {/* Subhead */}
        <p className="text-base md:text-lg text-brand-text/60 max-w-xl mx-auto mt-4 leading-relaxed">
          Order a flagship box today and bring family and friends together for unforgettable offline challenges.
        </p>

        {/* Conversion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16 text-left">
          
          {/* Puzzle Purchase Card */}
          {puzzle && (
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-brand-text/5 shadow-md flex flex-col justify-between overflow-hidden relative group">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-puzzle-blue bg-puzzle-blue/10 px-3 py-1 rounded uppercase">
                  Available Now
                </span>
                <h3 className="text-2xl font-display font-black text-brand-text mt-4 tracking-tight">
                  Mindovo Jigsaw Puzzle
                </h3>
                <p className="text-xs text-brand-text/60 mt-2 leading-relaxed">
                  300 pieces, glare-free velvet coating, thick blueboard, and a luxury rigid box layout.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={puzzle.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-puzzle-blue hover:bg-blue-900 text-white font-display text-xs font-black tracking-widest uppercase py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy on Amazon</span>
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-checkout", { detail: { product: "Mindovo Jigsaw Puzzle" } }))}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 border border-puzzle-blue/20 hover:border-puzzle-blue/60 bg-transparent text-puzzle-blue hover:bg-puzzle-blue/5 font-display text-xs font-black tracking-widest uppercase py-4 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <span>Our Website</span>
                </button>
              </div>
            </div>
          )}

          {/* Bollywood Battle Purchase Card */}
          {game && (
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-brand-text/5 shadow-md flex flex-col justify-between overflow-hidden relative group">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-puzzle-red bg-puzzle-red/10 px-3 py-1 rounded uppercase">
                  Available Now
                </span>
                <h3 className="text-2xl font-display font-black text-brand-text mt-4 tracking-tight">
                  Bollywood Battle Game
                </h3>
                <p className="text-xs text-brand-text/60 mt-2 leading-relaxed">
                  200+ cards with dialogue quizzes, singing mimics, action penalties, and a cinematically stamped layout.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={game.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-puzzle-red hover:bg-red-950 text-white font-display text-xs font-black tracking-widest uppercase py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy on Amazon</span>
                </a>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-checkout", { detail: { product: "Bollywood Battle" } }))}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 border border-puzzle-red/20 hover:border-puzzle-red/60 bg-transparent text-puzzle-red hover:bg-puzzle-red/5 font-display text-xs font-black tracking-widest uppercase py-4 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <span>Our Website</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* General Contact trigger */}
        <div className="mt-16 flex items-center justify-center">
          <a
            href="mailto:hello@mindovo.com"
            className="inline-flex items-center gap-2 text-xs font-display font-bold text-brand-text/50 hover:text-brand-text transition-colors duration-200 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Have queries? Contact hello@mindovo.com</span>
          </a>
        </div>

      </div>
    </section>
  );
}
