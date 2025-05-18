import { useGameContext } from "@/contexts/gameContext";
import { getWordDetailedResult, LetterResult } from "@/utils";
import { useMemo } from "react";

const WORD_LENGTH = 6;

interface LineProps {
  index: number;
}

export function Line({ index }: LineProps) {
  const { guessedWords, currentGuessIndex, word } = useGameContext();

  const guess = guessedWords[index] || "";
  const isCurrentGuess = index === currentGuessIndex;

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
          status={result[index]}
        />
      ))}
    </div>
  );
}

interface LetterProps {
  letter: string;
  status: LetterResult;
}

function Letter({ letter, status }: LetterProps) {
  return (
    <div
      className={`w-12 h-16 border border-gray-300
    rounded-md p-2 flex items-center justify-center
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
