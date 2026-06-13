"use client";

import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter published and coming soon products
  const activeProducts = products.filter((p) => p.isPublished);
  const comingSoonProducts = products.filter((p) => p.isComingSoon);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-4 ${
        isScrolled ? "top-2" : "top-0"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 ${
          isScrolled
            ? "glass-panel shadow-lg py-3 px-6"
            : "bg-transparent py-4 px-4 border-b border-transparent"
        } flex items-center justify-between`}
      >
        {/* Brand Logo */}
        <a
          href="/"
          className="flex items-center select-none"
        >
          <img src="/mindovo.svg" alt="Mindovo Logo" className="h-6 w-auto" />
        </a>

        {/* Center Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="text-sm font-medium tracking-wide text-brand-text/85 hover:text-brand-text transition-colors duration-200 cursor-pointer"
          >
            Home
          </a>

          {/* Products Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a
              href="/products"
              className="flex items-center gap-1 text-sm font-medium tracking-wide text-brand-text/85 hover:text-brand-text transition-colors duration-200 cursor-pointer py-1"
            >
              Games & Puzzles
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </a>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full w-80 mt-2 glass-panel rounded-2xl shadow-xl overflow-hidden p-2 z-50 border border-white/20"
                >
                  <div className="py-2 px-4 text-[10px] font-display font-bold tracking-widest text-brand-text/65 uppercase">
                    Available Now
                  </div>
                  {activeProducts.map((product) => (
                    <a
                      key={product.id}
                      href={product.websiteUrl}
                      className="flex items-start gap-3 p-3 hover:bg-white/50 rounded-xl transition-all duration-200 cursor-pointer"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-brand-text">
                          {product.name}
                        </span>
                        <span className="text-[11px] text-brand-text/80 mt-0.5 line-clamp-1">
                          {product.tagline}
                        </span>
                      </div>
                    </a>
                  ))}

                  {comingSoonProducts.length > 0 && (
                    <>
                      <div className="h-px bg-brand-text/10 my-2" />
                      <div className="py-2 px-4 text-[10px] font-display font-bold tracking-widest text-brand-text/65 uppercase">
                        Coming Soon
                      </div>
                      {comingSoonProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-start gap-3 p-3 opacity-60 rounded-xl"
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-brand-text flex items-center gap-1.5">
                              {product.name}
                              <span className="text-[9px] font-display bg-brand-text/10 px-1.5 py-0.5 rounded text-brand-text/85 font-semibold uppercase">
                                Soon
                              </span>
                            </span>
                            <span className="text-[11px] text-brand-text/80 mt-0.5">
                              {product.tagline}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          <a
            href="/experience"
            className="text-sm font-medium tracking-wide text-brand-text/85 hover:text-brand-text transition-colors duration-200 cursor-pointer"
          >
            Experience
          </a>
          <a
            href="/reviews"
            className="text-sm font-medium tracking-wide text-brand-text/85 hover:text-brand-text transition-colors duration-200 cursor-pointer"
          >
            Reviews
          </a>
          <a
            href="/faq"
            className="text-sm font-medium tracking-wide text-brand-text/85 hover:text-brand-text transition-colors duration-200 cursor-pointer"
          >
            FAQ
          </a>
          <a
            href="/about"
            className="text-sm font-medium tracking-wide text-brand-text/85 hover:text-brand-text transition-colors duration-200 cursor-pointer"
          >
            About Us
          </a>
        </nav>

        {/* Action Button (Desktop) */}
        <div className="hidden md:block">
          <a
            href={activeProducts[0]?.amazonUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-target group relative inline-flex items-center justify-center gap-1.5 bg-brand-text text-brand-bg font-display text-xs font-black tracking-widest uppercase px-6 py-3 rounded-full overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            data-cursor-hint="Amazon"
          >
            <span>Buy Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-brand-text hover:bg-black/5 rounded-xl transition-colors duration-200 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-2 glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            <nav className="flex flex-col p-6 gap-4">
              <a
                href="/"
                onClick={toggleMenu}
                className="text-lg font-semibold text-brand-text hover:text-brand-text/60 transition-colors duration-200"
              >
                Home
              </a>
              
              <div className="h-px bg-brand-text/10" />
              <a
                href="/products"
                onClick={toggleMenu}
                className="text-lg font-semibold text-brand-text hover:text-brand-text/80 transition-colors duration-200"
              >
                Games & Puzzles
              </a>
              <div className="flex flex-col gap-2 pl-4">
                {activeProducts.map((p) => (
                  <a
                    key={p.id}
                    href={p.websiteUrl}
                    onClick={toggleMenu}
                    className="text-sm font-medium text-brand-text/85 hover:text-brand-text transition-colors duration-200"
                  >
                    {p.name}
                  </a>
                ))}
              </div>

              <div className="h-px bg-brand-text/10" />
              <a
                href="/experience"
                onClick={toggleMenu}
                className="text-lg font-semibold text-brand-text hover:text-brand-text/80 transition-colors duration-200"
              >
                Experience
              </a>
              <a
                href="/reviews"
                onClick={toggleMenu}
                className="text-lg font-semibold text-brand-text hover:text-brand-text/80 transition-colors duration-200"
              >
                Reviews
              </a>
              <a
                href="/faq"
                onClick={toggleMenu}
                className="text-lg font-semibold text-brand-text hover:text-brand-text/80 transition-colors duration-200"
              >
                FAQ
              </a>
              <a
                href="/about"
                onClick={toggleMenu}
                className="text-lg font-semibold text-brand-text hover:text-brand-text/80 transition-colors duration-200"
              >
                About Us
              </a>

              <a
                href={activeProducts[0]?.amazonUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleMenu}
                className="w-full text-center bg-brand-text text-brand-bg font-display text-xs font-black tracking-widest uppercase py-4 rounded-xl shadow-lg mt-4 cursor-pointer"
              >
                Buy Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
