"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems, type FAQItem } from "@/data/faq";

function AccordionItem({ question, answer, isOpen, onClick }: FAQItem & { isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-brand-text/10 py-5">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left font-display font-bold text-sm md:text-base text-brand-text hover:text-puzzle-blue transition-colors duration-200 cursor-pointer py-2"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-brand-text/70 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-puzzle-blue" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm text-brand-text/85 leading-relaxed pt-2 pb-4 pr-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1); // Default first one open

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-blue uppercase">
            Support Center
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-brand-text mt-3 tracking-tight">
            Frequently Asked.
          </h2>
        </div>

        {/* Accordions */}
        <div className="flex flex-col border-t border-brand-text/10">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              {...item}
              isOpen={openId === item.id}
              onClick={() => handleToggle(item.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
