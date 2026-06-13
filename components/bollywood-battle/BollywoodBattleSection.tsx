"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { Film, Play, ShoppingBag, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TriviaCard {
  id: number;
  category: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: "Easy" | "Medium" | "Filmi Expert";
}

const SAMPLE_TRIVIA: TriviaCard[] = [
  {
    id: 1,
    category: "Dialogue Master",
    question: "Complete the iconic dialogue: 'Rishte mein toh hum tumhare baap lagte hain, naam hai...'",
    options: ["Shahenshah", "Vijay", "Deewaar", "Don"],
    answer: "Shahenshah",
    difficulty: "Easy",
  },
  {
    id: 2,
    category: "Action Replay",
    question: "In Sholay, which hand does Thakur lose to Gabbar?",
    options: ["Left Hand", "Right Hand", "Both Hands", "None, it was a trick"],
    answer: "Both Hands",
    difficulty: "Medium",
  },
  {
    id: 3,
    category: "Behind the Scenes",
    question: "Which movie was originally titled 'Kahani Kismat Ki' before release?",
    options: ["Dilwale Dulhania Le Jayenge", "Kabhi Khushi Kabhie Gham", "Kuch Kuch Hota Hai", "Hum Aapke Hain Koun..!"],
    answer: "Dilwale Dulhania Le Jayenge",
    difficulty: "Filmi Expert",
  },
];

export default function BollywoodBattleSection() {
  const game = products.find((p) => p.slug === "bollywood-battle");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!game) return null;

  const currentTrivia = SAMPLE_TRIVIA[activeCardIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setTimeout(() => {
      setIsFlipped(true);
    }, 600);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setSelectedOption(null);
    setTimeout(() => {
      setActiveCardIndex((prev) => (prev + 1) % SAMPLE_TRIVIA.length);
    }, 300);
  };

  return (
    <section id="bollywood-battle" className="py-24 bg-white relative overflow-hidden">
      {/* Cinematic Spotlight Backdrop Filter Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-gradient-to-b from-puzzle-red/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-24 left-1/4 w-72 h-72 bg-puzzle-red/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Film Reel border lines */}
      <div className="absolute left-0 right-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#111111_8px,#111111_16px)] opacity-5 pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-0 h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#111111_8px,#111111_16px)] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Title Ticker */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-red uppercase flex items-center justify-center gap-1.5">
            <Film className="w-3 h-3 animate-spin-slow" />
            <span>Cinematic Party Game</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-text mt-3 tracking-tight">
            Bollywood Battle
          </h2>
          <p className="text-base text-brand-text/85 mt-4 leading-relaxed">
            Test your cinematic knowledge, perform classic mimes, humming challenges, and settle who is the ultimate Filmi Buff in this premium family entertainment showdown.
          </p>
        </div>

        {/* Dynamic Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Product Details & Ticket layout */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-[10px] font-display font-black tracking-[0.35em] text-brand-text/70 uppercase mb-3">
              Gameplay & Pitch
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-black text-brand-text tracking-tight mb-6 leading-tight">
              Challenge Your Movie Knowledge. Compete with Friends.
            </h3>
            
            <p className="text-sm text-brand-text/90 leading-relaxed mb-8">
              No boring templates. Bollywood Battle is structured like a ticketed movie show, with film-strip components and trivia categories covering 70+ years of cinematic history. Perfect for multi-generational families.
            </p>

            {/* List of Game benefits styled as Cinema ticket stubs */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                "200+ cards featuring dialogue endings, singing, and mime actions",
                "Includes physical score cards, penalty charts, and rules",
                "Designed with gorgeous gold-stamped dark cards",
                "Covers comedy, retro, action, and contemporary movies"
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-brand-bg rounded-2xl border border-brand-text/5 relative overflow-hidden"
                >
                  <div className="w-2 h-4 bg-white rounded-r-full absolute left-0 top-1/2 -translate-y-1/2 border-y border-r border-brand-text/5" />
                  <div className="w-2 h-4 bg-white rounded-l-full absolute right-0 top-1/2 -translate-y-1/2 border-y border-l border-brand-text/5" />
                  <Check className="w-4 h-4 text-puzzle-red ml-2" />
                  <span className="text-xs font-semibold text-brand-text/90">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={game.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-puzzle-red hover:bg-red-950 text-white font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy on Amazon</span>
              </a>
              <a
                href={game.directStoreUrl || "https://fashiondux.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-puzzle-red/20 hover:border-puzzle-red bg-transparent hover:bg-puzzle-red/5 text-puzzle-red font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Buy on Our Website</span>
              </a>
            </div>
          </div>

          {/* Right Side: Interactive card player */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Play Ticker Info */}
            <div className="mb-4 text-center">
              <span className="text-[10px] font-display font-black tracking-widest text-brand-text/70 uppercase">
                Interactive Game Demo: Try Flipping
              </span>
            </div>

            {/* 3D Card Flipper Container */}
            <div className="w-full max-w-[340px] aspect-[2/3] perspective-[1000px] relative">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
              >
                
                {/* CARD FRONT SIDE */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl bg-white border border-brand-text/15 shadow-2xl p-6 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-display font-black tracking-widest text-puzzle-red bg-puzzle-red/5 px-2.5 py-1 rounded">
                      {currentTrivia.category}
                    </span>
                    <span className="text-[9px] font-display font-bold text-brand-text/75">
                      DIFF: {currentTrivia.difficulty}
                    </span>
                  </div>

                  {/* Trivia Question */}
                  <div className="my-auto">
                    <h4 className="text-lg font-display font-bold text-brand-text leading-relaxed tracking-tight">
                      {currentTrivia.question}
                    </h4>

                    {/* Interactive Multiple Choice */}
                    <div className="flex flex-col gap-2 mt-6">
                      {currentTrivia.options.map((option) => (
                        <button
                          key={option}
                          disabled={selectedOption !== null}
                          onClick={() => handleOptionClick(option)}
                          className={`w-full text-left text-xs p-3.5 rounded-xl border font-sans font-medium transition-all duration-200 cursor-pointer ${
                            selectedOption === option
                              ? "border-puzzle-red bg-puzzle-red/5 text-puzzle-red font-bold"
                              : "border-brand-text/15 hover:border-brand-text/35 text-brand-text hover:bg-brand-text/5"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between text-[8px] font-display font-black text-brand-text/60 tracking-widest uppercase mt-4">
                    <span>Mindovo Games</span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-puzzle-red" />
                      <span>Bollywood Battle</span>
                    </span>
                  </div>
                </div>

                {/* CARD BACK SIDE */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl bg-white border border-[#854D0E]/60 shadow-2xl p-6 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-display font-black tracking-widest text-[#854D0E] bg-[#854D0E]/10 px-2.5 py-1 rounded">
                      Correct Answer
                    </span>
                    <span className="text-[9px] font-display font-bold text-brand-text/75">
                      CARD NO: 0{currentTrivia.id}
                    </span>
                  </div>

                  {/* Answer reveal section */}
                  <div className="text-center my-auto">
                    <div className="w-14 h-14 bg-[#854D0E]/10 border border-[#854D0E]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-6 h-6 text-[#854D0E] rotate-90" />
                    </div>
                    <h4 className="text-2xl font-display font-black text-brand-text tracking-tight">
                      {currentTrivia.answer}
                    </h4>
                    <p className="text-xs text-brand-text/85 mt-3 max-w-[220px] mx-auto leading-relaxed">
                      {selectedOption === currentTrivia.answer
                        ? "Brilliant! You are a true movie guru. Settle the score in the real game."
                        : `Nice try! Settle the showdown with friends and family.`}
                    </p>
                  </div>

                  <button
                    onClick={handleNextCard}
                    className="w-full text-center bg-brand-text hover:bg-brand-text/80 text-brand-bg font-display text-[9px] font-black tracking-widest uppercase py-3.5 rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    Next Question
                  </button>
                </div>

              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
