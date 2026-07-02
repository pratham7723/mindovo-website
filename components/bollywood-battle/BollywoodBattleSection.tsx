"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { Film, Play, ShoppingBag, Sparkles, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

const PRODUCT_IMAGES = [
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/278efa5b-cfe1-4093-819b-0680a8f672f9.__CR0,0,970,600_PT0_SX970_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf94ab3b-894b-4d3e-af66-9cdb1cb4436b.__CR0,0,970,600_PT0_SX970_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/50a374b6-2a69-4b01-9df4-3d261ee02faa.__CR0,0,970,600_PT0_SX970_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/ae98a6eb-092b-4ad2-b787-570e9a655d61.__CR0,0,970,600_PT0_SX970_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/f42b11b2-7770-4fa8-97f6-5d797afcce36.__CR0,0,970,600_PT0_SX970_V1___.jpg",
  "https://m.media-amazon.com/images/I/41k5BGFkIML.jpg",
  "https://m.media-amazon.com/images/I/51T9uHrcznL.jpg",
  "https://m.media-amazon.com/images/I/51-cFzm7k2L.jpg",
  "https://m.media-amazon.com/images/I/51SF3bjjhlL.jpg",
  "https://m.media-amazon.com/images/I/51Zk3gKwP5L.jpg",
  "https://m.media-amazon.com/images/I/51KTEiCQlGL.jpg"
];

export default function BollywoodBattleSection() {
  const game = products.find((p) => p.slug === "bollywood-battle");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);

  return (
    <section id="bollywood-battle" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Cinematic Spotlight Backdrop Filter Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-gradient-to-b from-puzzle-red/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-24 left-1/4 w-72 h-72 bg-puzzle-red/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Film Reel border lines */}
      <div className="absolute left-0 right-0 top-0 h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#111111_8px,#111111_16px)] opacity-5 pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-0 h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#111111_8px,#111111_16px)] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Title Ticker */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-puzzle-red uppercase flex items-center justify-center gap-1.5">
            <Film className="w-3 h-3 animate-spin-slow" />
            <span>Cinematic Party Game</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-text mt-3 tracking-tight leading-tight">
            Bollywood Trivia Card Game for Parties
          </h2>
          <p className="text-lg text-brand-text/85 mt-4 leading-relaxed">
            Fast-Paced Guessing Game for Parties, Game Nights & Family Time | Gift for Bollywood Fans | 3-12 Players | Ages 14 & Up
          </p>
        </div>

        {/* Dynamic Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Product Image Gallery */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Product Image Gallery */}
            <div className="w-full max-w-[500px] bg-white p-4 rounded-3xl border border-brand-text/10 shadow-lg">
              <div className="mb-4 text-center">
                <span className="text-[10px] font-display font-black tracking-widest text-brand-text/70 uppercase">
                  Product Details
                </span>
              </div>
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-brand-bg mb-4 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={PRODUCT_IMAGES[currentImageIndex]}
                      alt="Bollywood Battle Game Preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Gallery Navigation Controls */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-brand-text shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-brand-text shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {PRODUCT_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-16 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx ? "border-puzzle-red scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-[500px]">
              <a
                href={game.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-puzzle-red hover:bg-red-950 text-white font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy on Amazon</span>
              </a>
              <a
                href={game.directStoreUrl || "https://fashiondux.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-puzzle-red/20 hover:border-puzzle-red bg-transparent hover:bg-puzzle-red/5 text-puzzle-red font-display text-xs font-black tracking-widest uppercase px-8 py-4.5 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Buy on Our Website</span>
              </a>
            </div>

          </div>

          {/* Right Side: Product Details & Interactive card player */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-[10px] font-display font-black tracking-[0.35em] text-brand-text/70 uppercase mb-3">
              Gameplay & Pitch
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-black text-brand-text tracking-tight mb-6 leading-tight">
              Challenge Your Movie Knowledge. Compete with Friends.
            </h3>
            
            {/* List of Game benefits styled as Cinema ticket stubs */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                <span key="1"><strong>ULTIMATE BOLLYWOOD GUESSING GAME:</strong> Test your Bollywood knowledge with this fast-paced, entertaining card game packed with 200+ cards featuring iconic dialogues, actors, and more.</span>,
                <span key="2"><strong>PERFECT FOR PARTIES & GAME NIGHTS:</strong> Designed for 3 to 12 players aged 14 and above, making it ideal for family gatherings, game nights, and Bollywood-themed parties.</span>,
                <span key="3"><strong>GUESS, BATTLE & WIN:</strong> The exciting Clue-Guess-Battle-Win gameplay format keeps every round thrilling and competitive, ensuring non-stop fun for all Bollywood fans.</span>,
                <span key="4"><strong>THOUGHTFUL GIFT IDEA:</strong> A wonderful gift for Bollywood enthusiasts, this beautifully packaged game comes in a premium black and gold box that adds a touch of glamour.</span>,
                <span key="5"><strong>COMPLETE SET INCLUDED:</strong> Comes with 200+ game cards neatly organised in a sturdy box with two card holder compartments and a discard tray for smooth, hassle-free gameplay.</span>
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-brand-text/5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-6 bg-white rounded-r-full absolute left-0 top-1/2 -translate-y-1/2 border-y border-r border-brand-text/5" />
                  <div className="w-2 h-6 bg-white rounded-l-full absolute right-0 top-1/2 -translate-y-1/2 border-y border-l border-brand-text/5" />
                  <div className="bg-puzzle-red/10 p-1.5 rounded-full mt-0.5 shrink-0 ml-2">
                    <Check className="w-4 h-4 text-puzzle-red" />
                  </div>
                  <span className="text-sm leading-relaxed text-brand-text/90">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Interactive Game Demo - Centered Section */}
        <div className="mt-24 w-full flex flex-col items-center">
          {/* Play Ticker Info */}
          <div className="mb-8 text-center w-full max-w-2xl mx-auto">
            <span className="text-[10px] font-display font-black tracking-widest text-brand-text/70 uppercase">
              Interactive Game Demo
            </span>
            <h3 className="text-3xl font-display font-black text-brand-text mt-2 tracking-tight">
              Try Flipping A Card
            </h3>
          </div>

          {/* 3D Card Flipper Container */}
          <div className="w-full max-w-[340px] aspect-[2/3] relative" style={{ perspective: "1000px" }}>
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full h-full relative"
            >
              
              {/* CARD FRONT SIDE */}
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-white border border-brand-text/15 shadow-2xl p-6 flex flex-col justify-between"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(1px)" }}
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
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg) translateZ(1px)",
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
    </section>
  );
}
