"use client";

import { GameContextProvider, useGameContext } from "@/contexts/gameContext";
import { Board } from "./Board";
import { NewGameButton } from "./NewGameButton";
import { Keyboard } from "./Keyboard";

export default function Game() {
  return (
    <GameContextProvider>
      <GameContent />
    </GameContextProvider>
  );
}

function GameContent() {
  const { gameState, word } = useGameContext();

  if (gameState === "intro" || gameState === "won" || gameState === "lost") {
    return (
      <>
        <div className="text-center text-2xl font-bold mb-4">
          {gameState === "intro" && "Trouvez le mot mystère en 6 tentatives"}
          {gameState === "won" && "Bravo ! Le mot était " + word?.toUpperCase()}
          {gameState === "lost" &&
            "Perdu ! Le mot était " + word?.toUpperCase()}
        </div>
        <NewGameButton />
      </>
    );
  }

  if (gameState === "playing") {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <Board />
        <Keyboard />
      </div>
    );
  }
}
