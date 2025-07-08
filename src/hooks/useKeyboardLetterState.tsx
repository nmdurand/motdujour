import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/gameContext";

export type LetterState = "correct" | "incorrect" | "present";

export function useKeyboardLetterState({
  letter,
}: {
  letter: string;
}): LetterState | undefined {
  const [letterState, setLetterState] = useState<LetterState | undefined>(
    undefined
  );

  const { guessedWords, word } = useGameContext();

  useEffect(() => {
    const computeLetterState = (letter: string): LetterState | undefined => {
      if (letter.length > 1) {
        return undefined;
      }
      if (word === null) return undefined;
      if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
          // letter is present in word to find
          if (word[i] === letter) {
            // for each index it appears at
            // check if it appears in the guessedWords at the same index
            // if it appears at the same index, return correct
            for (let j = 0; j < guessedWords.length; j++) {
              if (guessedWords[j][i] === letter) {
                return "correct";
              }
            }
          }
        }
        // else check if it appears at all in the guessedWords
        // if it appears, return present
        for (let j = 0; j < guessedWords.length; j++) {
          if (guessedWords[j].includes(letter)) {
            return "present";
          }
        }
        // if it doesn't appear at all, return undefined
        return undefined;
      } else {
        // letter is not present in word to find
        // check if it appears in the guessedWords
        // if it appears, return incorrect
        for (let j = 0; j < guessedWords.length; j++) {
          if (guessedWords[j].includes(letter)) {
            return "incorrect";
          }
        }
      }
      return undefined;
    };

    setLetterState(() => computeLetterState(letter));
  }, [letter, guessedWords, word]);

  return letterState;
}
