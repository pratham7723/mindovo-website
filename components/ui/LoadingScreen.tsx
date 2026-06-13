"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const Dot = () => (
  <div className="w-1.5 h-1.5 rounded-full bg-[#854D0E] shrink-0" />
);

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const diceContainerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (
      !logoTextRef.current ||
      !containerRef.current ||
      !diceContainerRef.current ||
      !cubeRef.current ||
      !cardContainerRef.current ||
      !cardRef.current
    ) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        setTimeout(onComplete, 500); // Allow curtain fade transition
      },
    });

    // Snappy Initial States: Logo starts hidden and centered
    gsap.set(logoTextRef.current, { opacity: 0, scale: 0.8 });
    
    // Set initial position of the rolling die (starting top-left offscreen)
    gsap.set(diceContainerRef.current, {
      x: -250,
      y: -100,
      opacity: 0,
      scale: 0.4,
    });
    gsap.set(cubeRef.current, {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    });

    // Set initial position of the spinning card (starting top-right offscreen)
    gsap.set(cardContainerRef.current, {
      x: 250,
      y: -100,
      opacity: 0,
      scale: 0.4,
    });
    gsap.set(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    });

    // 1. Roll in die and spin in card towards center (meeting side-by-side)
    tl.to(
      diceContainerRef.current,
      {
        opacity: 1,
        scale: 1,
        x: -28, // Left-of-center landing
        y: 0,
        duration: 0.95,
        ease: "bounce.out", // Bouncy land
      },
      "+=0.15"
    );

    tl.to(
      cubeRef.current,
      {
        rotateX: 360 * 2.5,
        rotateY: 360 * 2,
        rotateZ: 360 * 1.5,
        duration: 0.95,
        ease: "power2.out",
      },
      "-=0.95"
    );

    tl.to(
      cardContainerRef.current,
      {
        opacity: 1,
        scale: 1,
        x: 28, // Right-of-center landing
        y: 0,
        duration: 0.95,
        ease: "bounce.out", // Bouncy land
      },
      "-=0.95"
    );

    tl.to(
      cardRef.current,
      {
        rotateX: 360 * 1.5,
        rotateY: 360 * 2.5,
        rotateZ: 360 * 2,
        duration: 0.95,
        ease: "power2.out",
      },
      "-=0.95"
    );

    // 2. Squash & Stretch impact bounce upon landing collision
    tl.to(
      [diceContainerRef.current, cardContainerRef.current],
      {
        scaleX: 1.2,
        scaleY: 0.8,
        duration: 0.12,
        ease: "power1.inOut",
      }
    );
    tl.to(
      [diceContainerRef.current, cardContainerRef.current],
      {
        scaleX: 0.9,
        scaleY: 1.1,
        duration: 0.12,
        ease: "power1.inOut",
      }
    );
    tl.to(
      [diceContainerRef.current, cardContainerRef.current],
      {
        scaleX: 1,
        scaleY: 1,
        duration: 0.15,
        ease: "power2.out",
      }
    );

    // 3. Brief hold on settled components
    tl.to({}, { duration: 0.15 });

    // 4. Burst both components: expand dramatically and fade out
    tl.to(
      [diceContainerRef.current, cardContainerRef.current],
      {
        scale: 2.2,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      }
    );

    // 5. Reveal ONLY the Mindovo Logo centered (no emblem, no subtitle)
    tl.to(
      logoTextRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "back.out(1.8)",
      },
      "-=0.25" // Start during the burst fade
    );

    // 6. Hold logo for readability
    tl.to({}, { duration: 1.1 });

    // 7. Curtain exit: Slide up the entire black screen
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

  // --- DIE STYLING ---
  const dieSize = "44px";
  const dieOffset = "22px";

  const dieWrapperStyle: React.CSSProperties = {
    width: dieSize,
    height: dieSize,
    position: "relative",
    transformStyle: "preserve-3d",
  };

  const dieFaceStyle = (transform: string): React.CSSProperties => ({
    position: "absolute",
    width: dieSize,
    height: dieSize,
    borderRadius: "8px",
    background: "#FAF8F5",
    border: "2px solid rgba(17, 17, 17, 0.2)",
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform,
  });

  // --- CARD STYLING ---
  const cardW = "36px";
  const cardH = "52px";

  const cardWrapperStyle: React.CSSProperties = {
    width: cardW,
    height: cardH,
    position: "relative",
    transformStyle: "preserve-3d",
  };

  const cardFaceStyle = (transform: string, bg: string, border: string): React.CSSProperties => ({
    position: "absolute",
    width: cardW,
    height: cardH,
    borderRadius: "6px",
    background: bg,
    border,
    boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform,
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0A09]"
    >
      {/* Visual Canvas Center Group */}
      <div className="relative flex items-center justify-center w-64 h-32">
        
        {/* 3D Rolling CSS Die */}
        <div
          ref={diceContainerRef}
          className="absolute z-10 flex items-center justify-center pointer-events-none"
          style={{ width: "100px", height: "100px", perspective: "800px" }}
        >
          <div ref={cubeRef} style={dieWrapperStyle}>
            {/* Face 1: One pip */}
            <div style={dieFaceStyle(`rotateY(0deg) translateZ(${dieOffset})`)}>
              <div className="relative w-full h-full flex items-center justify-center">
                <Dot />
              </div>
            </div>
            {/* Face 2: Two pips */}
            <div style={dieFaceStyle(`rotateY(180deg) translateZ(${dieOffset})`)}>
              <div className="relative w-full h-full p-1.5 flex flex-col justify-between items-center">
                <div className="flex justify-start w-full"><Dot /></div>
                <div className="flex justify-end w-full"><Dot /></div>
              </div>
            </div>
            {/* Face 3: Three pips */}
            <div style={dieFaceStyle(`rotateX(90deg) translateZ(${dieOffset})`)}>
              <div className="relative w-full h-full p-1.5 flex flex-col justify-between items-center">
                <div className="flex justify-start w-full"><Dot /></div>
                <div className="flex justify-center w-full"><Dot /></div>
                <div className="flex justify-end w-full"><Dot /></div>
              </div>
            </div>
            {/* Face 4: Four pips */}
            <div style={dieFaceStyle(`rotateX(-90deg) translateZ(${dieOffset})`)}>
              <div className="relative w-full h-full p-2 flex flex-col justify-between items-center">
                <div className="flex justify-between w-full">
                  <Dot />
                  <Dot />
                </div>
                <div className="flex justify-between w-full">
                  <Dot />
                  <Dot />
                </div>
              </div>
            </div>
            {/* Face 5: Five pips */}
            <div style={dieFaceStyle(`rotateY(-90deg) translateZ(${dieOffset})`)}>
              <div className="relative w-full h-full p-2 flex flex-col justify-between items-center">
                <div className="flex justify-between w-full">
                  <Dot />
                  <Dot />
                </div>
                <div className="flex justify-center w-full">
                  <Dot />
                </div>
                <div className="flex justify-between w-full">
                  <Dot />
                  <Dot />
                </div>
              </div>
            </div>
            {/* Face 6: Six pips */}
            <div style={dieFaceStyle(`rotateY(90deg) translateZ(${dieOffset})`)}>
              <div className="relative w-full h-full p-2 flex flex-col justify-between items-center">
                <div className="flex justify-between w-full">
                  <Dot />
                  <Dot />
                </div>
                <div className="flex justify-between w-full">
                  <Dot />
                  <Dot />
                </div>
                <div className="flex justify-between w-full">
                  <Dot />
                  <Dot />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Spinning Playing Card */}
        <div
          ref={cardContainerRef}
          className="absolute z-10 flex items-center justify-center pointer-events-none"
          style={{ width: "100px", height: "100px", perspective: "800px" }}
        >
          <div ref={cardRef} style={cardWrapperStyle}>
            {/* Card Front: Deep red with soft gold border & movie star emblem */}
            <div style={cardFaceStyle(`rotateY(0deg) translateZ(1px)`, "#991B1B", "1.5px solid #F5D0A9")}>
              <span className="text-[#F5D0A9] font-display font-black text-[9px] select-none tracking-wider">
                ★ M ★
              </span>
            </div>
            {/* Card Back: Cream with red grid cinematic pattern */}
            <div style={cardFaceStyle(`rotateY(180deg) translateZ(1px)`, "#FAF8F5", "1.5px solid rgba(17, 17, 17, 0.15)")}>
              <div className="w-5 h-8 border border-[#991B1B]/20 rounded bg-red-50/10 flex items-center justify-center">
                <div className="w-3.5 h-6 border-dashed border-[#991B1B]/35 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Core Logo Group (Revealed by Die/Card burst - displays wordmark logo & tagline) */}
        <div
          ref={logoTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center select-none"
        >
          <img
            src="/mindovo.svg"
            alt="Mindovo Logo"
            className="h-6 md:h-7 w-auto brightness-0 invert"
          />
          <span className="mt-3 text-[9px] md:text-[10px] font-display font-bold tracking-[0.35em] uppercase text-white/70">
            Play. Think. Connect.
          </span>
        </div>

      </div>
    </div>
  );
}
