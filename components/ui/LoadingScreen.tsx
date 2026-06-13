"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<SVGSVGElement>(null);
  const p2Ref = useRef<SVGSVGElement>(null);
  const p3Ref = useRef<SVGSVGElement>(null);
  const p4Ref = useRef<SVGSVGElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (
      !p1Ref.current ||
      !p2Ref.current ||
      !p3Ref.current ||
      !p4Ref.current ||
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
    
    gsap.set(p1Ref.current, { x: -100, y: -100, rotate: -45 });
    gsap.set(p2Ref.current, { x: 100, y: -100, rotate: 45 });
    gsap.set(p3Ref.current, { x: -100, y: 100, rotate: -90 });
    gsap.set(p4Ref.current, { x: 100, y: 100, rotate: 90 });
    gsap.set(logoTextRef.current, { opacity: 0, scale: 0.9, y: 20 });

    // 1. Staggered fade-in and float of puzzle pieces
    tl.to(
      [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current],
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.15,
      },
      "+=0.2"
    );

    // 2. Convergence: pieces snap together in the center to form a square
    tl.to(
      [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current],
      {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)",
      },
      "-=0.4"
    );

    // 3. Subtly rotate the assembled square, then scale up
    tl.to(
      [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current],
      {
        rotate: 360,
        duration: 1.8,
        ease: "power3.inOut",
      },
      "+=0.2"
    );

    // 4. Shrink the pieces while revealing the brand logo
    tl.to(
      [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current],
      {
        opacity: 0.1,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.6"
    );

    // 5. Reveal the cinematic brand logo with a soft glow
    tl.to(
      logoTextRef.current,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // 6. Final glow flash
    tl.to(
      logoTextRef.current,
      {
        filter: "drop-shadow(0 0 15px rgba(17,17,17,0.1))",
        duration: 0.5,
        yoyo: true,
        repeat: 1,
      }
    );

    // 7. Exit animation: Slide up the preloader completely
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

  // Premium interlocking vector puzzle piece outline (centered at 50,50)
  const piecePath = "M 25,25 H 40 C 40,30 45,35 50,35 C 55,35 60,30 60,25 H 75 V 40 C 70,40 65,45 65,50 C 65,55 70,60 75,60 V 75 H 60 C 60,70 55,65 50,65 C 45,65 40,70 40,75 H 25 V 60 C 30,60 35,55 35,50 C 35,45 30,40 25,40 Z";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-bg"
    >
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Puzzle Assembly Box */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 w-36 h-36 m-auto">
          {/* Top Left - Blue */}
          <svg
            ref={p1Ref}
            viewBox="0 0 100 100"
            className="w-full h-full text-puzzle-blue fill-current"
          >
            <path d={piecePath} />
          </svg>
          {/* Top Right - Green */}
          <svg
            ref={p2Ref}
            viewBox="0 0 100 100"
            className="w-full h-full text-puzzle-green fill-current"
          >
            <path d={piecePath} />
          </svg>
          {/* Bottom Left - Orange */}
          <svg
            ref={p3Ref}
            viewBox="0 0 100 100"
            className="w-full h-full text-puzzle-orange fill-current"
          >
            <path d={piecePath} />
          </svg>
          {/* Bottom Right - Red */}
          <svg
            ref={p4Ref}
            viewBox="0 0 100 100"
            className="w-full h-full text-puzzle-red fill-current"
          >
            <path d={piecePath} />
          </svg>
        </div>

        {/* Cinematic Logo Reveal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={logoTextRef}
            className="select-none flex items-center justify-center"
          >
            <img src="/mindovo.svg" alt="Mindovo Logo" className="h-10 md:h-12 w-auto" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs font-display tracking-[0.4em] uppercase text-brand-text/40 animate-pulse-slow">
        Play. Think. Connect.
      </div>
    </div>
  );
}
