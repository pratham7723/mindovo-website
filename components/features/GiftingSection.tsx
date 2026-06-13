"use client";

import { Sparkles, Gift, Heart, ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { motion } from "framer-motion";

export default function GiftingSection() {
  const activeProducts = products.filter((p) => p.isPublished);

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative Warm Blobs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-puzzle-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-puzzle-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Premium content storytelling */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-[10px] font-display font-black tracking-[0.35em] text-puzzle-orange uppercase mb-3 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>Gifting Perfected</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-brand-text tracking-tight mb-6 leading-tight">
              A Gift They'll Actually Remember.
            </h2>
            <p className="text-sm md:text-base text-brand-text/70 leading-relaxed mb-8">
              Forget disposable plastic toys and generic gift vouchers. Mindovo delivers beautifully crafted social hubs. A premium physical puzzle or cinema game represents hours of screen-free conversation, competition, and memory making.
            </p>

            {/* Visual bullet cards for gifting perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 bg-white border border-brand-text/5 rounded-2xl shadow-sm">
                <span className="text-xs font-bold text-brand-text">Luxury Unboxing</span>
                <p className="text-[11px] text-brand-text/60 mt-1.5 leading-relaxed">
                  Rigid board lid-and-base boxes with premium gold-foil stamp detailing. Feels like unboxing high-end design.
                </p>
              </div>
              <div className="p-5 bg-white border border-brand-text/5 rounded-2xl shadow-sm">
                <span className="text-xs font-bold text-brand-text">Ages 8 to 99</span>
                <p className="text-[11px] text-brand-text/60 mt-1.5 leading-relaxed">
                  Perfect cross-generational difficulty loops. Engaging for both grandchildren and grandparents.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={activeProducts[0]?.amazonUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-target inline-flex items-center justify-center gap-1.5 bg-brand-text text-brand-bg font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
                data-cursor-hint="Amazon"
              >
                <span>Gift A Puzzle</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={activeProducts[1]?.amazonUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-target inline-flex items-center justify-center gap-1.5 border-2 border-brand-text/10 hover:border-brand-text bg-transparent text-brand-text font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 hover:bg-brand-text/5 cursor-pointer"
                data-cursor-hint="Amazon"
              >
                <span>Gift Bollywood Battle</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right: Floating gift mock illustration */}
          <div className="lg:col-span-6 flex justify-center relative">
            
            {/* Box floating visual with nice overlays */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full border border-brand-text/5 bg-white flex items-center justify-center shadow-xl">
              
              {/* Outer gold glow ring */}
              <div className="absolute inset-4 border border-dashed border-[#CA8A04]/40 rounded-full animate-spin-slow" />
              
              {/* Central gift representation */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-32 h-32 bg-puzzle-orange rounded-3xl shadow-2xl flex items-center justify-center border border-white/20 relative overflow-hidden"
                >
                  {/* Inside content representing ribbons */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-white/25 -translate-x-1/2" />
                  <div className="absolute left-0 right-0 top-1/2 h-4 bg-white/25 -translate-y-1/2" />
                  <Gift className="w-12 h-12 text-white relative z-10 filter drop-shadow-md" />
                </motion.div>

                <span className="text-xs font-display font-black tracking-widest uppercase text-brand-text mt-6">
                  Ready-To-Play Gifting
                </span>
                <span className="text-[10px] text-brand-text/50 font-sans mt-1">
                  Deliver smiles directly to their doorstep
                </span>
              </div>
            </div>

            {/* Mini floating icons */}
            <div className="absolute top-8 left-12 p-3 bg-white rounded-2xl shadow-lg animate-float border border-brand-text/5">
              <Heart className="w-5 h-5 text-puzzle-red" />
            </div>
            <div className="absolute bottom-8 right-12 p-3 bg-white rounded-2xl shadow-lg animate-float border border-brand-text/5 [animation-delay:2s]">
              <Sparkles className="w-5 h-5 text-[#CA8A04]" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
