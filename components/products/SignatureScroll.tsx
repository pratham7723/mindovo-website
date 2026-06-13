"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SignatureScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  
  // Ref for the puzzle quadrants
  const q1Ref = useRef<HTMLDivElement>(null);
  const q2Ref = useRef<HTMLDivElement>(null);
  const q3Ref = useRef<HTMLDivElement>(null);
  const q4Ref = useRef<HTMLDivElement>(null);
  
  // Text and final container refs
  const textRef = useRef<HTMLDivElement>(null);
  const centerFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    // Pin timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=250%", // How long the pin lasts
        scrub: 1, // Smooth scrub tracking the scrollbar
        pin: true,
        anticipatePin: 1,
      },
    });

    // Set initial dispersed states for the quadrants
    gsap.set(q1Ref.current, { xPercent: -150, yPercent: -150, rotate: -40 });
    gsap.set(q2Ref.current, { xPercent: 150, yPercent: -120, rotate: 30 });
    gsap.set(q3Ref.current, { xPercent: -130, yPercent: 130, rotate: -25 });
    gsap.set(q4Ref.current, { xPercent: 160, yPercent: 140, rotate: 45 });
    gsap.set(textRef.current, { opacity: 0, scale: 0.9, y: 50 });
    gsap.set(centerFrameRef.current, { boxShadow: "0 0 0px rgba(17,17,17,0)" });

    // Step 1: Fly pieces together and snap to center
    tl.to(
      [q1Ref.current, q2Ref.current, q3Ref.current, q4Ref.current],
      {
        xPercent: 0,
        yPercent: 0,
        rotate: 0,
        duration: 2,
        ease: "power2.inOut",
      }
    );

    // Step 2: Flash a glowing border/shadow to represent the pieces interlocking
    tl.to(
      centerFrameRef.current,
      {
        boxShadow: "0 25px 50px -12px rgba(17, 17, 17, 0.25), 0 0 40px rgba(37, 99, 235, 0.2)",
        duration: 0.5,
      },
      "-=0.5"
    );

    // Step 3: Fade in the overlay text / tagline
    tl.to(
      textRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "+=0.2"
    );

    // Step 4: Scale up slightly as a finished product
    tl.to(
      centerFrameRef.current,
      {
        scale: 1.05,
        duration: 1.5,
        ease: "power2.inOut",
      },
      "+=0.1"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#FAF8F5] overflow-hidden">
      {/* Clip Paths for puzzle shapes */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Top-Left Quadrant */}
          <clipPath id="puzzle-tl" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 H 1 V 0.4 C 1.08,0.4 1.08,0.6 1,0.6 V 1 H 0.6 C 0.6,0.92 0.4,0.92 0.4,1 H 0 Z" />
          </clipPath>
          {/* Top-Right Quadrant */}
          <clipPath id="puzzle-tr" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 H 1 V 1 H 0.6 C 0.6,1.08 0.4,1.08 0.4,1 H 0 V 0.6 C 0.08,0.6 0.08,0.4 0,0.4 Z" />
          </clipPath>
          {/* Bottom-Left Quadrant */}
          <clipPath id="puzzle-bl" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 H 0.4 C 0.4,-0.08 0.6,-0.08 0.6,0 H 1 V 0.4 C 0.92,0.4 0.92,0.6 1,0.6 V 1 H 0 Z" />
          </clipPath>
          {/* Bottom-Right Quadrant */}
          <clipPath id="puzzle-br" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 H 0.4 C 0.4,0.08 0.6,0.08 0.6,0 H 1 V 1 H 0 V 0.6 C -0.08,0.6 -0.08,0.4 0,0.4 Z" />
          </clipPath>
        </defs>
      </svg>

      <div ref={stickyRef} className="h-screen w-full flex flex-col justify-center items-center px-6 md:px-8 relative">
        <div className="text-center max-w-xl mb-12">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-orange uppercase">
            Signature Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-brand-text mt-3 tracking-tight">
            How The Magic Comes Together.
          </h2>
        </div>

        {/* Puzzle Assembly Frame */}
        <div
          ref={centerFrameRef}
          className="relative w-full max-w-[640px] aspect-[4/3] rounded-3xl bg-transparent transition-all duration-300 overflow-visible border border-brand-text/5 shadow-2xl"
        >
          {/* Grid of 4 Quadrants */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            
            {/* Quadrant 1 (Top Left) */}
            <div
              ref={q1Ref}
              className="w-full h-full relative overflow-hidden bg-puzzle-blue select-none"
              style={{ clipPath: "url(#puzzle-tl)" }}
            >
              {/* Overlay graphic representing puzzle board */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />
              <div className="absolute bottom-6 left-6 text-white font-display font-black text-6xl opacity-15">
                PLAY
              </div>
            </div>

            {/* Quadrant 2 (Top Right) */}
            <div
              ref={q2Ref}
              className="w-full h-full relative overflow-hidden bg-puzzle-green select-none"
              style={{ clipPath: "url(#puzzle-tr)" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />
              <div className="absolute bottom-6 right-6 text-white font-display font-black text-6xl opacity-15">
                THINK
              </div>
            </div>

            {/* Quadrant 3 (Bottom Left) */}
            <div
              ref={q3Ref}
              className="w-full h-full relative overflow-hidden bg-puzzle-orange select-none"
              style={{ clipPath: "url(#puzzle-bl)" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />
              <div className="absolute top-6 left-6 text-white font-display font-black text-6xl opacity-15">
                BOND
              </div>
            </div>

            {/* Quadrant 4 (Bottom Right) */}
            <div
              ref={q4Ref}
              className="w-full h-full relative overflow-hidden bg-puzzle-red select-none"
              style={{ clipPath: "url(#puzzle-br)" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />
              <div className="absolute top-6 right-6 text-white font-display font-black text-6xl opacity-15">
                SHARE
              </div>
            </div>

          </div>

          {/* Full Screen Image inside assembled grid (faded in when combined) */}
          <div className="absolute inset-0 bg-brand-text/5 flex items-center justify-center p-8 text-center select-none pointer-events-none rounded-3xl overflow-hidden">
            {/* Lifestyle Mockup Grid Background */}
            <div className="absolute inset-0 bg-[url('/lifestyle-assembling.png')] bg-cover bg-center opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 z-10" />

            <div ref={textRef} className="z-20 text-white flex flex-col items-center">
              <span className="text-[10px] font-display font-black tracking-[0.5em] text-puzzle-orange mb-3 uppercase">
                Mindovo Ecosystem
              </span>
              <h3 className="text-2xl md:text-4xl font-display font-black tracking-tight text-white max-w-md leading-tight mb-4">
                Designed for Unplugging. Built for Bonding.
              </h3>
              <p className="text-xs md:text-sm font-sans text-white/70 max-w-sm">
                Every Mindovo game is crafted with thick premium materials, gorgeous textures, and custom components to turn game nights into ritual entertainment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
