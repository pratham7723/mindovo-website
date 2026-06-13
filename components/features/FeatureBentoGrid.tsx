"use client";

import { Puzzle, Box, Sparkles, ShieldCheck, RefreshCw, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function FeatureBentoGrid() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="max-w-xl text-left mb-16">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-blue uppercase">
            Craftsmanship
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-text mt-3 tracking-tight">
            Designed To Be Touched.
          </h2>
          <p className="text-base text-brand-text/85 mt-4 leading-relaxed">
            Every material choice, surface finish, and box dimension is engineered to feel luxurious, durable, and satisfying in your hands.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[220px] md:auto-rows-[250px]">
          
          {/* Card 1: Velvet Touch Materials (col-span-2) */}
          <div className="md:col-span-2 md:row-span-1 rounded-3xl bg-brand-bg p-8 border border-brand-text/5 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between z-10">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-puzzle-blue bg-puzzle-blue/10 px-2 py-1 rounded uppercase">
                  Surface coating
                </span>
                <h3 className="text-xl md:text-2xl font-display font-black text-brand-text mt-3 tracking-tight">
                  Velvet-Touch Matte Coating
                </h3>
              </div>
              <Puzzle className="w-6 h-6 text-puzzle-blue mt-1" />
            </div>
            <p className="text-xs md:text-sm text-brand-text/85 max-w-md z-10 leading-relaxed">
              We apply a premium velvet-touch matte finish that completely eliminates reflections under table lamps, ensuring comfortable gameplay for hours without optical strain.
            </p>
            {/* Background absolute decor */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-puzzle-blue/5 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Card 2: Luxury Rigid Gift Box (col-span-1) */}
          <div className="md:col-span-1 md:row-span-2 rounded-3xl bg-neutral-900 text-white p-8 border border-white/5 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-xl">
            <div className="flex items-start justify-between z-10">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-[#CA8A04] bg-[#CA8A04]/10 px-2 py-1 rounded uppercase">
                  Packaging
                </span>
                <h3 className="text-xl md:text-2xl font-display font-black text-white mt-3 tracking-tight">
                  Luxury Gift Packaging
                </h3>
              </div>
              <Box className="w-6 h-6 text-[#CA8A04] mt-1" />
            </div>
            
            {/* Visual representation of gold foil box */}
            <div className="my-6 w-full h-28 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="w-16 h-20 bg-neutral-800 border border-[#CA8A04] rounded-lg shadow-lg flex flex-col justify-between p-2.5">
                <span className="text-[6px] tracking-widest text-[#CA8A04] font-black uppercase">Mindovo</span>
                <div className="w-full h-1 bg-[#CA8A04]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>

            <p className="text-xs text-white/80 z-10 leading-relaxed">
              Ditch the gift wrapping. All products arrive in high-density rigid boxes stamped with premium metallic gold foil details.
            </p>
          </div>

          {/* Card 3: Educational Value (col-span-1) */}
          <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-brand-bg p-8 border border-brand-text/5 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between z-10">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-puzzle-green bg-puzzle-green/10 px-2 py-1 rounded uppercase">
                  Skill boost
                </span>
                <h3 className="text-lg font-display font-black text-brand-text mt-3 tracking-tight">
                  Educational Value
                </h3>
              </div>
              <GraduationCap className="w-6 h-6 text-puzzle-green mt-1" />
            </div>
            <p className="text-xs text-brand-text/85 z-10 leading-relaxed">
              Enhance pattern matching, spatial visualization, cognitive retention, and social skills in children and adults.
            </p>
          </div>

          {/* Card 4: Eco-Friendly blueboard (col-span-1) */}
          <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-brand-bg p-8 border border-brand-text/5 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between z-10">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-puzzle-orange bg-puzzle-orange/10 px-2 py-1 rounded uppercase">
                  Sustainability
                </span>
                <h3 className="text-lg font-display font-black text-brand-text mt-3 tracking-tight">
                  100% Recyclable Board
                </h3>
              </div>
              <RefreshCw className="w-5 h-5 text-puzzle-orange mt-1" />
            </div>
            <p className="text-xs text-brand-text/85 z-10 leading-relaxed">
              Made with high-density recycled blueboard that does not bend, crack, or release fine pulp dust. Healthy for your family, healthy for the planet.
            </p>
          </div>

          {/* Card 5: Long Lasting Quality (col-span-2) */}
          <div className="md:col-span-2 md:row-span-1 rounded-3xl bg-brand-bg p-8 border border-brand-text/5 flex flex-col justify-between overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between z-10">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-puzzle-red bg-puzzle-red/10 px-2 py-1 rounded uppercase">
                  Durability
                </span>
                <h3 className="text-xl md:text-2xl font-display font-black text-brand-text mt-3 tracking-tight">
                  Built to Last Generations
                </h3>
              </div>
              <ShieldCheck className="w-6 h-6 text-puzzle-red mt-1" />
            </div>
            <p className="text-xs md:text-sm text-brand-text/85 max-w-md z-10 leading-relaxed">
              Interlocking tolerances are calibrated to micrometer precision. The puzzles stay securely joined when lifted, and the cards maintain springy, linen flex without splitting.
            </p>
            {/* Background decoration */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-puzzle-red/5 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
