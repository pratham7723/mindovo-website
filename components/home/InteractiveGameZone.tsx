"use client";

import { useState } from "react";
import { Puzzle, Film, HelpCircle, RotateCw, Check, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TriviaCard {
  id: number;
  category: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: "Easy" | "Medium" | "Filmi Expert";
}

const TRIVIA_QUESTIONS: TriviaCard[] = [
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

const JIGSAW_PIECES = [
  { zone: "A", color: "bg-puzzle-blue", text: "Sunset Sky", backCode: "A - 42" },
  { zone: "B", color: "bg-puzzle-green", text: "Forest Canopy", backCode: "B - 19" },
  { zone: "C", color: "bg-puzzle-orange", text: "Desert Dunes", backCode: "C - 88" },
  { zone: "D", color: "bg-puzzle-red", text: "Velvet Rose", backCode: "D - 13" },
  { zone: "E", color: "bg-amber-600", text: "Golden Hour", backCode: "E - 07" },
  { zone: "F", color: "bg-indigo-700", text: "Ocean Depths", backCode: "F - 55" },
];

export default function InteractiveGameZone() {
  const [activeTab, setActiveTab] = useState<"quiz" | "jigsaw">("quiz");
  
  // Trivia State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizFlipped, setQuizFlipped] = useState(false);

  // Jigsaw State
  const [selectedPieceIdx, setSelectedPieceIdx] = useState(0);
  const [jigsawFlipped, setJigsawFlipped] = useState(false);

  const currentTrivia = TRIVIA_QUESTIONS[currentQuestionIdx];
  const currentPiece = JIGSAW_PIECES[selectedPieceIdx];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setTimeout(() => {
      setQuizFlipped(true);
    }, 600);
  };

  const handleNextQuiz = () => {
    setQuizFlipped(false);
    setSelectedOption(null);
    setTimeout(() => {
      setCurrentQuestionIdx((prev) => (prev + 1) % TRIVIA_QUESTIONS.length);
    }, 300);
  };

  return (
    <section id="demo-zone" className="py-20 bg-brand-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-puzzle-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-puzzle-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-brand-text/75 uppercase">
            Interactive Play Zone
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-brand-text mt-3 tracking-tight">
            Try Before You Play
          </h2>
          <p className="text-sm text-brand-text/85 mt-3 leading-relaxed">
            Experience the core mechanics of our flagship games right from your screen. Switch tabs to test your film trivia or preview our tactile jigsaw zone helpers.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-display text-xs font-black tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
              activeTab === "quiz"
                ? "bg-brand-text text-brand-bg border-brand-text shadow-lg scale-105"
                : "bg-white text-brand-text border-brand-text/10 hover:border-brand-text/30"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Bollywood Battle Quiz</span>
          </button>
          <button
            onClick={() => setActiveTab("jigsaw")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-display text-xs font-black tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
              activeTab === "jigsaw"
                ? "bg-brand-text text-brand-bg border-brand-text shadow-lg scale-105"
                : "bg-white text-brand-text border-brand-text/10 hover:border-brand-text/30"
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Jigsaw Helper Explorer</span>
          </button>
        </div>

        {/* Tab Content Window */}
        <div className="w-full bg-white rounded-3xl border border-brand-text/5 shadow-xl p-8 min-h-[480px] flex flex-col justify-between items-center relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {activeTab === "quiz" ? (
              // TAB 1: BOLLYWOOD QUIZ
              <motion.div
                key="quiz-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <span className="text-[10px] font-display font-black tracking-widest text-puzzle-red uppercase bg-puzzle-red/5 px-3 py-1 rounded">
                    Bollywood Battle Trivia Card
                  </span>
                </div>

                {/* 3D Flipping Quiz Card */}
                <div className="w-full max-w-[340px] aspect-[2/3] perspective-[1000px] relative mb-6">
                  <motion.div
                    animate={{ rotateY: quizFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-full h-full relative"
                  >
                    {/* Front Side */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl bg-white border border-brand-text/10 shadow-lg p-6 flex flex-col justify-between"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="flex justify-between items-center text-[9px] font-display font-black text-brand-text/70 uppercase">
                        <span>Category: {currentTrivia.category}</span>
                        <span>Diff: {currentTrivia.difficulty}</span>
                      </div>

                      <div className="my-auto">
                        <h4 className="text-base md:text-lg font-display font-bold text-brand-text leading-relaxed tracking-tight text-center">
                          {currentTrivia.question}
                        </h4>

                        <div className="flex flex-col gap-2 mt-6">
                          {currentTrivia.options.map((option) => (
                            <button
                              key={option}
                              disabled={selectedOption !== null}
                              onClick={() => handleOptionClick(option)}
                              className={`w-full text-left text-xs p-3.5 rounded-xl border font-sans font-medium transition-all duration-200 cursor-pointer ${
                                selectedOption === option
                                  ? "border-puzzle-red bg-puzzle-red/5 text-puzzle-red font-bold"
                                  : "border-brand-text/10 hover:border-brand-text/30 text-brand-text hover:bg-brand-text/5"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[8px] font-display font-black text-brand-text/60 tracking-widest uppercase">
                        <span>Demo Challenge</span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-puzzle-red" />
                          <span>Bollywood Battle</span>
                        </span>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl bg-white border border-amber-600/30 shadow-lg p-6 flex flex-col justify-between text-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="flex justify-between items-center text-[9px] font-display font-black text-brand-text/75 uppercase">
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Correct Answer</span>
                        <span>No. 0{currentTrivia.id}</span>
                      </div>

                      <div className="my-auto px-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
                          {selectedOption === currentTrivia.answer ? (
                            <Check className="w-6 h-6 text-green-600" />
                          ) : (
                            <X className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                        <span className="text-[10px] font-display font-black uppercase tracking-wider text-brand-text/70">
                          The Answer is
                        </span>
                        <h4 className="text-xl font-display font-black text-brand-text mt-1">
                          {currentTrivia.answer}
                        </h4>
                        <p className="text-xs text-brand-text/85 mt-3 leading-relaxed">
                          {selectedOption === currentTrivia.answer
                            ? "Correct! You know your Bollywood classics. Settle the scores in the real board game!"
                            : `Incorrect. You guessed "${selectedOption}". Get the full game to master the trivia!`}
                        </p>
                      </div>

                      <button
                        onClick={handleNextQuiz}
                        className="w-full bg-brand-text hover:bg-brand-text/80 text-brand-bg font-display text-[9px] font-black tracking-widest uppercase py-3.5 rounded-xl transition-all duration-300 cursor-pointer"
                      >
                        Next Demo Card
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              // TAB 2: JIGSAW PIECE HELPER
              <motion.div
                key="jigsaw-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <span className="text-[10px] font-display font-black tracking-widest text-puzzle-blue uppercase bg-puzzle-blue/5 px-3 py-1 rounded">
                    Tactile Jigsaw Helper (A-F Zones)
                  </span>
                  <p className="text-xs text-brand-text/85 mt-2 max-w-md mx-auto">
                    Struggling with a complex section? Select a puzzle zone below, then flip the piece to see the helper letter stamped on the back.
                  </p>
                </div>

                {/* Zone Picker Grid */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {JIGSAW_PIECES.map((p, idx) => (
                    <button
                      key={p.zone}
                      onClick={() => {
                        setSelectedPieceIdx(idx);
                        setJigsawFlipped(false);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-display font-bold border transition-all duration-200 cursor-pointer ${
                        selectedPieceIdx === idx
                          ? "border-puzzle-blue bg-puzzle-blue/10 text-puzzle-blue font-black scale-105 shadow-sm"
                          : "border-brand-text/10 bg-white text-brand-text/75 hover:border-brand-text/30"
                      }`}
                    >
                      Zone {p.zone}
                    </button>
                  ))}
                </div>

                {/* 3D Flipping Jigsaw Piece */}
                <div className="w-56 h-56 perspective-[1000px] relative mb-6">
                  <motion.div
                    animate={{ rotateY: jigsawFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-full h-full relative cursor-pointer"
                    onClick={() => setJigsawFlipped((f) => !f)}
                  >
                    {/* Front: Premium Velvet Matte Puzzle Image */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl bg-white border border-brand-text/10 shadow-lg p-6 flex flex-col justify-between items-center"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Puzzle Piece Shape Visual */}
                      <div className="w-24 h-24 rounded-2xl relative flex items-center justify-center shadow-md overflow-hidden">
                        <div className={`absolute inset-0 ${currentPiece.color} opacity-85`} />
                        <Puzzle className="w-10 h-10 text-white relative z-10" />
                      </div>
                      <div className="text-center mt-3">
                        <span className="text-[10px] font-display font-black tracking-widest text-brand-text/70 uppercase">
                          FRONT SIDE (Matte Art)
                        </span>
                        <h5 className="text-xs font-bold text-brand-text mt-0.5">
                          {currentPiece.text} (Zone {currentPiece.zone})
                        </h5>
                      </div>
                      <span className="text-[8px] font-display font-bold text-brand-text/60 tracking-wider flex items-center gap-1 uppercase">
                        <RotateCw className="w-2.5 h-2.5 animate-spin-slow" />
                        <span>Click to Flip</span>
                      </span>
                    </div>

                    {/* Back: Cardboard Texture with Stamp Helper */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl bg-[#EAE5DA] border border-dashed border-brand-text/25 shadow-lg p-6 flex flex-col justify-between items-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {/* Textured Cardboard stamp circle */}
                      <div className="w-24 h-24 rounded-full border-4 border-double border-puzzle-blue/50 flex items-center justify-center bg-white/40 shadow-inner">
                        <span className="text-2xl font-display font-black text-puzzle-blue/80 tracking-wide font-mono">
                          {currentPiece.backCode}
                        </span>
                      </div>
                      <div className="text-center mt-3 px-2">
                        <span className="text-[10px] font-display font-black tracking-widest text-puzzle-blue uppercase">
                          BACK SIDE (Helper Stamp)
                        </span>
                        <p className="text-[10px] text-brand-text/85 mt-1 leading-relaxed">
                          Sort pieces by this letter before starting to solve sections with ease.
                        </p>
                      </div>
                      <span className="text-[8px] font-display font-bold text-brand-text/60 tracking-wider flex items-center gap-1 uppercase">
                        <RotateCw className="w-2.5 h-2.5" />
                        <span>Click to Flip</span>
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="text-center max-w-sm mt-2">
                  <span className="text-[10px] text-brand-text/75 font-sans italic block">
                    *Tip: Flipped piece shows realistic organic blueboard backing with high-definition zone ink stamps.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
