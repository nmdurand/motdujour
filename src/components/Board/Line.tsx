import { useGameContext } from "@/contexts/gameContext";
import { getWordDetailedResult, LetterResult } from "@/utils";
import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

const WORD_LENGTH = 6;

interface LineProps {
  index: number;
}

export function Line({ index }: LineProps) {
  const {
    guessedWords,
    currentGuessIndex,
    word,
    currentGuess,
    animatingLine,
    onLineAnimationComplete,
  } = useGameContext();

  const isCurrentGuess = index === currentGuessIndex;
  const guess = isCurrentGuess ? currentGuess : guessedWords[index] || "";
  const shouldAnimate = animatingLine === index;

  const result = useMemo(() => {
    if (!word) {
      return [];
    }
    return getWordDetailedResult({ word, guess });
  }, [word, guess]);

  const handleAnimationComplete = () => {
    if (shouldAnimate) {
      onLineAnimationComplete(index);
    }
  };

  return (
    <div className="flex gap-2">
      {new Array(WORD_LENGTH).fill(0).map((_, letterIndex) => (
        <AnimatePresence key={letterIndex} mode="wait">
          {shouldAnimate && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: letterIndex * 0.1, // Stagger effect
              }}
              onAnimationComplete={() => {
                if (letterIndex === WORD_LENGTH - 1) {
                  handleAnimationComplete();
                }
              }}
            >
              <Letter
                letter={guess[letterIndex] || ""}
                status={result[letterIndex]}
              />
            </motion.div>
          )}
          {!shouldAnimate && (
            <Letter
              letter={
                guess[letterIndex] ||
                (letterIndex === 0 && isCurrentGuess && word ? word[0] : "")
              }
              className={
                letterIndex === 0 && isCurrentGuess && !guess[0]
                  ? "bg-gray-500/50"
                  : ""
              }
              status={isCurrentGuess ? undefined : result[letterIndex]}
            />
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

interface LetterProps {
  letter: string;
  status?: LetterResult;
  className?: string;
}

function Letter({ letter, status, className }: LetterProps) {
  return (
    <div
      className={`w-12 h-16 border border-gray-300
    rounded-md p-2 flex items-center justify-center
    ${className}
    text-2xl font-bold ${
      status === "correct"
        ? "bg-green-500 text-white"
        : status === "present"
        ? "bg-yellow-500 text-white"
        : "text-white"
    }`}
    >
      {letter.toUpperCase()}
    </div>
  );
}
