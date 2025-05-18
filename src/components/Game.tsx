"use client";

import { GameContextProvider, useGameContext } from "@/contexts/gameContext";
import { Board } from "./Board";
import { NewGameButton } from "./NewGameButton";

export default function Game() {
  return (
    <>
      <GameContextProvider>
        <GameContent />
      </GameContextProvider>
    </>
  );
}

function GameContent() {
  const { gameState } = useGameContext();

  if (gameState === "intro" || gameState === "won" || gameState === "lost") {
    return <NewGameButton />;
  }

  if (gameState === "playing") {
    return <Board />;
  }
}
