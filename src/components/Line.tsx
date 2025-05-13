import { getWordDetailedResult, isWordValid, LetterResult } from "@/utils";
import { useEffect, useMemo, useState } from "react";

const MAX_LENGTH = 6;

interface LineProps {
  word: string;
  isActive: boolean;
  onNext: () => void;
  onSuccess: () => void;
}

export function Line({ word, isActive, onNext, onSuccess }: LineProps) {
  const [guess, setGuess] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key.length === 1 && event.key.toLowerCase().match(/[a-z]/)) {
        if (guess.length < MAX_LENGTH) {
          setGuess(guess + event.key.toLowerCase());
        }
      } else if (event.key.toLowerCase() === "backspace") {
        setGuess(guess.slice(0, -1));
      } else if (
        guess.length === MAX_LENGTH &&
        event.key.toLowerCase() === "enter"
      ) {
        if (!isWordValid(guess)) {
          console.log("Mot invalide", guess);
          alert("Mot invalide");
          return;
        }
        console.log("Mot valide", guess);
        setIsSubmitted(true);
        if (guess === word) {
          onSuccess();
        } else {
          onNext();
        }
      }
    };

    if (isActive) {
      window.addEventListener("keydown", listener);
      return () => window.removeEventListener("keydown", listener);
    }
  }, [word, guess, isActive, onNext, onSuccess]);

  const result = useMemo(() => {
    if (guess.length < MAX_LENGTH || !isSubmitted) {
      return [];
    }
    return getWordDetailedResult({ word, guess });
  }, [word, guess, isSubmitted]);

  return (
    <div className="flex gap-2">
      {new Array(MAX_LENGTH).fill(0).map((_, index) => (
        <Letter
          key={index}
          letter={guess[index] || (index === 0 && isActive ? word[0] : "")}
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
