"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The velvet finish on the puzzle pieces is unbelievable. Under direct dining lights, there was zero glare. It made our family puzzle night incredibly relaxing.",
    author: "Ananya Sharma",
    role: "Mother of two",
    rating: 5,
  },
  {
    quote: "Bollywood Battle is our absolute go-to party game now. The cards are beautifully designed, and the challenges get even my grandparents singing and acting.",
    author: "Rohan Mehta",
    role: "Film enthusiast & host",
    rating: 5,
  },
  {
    quote: "I bought the Jigsaw Puzzle as a housewarming gift. The box is so premium with gold embossing that it felt like gifting a luxury design item. Highly recommend!",
    author: "Sneha Kapoor",
    role: "UX Designer",
    rating: 5,
  },
  {
    quote: "As a school counselor, I highly recommend Mindovo puzzles. It is a brilliant, completely screen-free cognitive training exercise that children actually enjoy.",
    author: "Dr. Kabir Roy",
    role: "Child Psychologist",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Warm Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-puzzle-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-puzzle-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-blue uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-text mt-3 tracking-tight">
            Loved By Families.
          </h2>
          <p className="text-base text-brand-text/85 mt-4 leading-relaxed">
            See how Mindovo products are helping families log off, connect, and enjoy meaningful offline time.
          </p>
        </div>

        {/* Reviews Horizontal Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              className="glass-panel p-8 rounded-3xl border border-brand-text/5 shadow-sm hover:shadow-md flex flex-col justify-between relative group cursor-pointer transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Quote Mark */}
              <Quote className="absolute top-6 right-8 w-12 h-12 text-brand-text/5 group-hover:text-puzzle-blue/10 transition-colors duration-300 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, sIndex) => (
                    <Star key={sIndex} className="w-4 h-4 text-[#CA8A04] fill-current" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm md:text-base text-brand-text/85 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 mt-8 pt-4 border-t border-brand-text/5">
                <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center font-display font-black text-brand-text/75 text-xs border border-brand-text/5">
                  {t.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand-text">
                    {t.author}
                  </span>
                  <span className="text-[10px] text-brand-text/80">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
