"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "Who are Mindovo products suitable for?",
    answer: "Mindovo products are designed for family and friend gatherings. Our Jigsaw Puzzles are perfect for children ages 8 to grandparents age 99, providing a collaborative or solo meditative challenge. Bollywood Battle is a cinematic trivia party game recommended for ages 12+ due to trivia trivia references, accommodating 3 to 10 players.",
  },
  {
    id: 2,
    question: "How many players can play your games?",
    answer: "The Jigsaw Puzzles are fully modular, so they can be enjoyed solo or as a collaborative activity for 2-5 family members. Bollywood Battle works best for groups between 3 to 10 players, making it an excellent icebreaker for weekend parties and get-togethers.",
  },
  {
    id: 3,
    question: "Are Mindovo items suitable for gifting?",
    answer: "Absolutely! We focus heavily on luxury unboxing experiences. Every puzzle and card game is packaged inside high-density rigid cardboard boxes featuring metallic gold-foil stamping, premium velvet-matte textures, and neat typography. No wrapping paper is needed; they are gift-ready.",
  },
  {
    id: 4,
    question: "What specific materials are used?",
    answer: "We use 100% eco-friendly, high-density recycled blueboard for our Jigsaw Puzzles, preventing bending and ensuring tight locks. The surfaces are coated with a glare-free velvet-touch matte finish. Bollywood Battle cards use 350GSM linen-finish cardstock, which prevents splitting and is highly durable.",
  },
  {
    id: 5,
    question: "How long does gameplay take?",
    answer: "Bollywood Battle sessions take around 30 to 45 minutes, though players often run multiple matches. Our 300-piece Jigsaw Puzzle can be completed in about 2 to 4 hours of collaborative focus, making it a great weekend project.",
  },
];

function AccordionItem({ question, answer, isOpen, onClick }: FAQItem & { isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-brand-text/10 py-5">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left font-display font-bold text-sm md:text-base text-brand-text hover:text-puzzle-blue transition-colors duration-200 cursor-pointer py-2"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-brand-text/40 transition-transform duration-300 ${
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
            <p className="text-xs md:text-sm text-brand-text/65 leading-relaxed pt-2 pb-4 pr-6">
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
          {FAQ_ITEMS.map((item) => (
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
