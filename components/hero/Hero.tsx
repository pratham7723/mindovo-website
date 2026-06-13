"use client";

import dynamic from "next/dynamic";
import { products } from "@/data/products";
import { ArrowDown, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import Three.js canvas to avoid SSR errors
const HeroCanvas = dynamic(() => import("../three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center min-h-[450px] md:min-h-[600px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-brand-text/10 border-t-brand-text rounded-full animate-spin" />
        <span className="text-xs font-display tracking-widest text-brand-text/60 uppercase">
          Loading 3D Experience
        </span>
      </div>
    </div>
  ),
});

export default function Hero() {
  const activeProducts = products.filter((p) => p.isPublished);

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Word variants for staggered reveal
  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any, // Custom cubic-bezier for premium feel
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-bg">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Floating Ambient Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-puzzle-blue/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-puzzle-red/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow [animation-delay:1.5s]" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Premium Cinematic Branding */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Tracking Ticker */}
          <motion.div
            variants={wordVariants}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-puzzle-green animate-ping" />
            <span className="text-xs font-display font-black tracking-[0.3em] uppercase text-brand-text/75">
              Introducing Premium Entertainment
            </span>
          </motion.div>

          {/* Cinematic Large Headlines */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={wordVariants}
              className="text-6xl sm:text-7xl xl:text-8xl font-display font-black leading-[0.9] text-brand-text tracking-tighter"
            >
              PLAY.
              <br />
              THINK.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-puzzle-blue via-puzzle-orange to-puzzle-red">
                CONNECT.
              </span>
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p
            variants={wordVariants}
            className="text-lg md:text-xl text-brand-text/90 font-sans max-w-lg mb-10 leading-relaxed"
          >
            Premium games and puzzles meticulously designed to unplug your mind, trigger discovery, and bring family and friends together through unforgettable, screen-free experiences.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            variants={wordVariants}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a
              href="#showcase"
              className="magnetic-target w-full sm:w-auto inline-flex items-center justify-center bg-brand-text text-brand-bg font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              data-cursor-hint="Explore"
            >
              Explore Products
            </a>

            <a
              href={activeProducts[0]?.amazonUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-target w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-brand-text/10 hover:border-brand-text/90 bg-transparent text-brand-text font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 hover:bg-brand-text/5 cursor-pointer"
              data-cursor-hint="Amazon"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Now</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Dynamic 3D Canvas */}
        <div className="lg:col-span-5 w-full h-[450px] md:h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <HeroCanvas />
          </motion.div>
        </div>
      </div>

      {/* Elegant Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
        <span className="text-[10px] font-display font-bold tracking-[0.35em] uppercase text-brand-text">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
