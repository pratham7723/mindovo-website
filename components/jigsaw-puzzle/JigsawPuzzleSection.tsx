"use client";

import { products } from "@/data/products";
import { Puzzle, Box, Image, Award, Heart, HelpCircle, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function JigsawPuzzleSection() {
  const puzzle = products.find((p) => p.slug === "jigsaw-puzzle");

  if (!puzzle) return null;

  const specIcons: Record<string, React.ReactNode> = {
    "Quantity": <Puzzle className="w-5 h-5 text-puzzle-blue" />,
    "Dimensions": <Image className="w-5 h-5 text-puzzle-blue" />,
    "Material": <Award className="w-5 h-5 text-puzzle-blue" />,
    "Printing": <Award className="w-5 h-5 text-puzzle-blue" />,
    "Difficulty": <Heart className="w-5 h-5 text-puzzle-blue" />,
    "Box Style": <Box className="w-5 h-5 text-puzzle-blue" />,
  };

  const featureItems = [
    {
      title: "300 Velvet-Touch Pieces",
      description: "Thick premium blueboard pieces that lock together with a satisfying, tactile click.",
      icon: <Puzzle className="w-6 h-6 text-white" />,
    },
    {
      title: "Anti-Glare Matte Print",
      description: "Vibrant colors printed with velvet matte coat. Zero reflection even under direct light.",
      icon: <Image className="w-6 h-6 text-white" />,
    },
    {
      title: "Luxury Gift Packaging",
      description: "Comes in a high-density structured box with elegant gold foil detailing, ready for gifting.",
      icon: <Box className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section id="jigsaw-puzzle" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Clip Paths for puzzle shapes */}
      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id="spec-piece-1" clipPathUnits="objectBoundingBox">
            <path d="M 0.15,0.15 H 0.85 V 0.4 C 0.92,0.4 0.98,0.45 0.98,0.5 C 0.98,0.55 0.92,0.6 0.85,0.6 V 0.85 H 0.6 C 0.6,0.78 0.55,0.72 0.5,0.72 C 0.45,0.72 0.4,0.78 0.4,0.85 H 0.15 V 0.5 C 0.22,0.5 0.28,0.45 0.28,0.4 C 0.28,0.35 0.22,0.3 0.15,0.3 Z" />
          </clipPath>
          <clipPath id="spec-piece-2" clipPathUnits="objectBoundingBox">
            <path d="M 0.15,0.15 H 0.5 C 0.5,0.22 0.55,0.28 0.6,0.28 C 0.65,0.28 0.7,0.22 0.7,0.15 H 0.85 V 0.85 H 0.15 V 0.6 C 0.22,0.6 0.28,0.55 0.28,0.5 C 0.28,0.45 0.22,0.4 0.15,0.4 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Title Ticker */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-blue uppercase">
            Signature Puzzle
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-text mt-3 tracking-tight">
            Mindovo Jigsaw Puzzle
          </h2>
          <p className="text-base text-brand-text/60 mt-4 leading-relaxed">
            Discover a meditative puzzle experience designed to stimulate cognitive focus, promote mindfulness, and create bonding spaces.
          </p>
        </div>

        {/* Dynamic Presentation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Dynamic Snapping Illustration with Framer Motion */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-96 md:w-80 md:h-[420px] rounded-3xl bg-white p-6 border border-brand-text/5 shadow-2xl flex flex-col justify-between overflow-hidden">
              {/* Product Label */}
              <div className="flex flex-col">
                <span className="text-[9px] font-display font-black tracking-widest text-puzzle-blue uppercase">
                  Mindovo Collection
                </span>
                <span className="text-2xl font-display font-black text-brand-text mt-1">
                  JIGSAW PUZZLE
                </span>
              </div>

              {/* Dynamic Interactive Pieces Convergence Visualizer */}
              <div className="relative w-full h-48 my-4 bg-brand-bg/50 border border-brand-text/5 rounded-2xl overflow-hidden flex items-center justify-center">
                {/* Assembling puzzle piece animations */}
                <motion.div
                  initial={{ x: -100, y: -50, rotate: -45, opacity: 0 }}
                  whileInView={{ x: -15, y: -10, rotate: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="absolute w-20 h-20 bg-puzzle-blue rounded-lg shadow-lg flex items-center justify-center text-white text-[10px] font-bold font-display"
                  style={{ clipPath: "url(#spec-piece-1)" }}
                >
                  PLAY
                </motion.div>

                <motion.div
                  initial={{ x: 100, y: 80, rotate: 60, opacity: 0 }}
                  whileInView={{ x: 15, y: 10, rotate: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="absolute w-20 h-20 bg-puzzle-orange rounded-lg shadow-lg flex items-center justify-center text-white text-[10px] font-bold font-display"
                  style={{ clipPath: "url(#spec-piece-2)" }}
                >
                  BOND
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.15 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-puzzle-blue/10 flex items-center justify-center border border-dashed border-puzzle-blue/30 rounded-xl"
                >
                  <Puzzle className="w-8 h-8 text-puzzle-blue animate-pulse-slow" />
                </motion.div>
              </div>

              {/* Specs badges */}
              <div className="flex gap-2">
                <span className="text-[10px] font-bold text-brand-text bg-brand-bg px-3 py-1.5 rounded-lg border border-brand-text/5">
                  300 Pcs
                </span>
                <span className="text-[10px] font-bold text-brand-text bg-brand-bg px-3 py-1.5 rounded-lg border border-brand-text/5">
                  45 × 30 cm
                </span>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-puzzle-blue/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-puzzle-green/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right: Technical specifications and bullet layout */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-display font-black text-brand-text tracking-tight mb-8">
              Technical Specifications
            </h3>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {Object.entries(puzzle.specs).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-brand-text/5 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-2.5 bg-brand-bg rounded-xl">
                    {specIcons[key] || <HelpCircle className="w-5 h-5 text-puzzle-blue" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-brand-text/40 font-display font-bold tracking-wider uppercase">
                      {key}
                    </span>
                    <span className="text-sm font-semibold text-brand-text mt-0.5">
                      {val}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bullet features */}
            <div className="flex flex-col gap-4 mb-10">
              {featureItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-puzzle-blue flex items-center justify-center mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-text">
                      {item.title}
                    </h4>
                    <p className="text-xs text-brand-text/60 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={puzzle.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-puzzle-blue hover:bg-blue-900 text-white font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy on Amazon</span>
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-checkout", { detail: { product: "Mindovo Jigsaw Puzzle" } }))}
                className="inline-flex items-center justify-center gap-2 border-2 border-puzzle-blue/20 hover:border-puzzle-blue bg-transparent hover:bg-puzzle-blue/5 text-puzzle-blue font-display text-xs font-black tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Buy on Our Website</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
