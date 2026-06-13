"use client";

import { useState, useEffect } from "react";
import { Puzzle, Film, RotateCw, Check, X, Sparkles, Copy, ExternalLink, Trophy } from "lucide-react";
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

// 5 pieces helper backing details
const PIECE_HELPERS = [
  { zone: "A", num: "1", color: "bg-puzzle-blue" },
  { zone: "B", num: "2", color: "bg-puzzle-green" },
  { zone: "C", num: "3", color: "bg-puzzle-orange" },
  { zone: "D", num: "4", color: "bg-puzzle-red" },
  { zone: "E", num: "5", color: "bg-amber-600" },
];

export default function InteractiveGameZone() {
  const [activeTab, setActiveTab] = useState<"jigsaw" | "quiz">("jigsaw");
  
  // Shared Reward State
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- TAB 1: INTERACTIVE JIGSAW PUZZLE STATE ---
  const [puzzleState, setPuzzleState] = useState<number[]>([3, 0, 4, 1, 2]); // Scrambled indices (5 pieces)
  const [selectedPieceIdx, setSelectedPieceIdx] = useState<number | null>(null);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  
  // Jigsaw static helper row flip state
  const [helperRowFlipped, setHelperRowFlipped] = useState(false);

  // --- TAB 2: BOLLYWOOD QUIZ STATE ---
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizFlipped, setQuizFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentTrivia = TRIVIA_QUESTIONS[currentQuizIdx];

  // Handle Jigsaw Piece Swap Clicks
  const handlePieceClick = (index: number) => {
    if (isPuzzleSolved) return;

    if (selectedPieceIdx === null) {
      setSelectedPieceIdx(index);
    } else {
      // Swap elements
      const newState = [...puzzleState];
      const temp = newState[selectedPieceIdx];
      newState[selectedPieceIdx] = newState[index];
      newState[index] = temp;
      
      setPuzzleState(newState);
      setSelectedPieceIdx(null);

      // Check if solved: correct sequence is [0, 1, 2, 3, 4]
      if (newState.every((val, idx) => val === idx)) {
        setIsPuzzleSolved(true);
        setHelperRowFlipped(false); // Flip back to show the logo
        setTimeout(() => {
          setShowRewardModal(true);
        }, 800);
      }
    }
  };

  const handleResetPuzzle = () => {
    setPuzzleState([3, 0, 4, 1, 2]);
    setSelectedPieceIdx(null);
    setIsPuzzleSolved(false);
    setHelperRowFlipped(false);
  };

  // Handle Quiz clicks
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    const correct = option === TRIVIA_QUESTIONS[currentQuizIdx].answer;
    if (correct) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      setQuizFlipped(true);
    }, 600);
  };

  const handleNextQuiz = () => {
    setQuizFlipped(false);
    setSelectedOption(null);
    
    if (currentQuizIdx < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQuizIdx((idx) => idx + 1);
    } else {
      setQuizCompleted(true);
      setTimeout(() => {
        setShowRewardModal(true);
      }, 600);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setQuizFlipped(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("MINDOVO15");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo-zone" className="py-20 bg-brand-bg relative overflow-hidden">
      {/* Decorative backdrop shapes */}
      <div className="absolute top-1/4 left-5 w-80 h-80 bg-puzzle-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-5 w-80 h-80 bg-puzzle-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-display font-black tracking-[0.4em] text-brand-text/75 uppercase">
            Playable Challenges
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-brand-text mt-3 tracking-tight">
            Interactive Game Room
          </h2>
          <p className="text-sm text-brand-text/85 mt-3 leading-relaxed">
            Solve our mini-games to unlock an exclusive reward discount coupon. Click a tab below to start playing.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("jigsaw")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-display text-xs font-black tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
              activeTab === "jigsaw"
                ? "bg-brand-text text-brand-bg border-brand-text shadow-lg scale-105"
                : "bg-white text-brand-text border-brand-text/10 hover:border-brand-text/30"
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Interactive Jigsaw Puzzle</span>
          </button>
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
        </div>

        {/* Game Box */}
        <div className="w-full bg-white rounded-3xl border border-brand-text/5 shadow-xl p-8 min-h-[520px] flex flex-col justify-between items-center relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {activeTab === "jigsaw" ? (
              // TAB 1: INTERACTIVE JIGSAW
              <motion.div
                key="jigsaw-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center"
              >
                <div className="text-center mb-6 max-w-md">
                  <span className="text-[10px] font-display font-black tracking-widest text-puzzle-blue uppercase bg-puzzle-blue/5 px-3 py-1 rounded">
                    Mindovo Logo Puzzle Challenge
                  </span>
                  <p className="text-xs text-brand-text/85 mt-2">
                    Click two pieces to swap their positions. Reassemble the scrambled slices to spell out the <strong className="font-bold">Mindovo Logo</strong> and claim your reward!
                  </p>
                </div>

                {/* SVG Clip Paths for 5 interlocking jigsaw pieces */}
                <svg className="absolute w-0 h-0">
                  <defs>
                    <clipPath id="jigsaw-piece-0" clipPathUnits="objectBoundingBox">
                      <path d="M 0,0 H 0.92 V 0.35 C 1,0.35 1,0.65 0.92,0.65 V 1 H 0 Z" />
                    </clipPath>
                    <clipPath id="jigsaw-piece-mid" clipPathUnits="objectBoundingBox">
                      <path d="M 0.08,0 H 0.92 V 0.35 C 1,0.35 1,0.65 0.92,0.65 V 1 H 0.08 V 0.65 C 0.16,0.65 0.16,0.35 0.08,0.35 Z" />
                    </clipPath>
                    <clipPath id="jigsaw-piece-4" clipPathUnits="objectBoundingBox">
                      <path d="M 0.08,0 H 1 V 1 H 0.08 V 0.65 C 0.16,0.65 0.16,0.35 0.08,0.35 Z" />
                    </clipPath>
                  </defs>
                </svg>

                {/* 1x5 Slices Puzzle Area with Card Flip Helpers built-in */}
                <div className="w-full max-w-[420px] p-4 bg-brand-bg/50 border border-brand-text/10 rounded-2xl flex flex-col gap-5 items-center shadow-inner mb-6">
                  <div
                    className={`w-full flex bg-white p-2 rounded-xl border border-brand-text/5 relative overflow-hidden h-28 sm:h-32 transition-all duration-500 ${
                      isPuzzleSolved ? "gap-0" : "gap-1 sm:gap-1.5"
                    }`}
                    style={{ perspective: "1000px" }}
                  >
                    {puzzleState.map((pieceIdx, currentPos) => {
                      const isSelected = selectedPieceIdx === currentPos;
                      const helper = PIECE_HELPERS[pieceIdx];
                      const clipStyle = isPuzzleSolved
                        ? "none"
                        : (currentPos === 0 ? "url(#jigsaw-piece-0)" : currentPos === 4 ? "url(#jigsaw-piece-4)" : "url(#jigsaw-piece-mid)");

                      return (
                        <div
                          key={`piece-${pieceIdx}`}
                          onClick={() => handlePieceClick(currentPos)}
                          className="w-1/5 h-full relative cursor-pointer"
                        >
                          <motion.div
                            animate={{ rotateY: helperRowFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            style={{ transformStyle: "preserve-3d" }}
                            className={`w-full h-full relative ${
                              isSelected ? "ring-4 ring-amber-500 scale-95 z-20 shadow-md rounded-lg" : ""
                            }`}
                          >
                            {/* FRONT SIDE (LOGO SLICE) */}
                            <div
                              className="absolute inset-0 w-full h-full overflow-hidden border border-brand-text/5"
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "translateZ(1px)",
                                backgroundImage: "url(/mindovo.svg)",
                                backgroundSize: "500% 100%",
                                backgroundPosition: `${pieceIdx * 25}% center`,
                                backgroundRepeat: "no-repeat",
                                backgroundColor: "#F7F3EB",
                                clipPath: clipStyle,
                              }}
                            />

                            {/* BACK SIDE (CARDBOARD TEXTURED HELPER) */}
                            <div
                              className="absolute inset-0 w-full h-full bg-[#EAE5DA] border border-dashed border-brand-text/20 flex flex-col items-center justify-center gap-1.5"
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(180deg) translateZ(1px)",
                                clipPath: clipStyle,
                              }}
                            >
                              <div className={`w-7 h-7 rounded-full border-2 border-double border-puzzle-blue/50 flex items-center justify-center bg-white/50`}>
                                <span className="text-[10px] font-mono font-black text-puzzle-blue/80">
                                  {helper.zone}
                                </span>
                              </div>
                              <span className="text-[8px] font-display font-black text-puzzle-blue/70 tracking-widest uppercase">
                                P{helper.num}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleResetPuzzle}
                      className="px-4 py-2 border border-brand-text/15 hover:border-brand-text/30 text-brand-text/75 hover:text-brand-text rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Reset Puzzle
                    </button>
                    {!isPuzzleSolved && (
                      <button
                        onClick={() => setHelperRowFlipped((f) => !f)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-brand-text hover:bg-brand-text/80 text-brand-bg font-display text-[10px] font-black tracking-widest uppercase rounded-xl transition-all duration-300 shadow cursor-pointer"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>{helperRowFlipped ? "Show Logo" : "Show Back Helpers"}</span>
                      </button>
                    )}
                  </div>

                  {isPuzzleSolved && (
                    <span className="text-xs font-display font-black uppercase text-green-600 tracking-wider flex items-center gap-1.5 animate-bounce">
                      <Trophy className="w-4 h-4" /> Solved! Reward Unlocked!
                    </span>
                  )}
                </div>

                {/* Losing hope support dialogue */}
                {!isPuzzleSolved && (
                  <div className="text-center max-w-xs p-3 bg-brand-bg rounded-2xl border border-brand-text/5 text-[10px] sm:text-xs text-brand-text/80 leading-relaxed shadow-sm">
                    <span className="font-bold text-puzzle-blue block mb-1">💡 Stuck or losing hope?</span>
                    Flip the pieces to reveal the zone stamps and numbers on the back. Arrange them from <strong>P1</strong> to <strong>P5</strong> to solve the logo!
                  </div>
                )}
              </motion.div>
            ) : (
              // TAB 2: BOLLYWOOD QUIZ
              <motion.div
                key="quiz-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center"
              >
                {!quizCompleted ? (
                  <>
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-display font-black tracking-widest text-puzzle-red uppercase bg-puzzle-red/5 px-3 py-1 rounded">
                        Question {currentQuizIdx + 1} of {TRIVIA_QUESTIONS.length}
                      </span>
                    </div>

                    <div className="w-full max-w-[340px] aspect-[2/3] relative mb-6" style={{ perspective: "1000px" }}>
                      <motion.div
                        animate={{ rotateY: quizFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="w-full h-full relative"
                      >
                        {/* Front Side */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl bg-white border border-brand-text/10 shadow-lg p-6 flex flex-col justify-between"
                          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(1px)" }}
                        >
                          <div className="flex justify-between items-center text-[9px] font-display font-black text-brand-text/70 uppercase">
                            <span>{currentTrivia.category}</span>
                            <span>Score: {score}</span>
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
                            <span>Demo Quiz</span>
                            <span>Bollywood Battle</span>
                          </div>
                        </div>

                        {/* Back Side */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-2xl bg-white border border-amber-500/20 shadow-lg p-6 flex flex-col justify-between text-center"
                          style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg) translateZ(1px)",
                          }}
                        >
                          <div className="flex justify-between items-center text-[9px] font-display font-black text-brand-text/75 uppercase">
                            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Answer Revealed</span>
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
                              The Correct Answer is:
                            </span>
                            <h4 className="text-xl font-display font-black text-brand-text mt-1">
                              {currentTrivia.answer}
                            </h4>
                            <p className="text-xs text-brand-text/85 mt-3 leading-relaxed">
                              {selectedOption === currentTrivia.answer
                                ? "Correct! Brilliant job. On to the next card."
                                : `Nice try! The correct choice was "${currentTrivia.answer}".`}
                            </p>
                          </div>

                          <button
                            onClick={handleNextQuiz}
                            className="w-full bg-brand-text hover:bg-brand-text/80 text-brand-bg font-display text-[9px] font-black tracking-widest uppercase py-3.5 rounded-xl transition-all duration-300 cursor-pointer"
                          >
                            Next Question
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </>
                ) : (
                  // Quiz Completed State
                  <div className="my-auto text-center py-8">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
                      <Trophy className="w-8 h-8 text-amber-600 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-display font-black text-brand-text tracking-tight">
                      Quiz Completed!
                    </h3>
                    <p className="text-sm text-brand-text/85 mt-2">
                      You scored <strong className="text-puzzle-red">{score} / {TRIVIA_QUESTIONS.length}</strong> correct answers.
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-3">
                      <span className="text-xs font-display font-black uppercase text-green-600 tracking-wider">
                        Reward Unlocked!
                      </span>
                      <button
                        onClick={() => setShowRewardModal(true)}
                        className="px-6 py-3 bg-puzzle-red hover:bg-red-900 text-white font-display text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 shadow hover:scale-105 cursor-pointer"
                      >
                        Claim 15% Discount Coupon
                      </button>
                      <button
                        onClick={handleResetQuiz}
                        className="text-xs text-brand-text/60 hover:text-brand-text mt-2 underline transition-colors cursor-pointer"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* --- PREMIUM REWARD MODAL POPUP --- */}
      <AnimatePresence>
        {showRewardModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-3xl border border-brand-text/5 shadow-2xl p-8 text-center relative overflow-hidden"
            >
              {/* Confetti / spark decoration */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-puzzle-red/10 rounded-full blur-xl pointer-events-none" />

              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-amber-400">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>

              <h3 className="text-2xl font-display font-black text-brand-text tracking-tight">
                Hurray! Victory! 🎉
              </h3>
              <p className="text-sm text-brand-text/85 mt-2 leading-relaxed">
                You successfully conquered the Mindovo Challenge! As a special reward, enjoy an exclusive <strong className="font-bold">15% discount</strong> to purchase our premium board games.
              </p>

              {/* Coupon Box */}
              <div className="my-6 p-4.5 bg-brand-bg border-2 border-dashed border-amber-500/40 rounded-2xl flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[9px] font-display font-black text-brand-text/60 uppercase block tracking-wider">
                    Discount Coupon Code
                  </span>
                  <span className="text-lg font-mono font-black text-brand-text tracking-wider">
                    MINDOVO15
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-4.5 py-2.5 bg-brand-text hover:bg-brand-text/80 text-brand-bg rounded-xl font-display text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-brand-text/70 leading-relaxed mb-8">
                Copy the code and apply it during checkout on our official store to claim your discount.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href="https://fashiondux.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-display text-xs font-black tracking-widest uppercase py-4 rounded-full transition-all duration-300 shadow hover:shadow-lg hover:scale-102 cursor-pointer"
                >
                  <span>Use Coupon on Store</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setShowRewardModal(false)}
                  className="w-full border border-brand-text/10 hover:border-brand-text/30 text-brand-text/75 hover:text-brand-text font-display text-xs font-black tracking-widest uppercase py-4 rounded-full transition-all duration-300 cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
