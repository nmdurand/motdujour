"use client";

import { useState } from "react";
import { Line } from "./Line";

export default function Game({ word }: { word: string }) {
  const [currentLine, setCurrentLine] = useState(0);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-2">
        {new Array(6).fill(0).map((_, index) => (
          <Line
            key={index}
            word={word}
            isActive={index === currentLine}
            onNext={() => setCurrentLine(currentLine + 1)}
            onSuccess={() => setCurrentLine(-1)}
          />
        ))}
      </div>
    </div>
  );
}
