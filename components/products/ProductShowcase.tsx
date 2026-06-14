"use client";

import { useRef, useState } from "react";
import { products, Product } from "@/data/products";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D card tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transform rotation and translation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  // Inner elements translation (depth parallax)
  const innerX = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);
  const innerY = useTransform(mouseYSpring, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalized mouse positions
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Border colored shadows
  const getShadowColor = (colorClass: string) => {
    if (colorClass.includes("blue")) return "rgba(37, 99, 235, 0.15)";
    if (colorClass.includes("red")) return "rgba(220, 38, 38, 0.15)";
    if (colorClass.includes("green")) return "rgba(5, 150, 105, 0.15)";
    return "rgba(234, 88, 12, 0.15)";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-3xl p-8 bg-white border border-brand-text/5 flex flex-col justify-between overflow-hidden group transition-all duration-300 cursor-pointer"
      whileHover={{
        y: -10,
        boxShadow: `0 30px 60px -15px ${getShadowColor(product.accentColor)}, 0 4px 20px rgba(0,0,0,0.03)`,
      }}
    >
      {/* Dynamic Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8)_0%,rgba(240,240,240,0.3)_100%)] z-0" />
      
      {/* Decorative Grid Overlay inside card */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,0.015)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none z-0" />

      {/* Top row: Category tag & explore arrow */}
      <div className="flex items-center justify-between z-10" style={{ transform: "translateZ(30px)" }}>
        <span className="text-[10px] font-display font-black tracking-widest uppercase bg-brand-bg px-3.5 py-1.5 rounded-full text-brand-text/85">
          {product.category}
        </span>
        <a
          href={product.websiteUrl}
          className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-text/75 group-hover:text-brand-text group-hover:bg-brand-text/5 transition-all duration-300 border border-brand-text/5"
        >
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Center Art/Visual Representation (Parallax mesh mock) */}
      <motion.div
        style={{
          x: innerX,
          y: innerY,
          transform: "translateZ(50px)",
        }}
        className="w-full h-40 md:h-52 relative flex items-center justify-center z-10 my-4"
      >
        {/* Mock Product Box Shape */}
        <div className={`w-32 md:w-36 h-44 md:h-48 rounded-2xl relative shadow-xl transform rotate-3 overflow-hidden border border-white/20`}>
          {/* Accent Color Background */}
          <div className={`absolute inset-0 ${product.accentColor} opacity-95`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_80%)]" />
          
          {/* Inner Content Graphic */}
          <div className="absolute inset-2 bg-white rounded-lg flex flex-col justify-between p-3 select-none border border-brand-text/5">
            <span className="text-[8px] font-display tracking-[0.2em] font-black text-brand-text/50 uppercase">
              Mindovo
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-display font-black leading-tight text-brand-text tracking-tight">
                {product.name.split(" ").slice(1).join(" ") || product.name}
              </span>
              <span className="text-[7px] text-brand-text/75 mt-1 font-sans font-medium line-clamp-2">
                {product.tagline}
              </span>
            </div>
            {/* Tiny gold trim */}
            <div className="w-full h-[1px] bg-[#CA8A04] opacity-40" />
          </div>
        </div>

        {/* Floating cards / puzzle pieces representation around box */}
        <div className="absolute top-4 left-6 w-8 h-8 rounded bg-white/10 backdrop-blur border border-white/20 shadow-md rotate-12 animate-float pointer-events-none" />
        <div className="absolute bottom-6 right-8 w-10 h-10 rounded-full bg-[#CA8A04]/10 backdrop-blur border border-white/20 shadow-md -rotate-12 animate-float pointer-events-none [animation-delay:1.5s]" />
      </motion.div>

      {/* Bottom Info Row */}
      <div className="flex flex-col gap-4 z-10" style={{ transform: "translateZ(40px)" }}>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-black text-brand-text tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-text group-hover:to-brand-text/60 transition-all duration-300">
            {product.name}
          </h3>
          <p className="text-xs text-brand-text/85 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Specs summary row */}
        <div className="flex gap-2.5 flex-wrap">
          {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
            <span
              key={key}
              className="text-[10px] font-medium font-sans text-brand-text/80 px-2.5 py-1 bg-brand-bg rounded-md border border-brand-text/5"
            >
              <strong>{key}</strong>: {val}
            </span>
          ))}
        </div>

        {/* CTA Actions */}
        <div className="flex gap-2.5 mt-2 z-10" style={{ transform: "translateZ(30px)" }}>
          <a
            href={product.directStoreUrl || "https://fashiondux.com"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-center font-display text-[9px] md:text-[10px] font-black tracking-widest uppercase border border-brand-text/10 hover:border-brand-text/60 hover:bg-brand-text/5 text-brand-text py-3 rounded-xl transition-all duration-300 cursor-pointer"
          >
            Our Website
          </a>
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 ${product.accentColor} ${product.hoverAccentColor} text-white font-display text-[9px] md:text-[10px] font-black tracking-widest uppercase py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Amazon</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase({ bgColor = "bg-white" }: { bgColor?: string } = {}) {
  // Only render active/published products
  const activeProducts = products.filter((p) => p.isPublished);

  return (
    <section id="showcase" className={`py-24 ${bgColor} relative overflow-hidden`}>
      {/* Accent Background Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-puzzle-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-puzzle-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl text-left">
            <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-blue uppercase">
              Curated Catalog
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-brand-text mt-3 tracking-tight">
              Crafted To Bring Us Closer.
            </h2>
            <p className="text-base text-brand-text/85 mt-4 leading-relaxed">
              Explore our current flagship experiences. Each product is engineered with meticulous care, premium physical textures, and elegant game loops.
            </p>
          </div>
          <a
            href="/about"
            className="text-xs font-display font-black tracking-widest uppercase hover:underline flex items-center gap-1 text-brand-text cursor-pointer pb-2"
          >
            Why unplug? &rarr;
          </a>
        </div>

        {/* Dynamic Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {activeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
