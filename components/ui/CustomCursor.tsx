"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [clickText, setClickText] = useState("");
  const [ringStyle, setRingStyle] = useState({
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    borderColor: "rgba(17, 17, 17, 0.4)",
  });

  useEffect(() => {
    // Only enable custom cursor on desktop (hover capable devices)
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    if (isTouchDevice()) {
      return;
    }

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    let activeMagneticEl: HTMLElement | null = null;
    let magBounds: DOMRect | null = null;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Buttery smooth native transform interpolation loop (bypasses GSAP engine for position)
    let animationFrameId: number;
    const tick = () => {
      const ringEase = 0.12;

      if (activeMagneticEl && magBounds) {
        // Snap ring towards magnetic center with slight mouse offset
        const cx = magBounds.left + magBounds.width / 2;
        const cy = magBounds.top + magBounds.height / 2;
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        
        ring.x += (cx + dx * 0.1 - ring.x) * ringEase;
        ring.y += (cy + dy * 0.1 - ring.y) * ringEase;
      } else {
        // Standard trailing follow
        ring.x += (mouse.x - ring.x) * ringEase;
        ring.y += (mouse.y - ring.y) * ringEase;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    animationFrameId = requestAnimationFrame(tick);

    // Global Hover & Magnetic Snapping Handlers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest("button, a, [role='button'], .cursor-pointer, .magnetic-target");
      
      if (interactiveEl) {
        setIsHovering(true);
        const isMagnetic = interactiveEl.classList.contains("magnetic-target") || interactiveEl.closest(".magnetic-target");

        // Scale up outer ring using React State to offload to browser transitions
        const hintText = (interactiveEl as HTMLElement).getAttribute("data-cursor-hint");
        if (hintText) {
          setClickText(hintText);
          setRingStyle({
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            backgroundColor: "rgba(17, 17, 17, 0.05)",
            borderColor: "rgba(17, 17, 17, 0.8)",
          });
        } else if (isMagnetic) {
          const magEl = (interactiveEl.classList.contains("magnetic-target") 
            ? interactiveEl 
            : interactiveEl.closest(".magnetic-target")) as HTMLElement;
            
          activeMagneticEl = magEl;
          magBounds = magEl.getBoundingClientRect();
          
          setRingStyle({
            width: `${magBounds.width + 12}px`,
            height: `${magBounds.height + 12}px`,
            borderRadius: "12px",
            backgroundColor: "rgba(17, 17, 17, 0.03)",
            borderColor: "rgba(17, 17, 17, 0.8)",
          });

          // Magnetic button hover logic
          const onMagMove = (ev: MouseEvent) => {
            const dx = ev.clientX - (magBounds!.left + magBounds!.width / 2);
            const dy = ev.clientY - (magBounds!.top + magBounds!.height / 2);
            
            gsap.to(magEl, {
              x: dx * 0.2,
              y: dy * 0.2,
              duration: 0.2,
              ease: "power2.out",
            });
          };

          const onMagLeave = () => {
            magEl.removeEventListener("mousemove", onMagMove);
            magEl.removeEventListener("mouseleave", onMagLeave);
            
            activeMagneticEl = null;
            magBounds = null;

            gsap.to(magEl, {
              x: 0,
              y: 0,
              duration: 0.4,
              ease: "elastic.out(1, 0.3)",
            });

            setRingStyle({
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              borderColor: "rgba(17, 17, 17, 0.4)",
            });
            setIsHovering(false);
            setClickText("");
          };

          magEl.addEventListener("mousemove", onMagMove);
          magEl.addEventListener("mouseleave", onMagLeave);
        } else {
          setRingStyle({
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "rgba(17, 17, 17, 0.05)",
            borderColor: "rgba(17, 17, 17, 0.8)",
          });
        }

        // Hide dot
        if (dotRef.current) {
          dotRef.current.style.opacity = "0";
          dotRef.current.style.transform += " scale(0)";
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest("button, a, [role='button'], .cursor-pointer, .magnetic-target");
      if (interactiveEl && !e.relatedTarget) {
        setIsHovering(false);
        setClickText("");
        activeMagneticEl = null;
        magBounds = null;

        setRingStyle({
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "transparent",
          borderColor: "rgba(17, 17, 17, 0.4)",
        });

        // Restore dot
        if (dotRef.current) {
          dotRef.current.style.opacity = "1";
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-brand-text rounded-full pointer-events-none z-[10000] mix-blend-difference transition-opacity duration-300"
      />
      
      {/* Outer Spring Ring with smooth size and visual transition */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 border pointer-events-none z-[9999] flex items-center justify-center transition-[width,height,border-radius,background-color,border-color] duration-300 ease-out"
        style={{
          width: ringStyle.width,
          height: ringStyle.height,
          borderRadius: ringStyle.borderRadius,
          backgroundColor: ringStyle.backgroundColor,
          borderColor: ringStyle.borderColor,
          transform: "translate3d(0, 0, 0)",
        }}
      >
        {clickText && (
          <span className="text-[9px] font-display font-semibold tracking-wider text-brand-text select-none animate-fade-in uppercase">
            {clickText}
          </span>
        )}
      </div>
    </>
  );
}
