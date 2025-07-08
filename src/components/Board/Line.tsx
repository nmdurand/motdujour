import { useGameContext } from "@/contexts/gameContext";
import { getWordDetailedResult, LetterResult } from "@/utils";
import { useMemo } from "react";

const WORD_LENGTH = 6;

interface LineProps {
  index: number;
}

export function Line({ index }: LineProps) {
  const { guessedWords, currentGuessIndex, word, currentGuess } =
    useGameContext();

  const isCurrentGuess = index === currentGuessIndex;
  const guess = isCurrentGuess ? currentGuess : guessedWords[index] || "";

  const result = useMemo(() => {
    if (isCurrentGuess || !word) {
      return [];
    }
    return getWordDetailedResult({ word, guess });
  }, [word, guess, isCurrentGuess]);

  return (
    <div className="flex gap-2">
      {new Array(WORD_LENGTH).fill(0).map((_, index) => (
        <Letter
          key={index}
          letter={
            guess[index] ||
            (index === 0 && isCurrentGuess && word ? word[0] : "")
          }
          className={
            index === 0 && isCurrentGuess && !guess[0] ? "bg-gray-500/50" : ""
          }
          status={result[index]}
        />
      ))}
    </div>
  );
}

interface LetterProps {
  letter: string;
  status: LetterResult;
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
