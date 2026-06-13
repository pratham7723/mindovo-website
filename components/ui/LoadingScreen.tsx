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
  const emblemRef = useRef<HTMLDivElement>(null);
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
    if (emblemRef.current) {
      gsap.set(emblemRef.current, { scale: 0, rotate: -30, opacity: 0 });
    }
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

    // 4.5. Bouncy animation for the game emblem
    if (emblemRef.current) {
      tl.to(
        emblemRef.current,
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(2.2)",
        },
        "-=0.7"
      );
    }

    // 5. Subtle logo scale pulse (avoids layout-shifting drop-shadows)
    tl.to(
      logoTextRef.current,
      {
        scale: 1.05,
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
      <div className="relative flex items-center justify-center w-[180px] h-[108px] md:w-[220px] md:h-[132px]">
        {/* Jigsaw Puzzle Assembly (viewBox matches full 200x120 rectangle space) */}
        <svg
          ref={svgRef}
          viewBox="0 0 200 120"
          className="w-full h-full overflow-visible"
        >
          {/* Piece 1 (Top Left) - Soft Alabaster/Cream */}
          <path
            ref={p1Ref}
            d="M 0,0 H 100 V 22 C 96,22 94,25 94,28 C 94,31 108,27 108,30 C 108,33 94,29 94,32 C 94,35 96,38 100,38 V 60 H 58 C 58,64 55,66 52,66 C 49,66 53,52 50,52 C 47,52 51,66 48,66 C 45,66 42,64 42,60 H 0 V 0 Z"
            fill="#FAF8F6"
            style={{ transformOrigin: "50px 30px" }}
          />
          {/* Piece 2 (Top Right) - Soft Gold/Champagne */}
          <path
            ref={p2Ref}
            d="M 100,0 H 200 V 60 H 158 C 158,56 155,54 152,54 C 149,54 153,68 150,68 C 147,68 151,54 148,54 C 145,54 142,56 142,60 H 100 V 38 C 96,38 94,35 94,32 C 94,29 108,33 108,30 C 108,27 94,31 94,28 C 94,25 96,22 100,22 V 0 Z"
            fill="#E8D8BA"
            style={{ transformOrigin: "150px 30px" }}
          />
          {/* Piece 3 (Bottom Left) - Soft Warm Grey */}
          <path
            ref={p3Ref}
            d="M 0,60 H 42 C 42,64 45,66 48,66 C 51,66 47,52 50,52 C 53,52 49,66 52,66 C 55,66 58,64 58,60 H 100 V 82 C 104,82 106,85 106,88 C 106,91 92,87 92,90 C 92,93 106,89 106,92 C 106,95 104,98 100,98 V 120 H 0 V 60 Z"
            fill="#E6DFD4"
            style={{ transformOrigin: "50px 90px" }}
          />
          {/* Piece 4 (Bottom Right) - Soft Sand */}
          <path
            ref={p4Ref}
            d="M 100,60 H 142 C 142,60 145,54 148,54 C 151,54 147,68 150,68 C 153,68 149,54 152,54 C 155,54 158,56 158,60 H 200 V 120 H 100 V 98 C 104,98 106,95 106,92 C 106,89 92,93 92,90 C 92,87 106,91 106,88 C 106,85 104,82 100,82 V 60 Z"
            fill="#F0EAE1"
            style={{ transformOrigin: "150px 90px" }}
          />
        </svg>

        {/* Cinematic Logo Reveal inside the assembled rectangle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            ref={logoTextRef}
            className="select-none flex flex-col items-center justify-center"
          >
            {/* Game-centric Emblem (Meeple + Puzzle Piece) */}
            <div
              ref={emblemRef}
              className="flex items-center justify-center gap-1.5 mb-2 md:mb-2.5 shrink-0"
            >
              {/* Gold Board Game Meeple */}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 drop-shadow-sm filter brightness-95"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4.2 6.25a1.5 1.5 0 0 0-1.5-1.25H9.3a1.5 1.5 0 0 0-1.5 1.25l-1.2 4.8a1.5 1.5 0 0 0 1.45 1.85h1.15l-.9 5.4A1.5 1.5 0 0 0 9.8 21h4.4a1.5 1.5 0 0 0 1.5-1.7l-.9-5.4h1.15a1.5 1.5 0 0 0 1.45-1.85l-1.2-4.8z"
                  fill="#CA8A04"
                />
              </svg>
              {/* Slate Interlocking Puzzle Piece */}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 drop-shadow-sm"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 10.5V8a1 1 0 0 0-1-1h-2.5a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 15.5 4a1.5 1.5 0 0 1 1.5-1.5V1.5A1.5 1.5 0 0 0 15.5 0h-2.5a1 1 0 0 0-1 1v0.5a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 9 1.5V1A1 1 0 0 0 8 0H5.5A1.5 1.5 0 0 0 4 1.5v2.5a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 1 4a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h0.5a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 1.5 11.5H1a1 1 0 0 0-1 1V15a1.5 1.5 0 0 0 1.5 1.5h2.5a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 4 19.5V20a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-0.5a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5v0.5a1 1 0 0 0 1 1h2.5a1.5 1.5 0 0 0 1.5-1.5v-2.5a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5h0.5a1 1 0 0 0 1-1v-2.5a1 1 0 0 0-1-1h-0.5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5h0.5a1 1 0 0 0 1-1z"
                  fill="#111111"
                />
              </svg>
            </div>

            <img 
              src="/mindovo.svg" 
              alt="Mindovo Logo" 
              className="h-4 md:h-4.5 w-auto" 
            />
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs font-display tracking-[0.4em] uppercase text-brand-text/80 animate-pulse-text-slow">
        Play. Think. Connect.
      </div>
    </div>
  );
}
