"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const p1Ref = useRef<SVGPathElement>(null);
  const p2Ref = useRef<SVGPathElement>(null);
  const p3Ref = useRef<SVGPathElement>(null);
  const p4Ref = useRef<SVGPathElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (
      !p1Ref.current ||
      !p2Ref.current ||
      !p3Ref.current ||
      !p4Ref.current ||
      !svgRef.current ||
      !logoTextRef.current ||
      !containerRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        setTimeout(onComplete, 500); // Allow fadeout transition
      },
    });

    // Initial state: puzzle pieces dispersed and transparent
    gsap.set([p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current], {
      opacity: 0,
      scale: 0.5,
    });
    
    gsap.set(p1Ref.current, { x: -80, y: -50, rotate: -40 });
    gsap.set(p2Ref.current, { x: 80, y: -50, rotate: 30 });
    gsap.set(p3Ref.current, { x: -80, y: 50, rotate: -30 });
    gsap.set(p4Ref.current, { x: 80, y: 50, rotate: 40 });
    gsap.set(logoTextRef.current, { opacity: 0, scale: 0.85, y: 10 });
    gsap.set(svgRef.current, { rotate: 0 });

    // 1. Staggered fade-in of puzzle pieces
    tl.to(
      [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current],
      {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
        stagger: 0.1,
      },
      "+=0.2"
    );

    // 2. Convergence: pieces snap together in the center to form a rectangle
    tl.to(
      [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current],
      {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 1.2,
        ease: "power3.inOut",
      },
      "-=0.2"
    );

    // 3. Subtly rotate the assembled rectangle (the parent SVG)
    tl.to(
      svgRef.current,
      {
        rotate: 360,
        duration: 1.4,
        ease: "power3.inOut",
      },
      "+=0.1"
    );

    // 4. Reveal the logo inside the rectangle
    tl.to(
      logoTextRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // 5. Final glow aura flash
    tl.to(
      logoTextRef.current,
      {
        filter: "drop-shadow(0 0 10px rgba(255,255,255,0.4))",
        duration: 0.4,
        yoyo: true,
        repeat: 1,
      }
    );

    // 6. Exit animation: Slide up the preloader completely
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    }, "+=0.4");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  // If loading is done and component is unmounting
  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-bg"
    >
      <div className="relative flex items-center justify-center w-[260px] h-[156px] md:w-[320px] md:h-[192px]">
        {/* Jigsaw Puzzle Assembly (viewBox matches full 200x120 rectangle space) */}
        <svg
          ref={svgRef}
          viewBox="0 0 200 120"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          {/* Piece 1 (Top Left) - Blue */}
          <path
            ref={p1Ref}
            d="M 0,0 H 100 V 20 C 100,24 108,22 108,30 C 108,38 100,36 100,40 V 60 H 60 C 56,60 58,52 50,52 C 42,52 44,60 40,60 H 0 V 0 Z"
            className="text-puzzle-blue fill-current"
            style={{ transformOrigin: "50px 30px" }}
          />
          {/* Piece 2 (Top Right) - Green */}
          <path
            ref={p2Ref}
            d="M 100,0 H 200 V 60 H 160 C 156,60 158,68 150,68 C 142,68 144,60 140,60 H 100 V 40 C 100,36 108,38 108,30 C 108,22 100,24 100,20 V 0 Z"
            className="text-puzzle-green fill-current"
            style={{ transformOrigin: "150px 30px" }}
          />
          {/* Piece 3 (Bottom Left) - Orange */}
          <path
            ref={p3Ref}
            d="M 0,60 H 40 C 44,60 42,52 50,52 C 58,52 56,60 60,60 H 100 V 80 C 100,84 92,82 92,90 C 92,98 100,96 100,100 V 120 H 0 V 60 Z"
            className="text-puzzle-orange fill-current"
            style={{ transformOrigin: "50px 90px" }}
          />
          {/* Piece 4 (Bottom Right) - Red */}
          <path
            ref={p4Ref}
            d="M 100,60 H 140 C 144,60 142,68 150,68 C 158,68 156,60 160,60 H 200 V 120 H 100 V 100 C 100,96 92,98 92,90 C 92,82 100,84 100,80 V 60 Z"
            className="text-puzzle-red fill-current"
            style={{ transformOrigin: "150px 90px" }}
          />
        </svg>

        {/* Cinematic Logo Reveal inside the assembled rectangle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            ref={logoTextRef}
            className="select-none flex items-center justify-center"
          >
            <img 
              src="/mindovo.svg" 
              alt="Mindovo Logo" 
              className="h-6 md:h-8 w-auto brightness-0 invert" 
            />
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs font-display tracking-[0.4em] uppercase text-brand-text/40 animate-pulse-slow">
        Play. Think. Connect.
      </div>
    </div>
  );
}
