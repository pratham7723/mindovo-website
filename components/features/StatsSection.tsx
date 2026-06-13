"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  id: number;
  value: number;
  suffix: string;
  prefix?: string;
  title: string;
  description: string;
  colorClass: string;
}

const STATS: StatItem[] = [
  {
    id: 1,
    value: 1000,
    suffix: "+",
    title: "Families Entertained",
    description: "Creating offline social hubs inside living rooms across the country.",
    colorClass: "text-puzzle-blue",
  },
  {
    id: 2,
    value: 5000,
    suffix: "+",
    title: "Games Completed",
    description: "Hours of logic-building puzzles and film trivia showdowns completed.",
    colorClass: "text-puzzle-green",
  },
  {
    id: 3,
    value: 4.9,
    suffix: "/5",
    title: "Customer Rating",
    description: "Consistently rated five stars for thickness, matte surface, and packaging.",
    colorClass: "text-[#854D0E]",
  },
  {
    id: 4,
    value: 100,
    suffix: "%",
    title: "Screen-Free Fun",
    description: "Fully analog design meant to give your eyes and minds a complete break.",
    colorClass: "text-puzzle-red",
  },
];

function AnimatedCounter({ value, duration = 2, suffix, prefix = "", isInView }: { value: number; duration?: number; suffix: string; prefix?: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = duration * 60; // 60fps
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = start + easeProgress * (end - start);
      
      // Handle decimals (e.g. 4.9)
      if (value % 1 !== 0) {
        setCount(Number(currentCount.toFixed(1)));
      } else {
        setCount(Math.floor(currentCount));
      }

      if (frame >= totalFrames) {
        setCount(value);
        clearInterval(counterInterval);
      }
    }, 1000 / 60);

    return () => clearInterval(counterInterval);
  }, [value, duration, isInView]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="py-20 bg-[#FAF8F5] relative overflow-hidden border-y border-brand-text/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-brand-text/5 shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
            >
              {/* Animated Stat Value */}
              <span className={`text-4xl md:text-5xl font-display font-black tracking-tight ${stat.colorClass}`}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  isInView={isInView}
                />
              </span>

              {/* Title */}
              <h3 className="text-sm font-display font-bold text-brand-text mt-4 tracking-tight">
                {stat.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] md:text-xs text-brand-text/85 mt-2 leading-relaxed max-w-[200px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
