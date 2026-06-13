"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyMindovo() {
  const differences = [
    { emoji: "🧩", text: "Premium-quality puzzle pieces with precise cutting" },
    { emoji: "🎨", text: "Unique and engaging artwork designed to captivate" },
    { emoji: "🎁", text: "Beautiful gift-ready packaging" },
    { emoji: "⭐", text: "Trusted by over 100,000 customers on Amazon" },
    { emoji: "🏆", text: "Backed by the House of Fashion Dux & OTTAVO" },
    { emoji: "👨‍👩‍👧‍👦", text: "Designed for screen-free family connection" },
  ];

  return (
    <section id="why-mindovo" className="py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-brand-text/5">
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-puzzle-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-puzzle-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Brand Story (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-blue uppercase flex items-center gap-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Brand Heritage</span>
            </span>

            <h2 className="text-4xl md:text-5xl font-display font-black text-brand-text tracking-tight mb-2">
              Why Mindovo?
            </h2>

            <h3 className="text-xl md:text-2xl font-display font-bold text-brand-text/90 tracking-tight mt-2">
              Designed to Inspire. Crafted to Last.
            </h3>
            
            <h4 className="text-sm font-display font-semibold text-puzzle-orange tracking-wide uppercase mt-1 mb-8">
              From the House of Fashion Dux.
            </h4>

            {/* Paragraph block */}
            <div className="flex flex-col gap-6 text-sm md:text-base text-brand-text/75 leading-relaxed max-w-2xl">
              <p>
                <strong>Mindovo</strong> was born from a passion for meaningful play and thoughtful design. We create puzzles and games that bring together creativity, quality, and screen-free bonding, ensuring that every puzzle is precision-cut from premium thick board materials with a non-glare velvet-matte finish.
              </p>
              <p>
                Our roots go back to our parent company, <strong>Fashion Dux</strong>, founded in 2018. Over the years, Fashion Dux has rapidly established itself as a premier destination for stylish eyewear, trusted by more than 100,000 customers on Amazon for premium sunglasses, spectacles, lenses, and frames across India.
              </p>
              <p>
                Alongside eyewear, the House of Fashion Dux also brings you <strong>OTTAVO</strong>—a market-leading seller of premium Guardian bells and keychains on Amazon, celebrated for its craftsmanship and durability. Together, we bring a legacy of trust and quality to every product we create.
              </p>
            </div>
          </div>

          {/* Right Column: Differentiators Card (col-span-5) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-brand-text/5 shadow-md flex flex-col justify-between">
              <h3 className="text-lg md:text-xl font-display font-black text-brand-text tracking-tight mb-6 pb-3 border-b border-brand-text/5">
                What Makes Mindovo Different?
              </h3>

              {/* Differentiators list */}
              <div className="flex flex-col gap-4">
                {differences.map((diff, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-brand-bg transition-colors duration-200"
                  >
                    <span className="text-xl select-none" role="img" aria-hidden="true">
                      {diff.emoji}
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-brand-text/90 leading-normal">
                      {diff.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Footer philosophy statement */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-brand-text/5 text-center">
          <p className="text-base md:text-lg font-display font-black italic tracking-wide text-brand-text/80 max-w-2xl mx-auto leading-relaxed">
            "At Mindovo, we believe a puzzle is more than just pieces. It's a journey of discovery, focus, creativity, and connection."
          </p>
        </div>

      </div>
    </section>
  );
}
