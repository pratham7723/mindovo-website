"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Camera, Layers, Users } from "lucide-react";

interface GallerySlide {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  bgGradient: string;
  icon: React.ReactNode;
}

const GALLERY_SLIDES: GallerySlide[] = [
  {
    title: "Satisfying Tactile Interlocks",
    subtitle: "Precision tolerances",
    description: "Every piece is die-cut to exact tolerances, meaning pieces lock together with a crisp, physical click. You can pick up the assembled puzzle without glue.",
    badge: "Tactile Quality",
    bgGradient: "from-blue-50/70 via-white to-white",
    icon: <Layers className="w-6 h-6 text-[#2563EB]" />,
  },
  {
    title: "Cinematic Bollywood Cards",
    subtitle: "Linen-finished card deck",
    description: "Bollywood Battle card decks are printed on 350GSM cardstock with linen texturing. Sleek to shuffle, heavy to hold, and designed for late-night game play.",
    badge: "Card Craftsmanship",
    bgGradient: "from-red-50/70 via-white to-white",
    icon: <Sparkles className="w-6 h-6 text-[#DC2626]" />,
  },
  {
    title: "Full-Size Reference Posters",
    subtitle: "Zero reflections, maximum color",
    description: "Each jigsaw puzzle contains a beautiful 1:1 scale reference poster printed on matte heavy artboard. Easy to lay out on standard dining tables.",
    badge: "Poster Detailing",
    bgGradient: "from-green-50/70 via-white to-white",
    icon: <Camera className="w-6 h-6 text-[#059669]" />,
  },
  {
    title: "Designed For Late Night Conversations",
    subtitle: "Bringing tables to life",
    description: "Our games act as physical catalysts. They trigger memory retrieval, mimes, stories, and debates, turning simple tables into warm social hubs.",
    badge: "Social Design",
    bgGradient: "from-orange-50/70 via-white to-white",
    icon: <Users className="w-6 h-6 text-[#EA580C]" />,
  },
];

export default function ProductGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Calculate total horizontal scroll width
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollAmount = totalWidth - viewportWidth;

    const scrollTween = gsap.to(track, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        start: "top top",
        end: `+=${scrollAmount}`,
        scrub: 1, // Smooth scrub sync
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      if (scrollTween.scrollTrigger) {
        scrollTween.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#FAF8F5] overflow-hidden">
      
      {/* Sticky Top Header */}
      <div className="absolute top-12 left-6 md:left-12 z-20 text-brand-text pointer-events-none">
        <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-blue uppercase">
          Visual Showroom
        </span>
        <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight text-brand-text mt-2">
          Closeups & Components.
        </h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div ref={trackRef} className="flex h-screen w-max items-center pr-24 pl-6 md:pl-12">
        {GALLERY_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`w-[85vw] md:w-[60vw] max-w-[800px] h-[70vh] rounded-3xl mx-4 flex flex-col justify-between p-8 md:p-12 relative overflow-hidden bg-gradient-to-tr ${slide.bgGradient} border border-brand-text/5 select-none shadow-2xl`}
          >
            {/* Grid overlay for tech vibe */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            {/* Slide Header */}
            <div className="flex items-start justify-between z-10">
              <span className="text-[9px] font-display font-black tracking-widest text-brand-text/85 bg-brand-bg border border-brand-text/10 px-3 py-1.5 rounded-full uppercase">
                {slide.badge}
              </span>
              <div className="p-3 bg-brand-bg rounded-2xl border border-brand-text/5">
                {slide.icon}
              </div>
            </div>

            {/* Slide Image Placeholder Box with glossy border */}
            <div className="w-full h-36 md:h-48 my-6 bg-brand-bg/60 border border-brand-text/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <span className="text-[10px] font-display font-black tracking-[0.3em] text-brand-text/30 uppercase">
                Micro-Detailing Showcase
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-text/5 to-transparent translate-x-[-100%] animate-pulse-slow" />
            </div>

            {/* Slide Body */}
            <div className="z-10 text-left">
              <span className="text-[10px] font-display font-bold text-[#854D0E] tracking-widest uppercase">
                {slide.subtitle}
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-black text-brand-text mt-1 leading-tight tracking-tight">
                {slide.title}
              </h3>
              <p className="text-xs md:text-sm text-brand-text/85 mt-4 leading-relaxed max-w-xl">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
