"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!logoTextRef.current || !containerRef.current) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        setTimeout(onComplete, 500); // Allow fadeout transition
      },
    });

    // Snappy Initial State
    gsap.set(logoTextRef.current, { opacity: 0, scale: 0.85, y: 15 });
    if (emblemRef.current) {
      gsap.set(emblemRef.current, { scale: 0.5, rotate: -20, opacity: 0 });
    }

    // 1. Reveal logo and emblem with a spring
    tl.to(
      logoTextRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.5)",
      },
      "+=0.2"
    );

    if (emblemRef.current) {
      tl.to(
        emblemRef.current,
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2.2)",
        },
        "-=0.45"
      );
    }

    // 2. Short hold for readability
    tl.to({}, { duration: 0.5 });

    // 3. Snappy exit transition: Slide up
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0A09]"
    >
      <div className="flex flex-col items-center justify-center">
        {/* Core Logo Group */}
        <div
          ref={logoTextRef}
          className="select-none flex flex-col items-center justify-center"
        >
          {/* Game-centric Emblem (Meeple + Puzzle Piece) */}
          <div
            ref={emblemRef}
            className="flex items-center justify-center gap-2.5 mb-3 md:mb-4 shrink-0"
          >
            {/* Blue Board Game Meeple */}
            <svg
              className="w-6 h-6 md:w-7 md:h-7 drop-shadow-sm"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4.2 6.25a1.5 1.5 0 0 0-1.5-1.25H9.3a1.5 1.5 0 0 0-1.5 1.25l-1.2 4.8a1.5 1.5 0 0 0 1.45 1.85h1.15l-.9 5.4A1.5 1.5 0 0 0 9.8 21h4.4a1.5 1.5 0 0 0 1.5-1.7l-.9-5.4h1.15a1.5 1.5 0 0 0 1.45-1.85l-1.2-4.8z"
                fill="#1E40AF"
              />
            </svg>
            {/* Orange Interlocking Puzzle Piece */}
            <svg
              className="w-6 h-6 md:w-7 md:h-7 drop-shadow-sm"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 10.5V8a1 1 0 0 0-1-1h-2.5a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 15.5 4a1.5 1.5 0 0 1 1.5-1.5V1.5A1.5 1.5 0 0 0 15.5 0h-2.5a1 1 0 0 0-1 1v0.5a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 9 1.5V1A1 1 0 0 0 8 0H5.5A1.5 1.5 0 0 0 4 1.5v2.5a1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 1 4a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h0.5a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 1.5 11.5H1a1 1 0 0 0-1 1V15a1.5 1.5 0 0 0 1.5 1.5h2.5a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 4 19.5V20a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-0.5a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5v0.5a1 1 0 0 0 1 1h2.5a1.5 1.5 0 0 0 1.5-1.5v-2.5a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5h0.5a1 1 0 0 0 1-1v-2.5a1 1 0 0 0-1-1h-0.5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5h0.5a1 1 0 0 0 1-1z"
                fill="#C2410C"
              />
            </svg>
          </div>

          {/* White Logo Image for dark contrast */}
          <img 
            src="/mindovo.svg" 
            alt="Mindovo Logo" 
            className="h-5 md:h-6 w-auto brightness-0 invert" 
          />
        </div>
      </div>

      {/* Tagline */}
      <div className="mt-8 text-[11px] font-display font-bold tracking-[0.45em] uppercase text-white/80 animate-pulse-text-slow">
        Play. Think. Connect.
      </div>
    </div>
  );
}
