"use client";

import { getNewWord } from "@/app/actions";
import { useState } from "react";
import { Line } from "./Line";

export default function Game() {
  const [currentLine, setCurrentLine] = useState(0);
  const [word, setWord] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleNewGame = async () => {
    const newWord = await getNewWord();
    setWord(newWord);
    setCurrentLine(0);
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {word && (
        <div className="flex flex-col gap-2">
          {new Array(6).fill(0).map((_, index) => (
            <Line
              key={index}
              word={word}
              isActive={index === currentLine}
              onNext={() => setCurrentLine(currentLine + 1)}
              onSuccess={() => {
                setCurrentLine(-1);
                setIsGameOver(true);
              }}
            />
          ))}
        </div>
      )}
      {(!word || isGameOver) && (
        <button
          onClick={handleNewGame}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Nouvelle partie
        </button>
      )}
    </div>
  );
}
