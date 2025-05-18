import { useGameContext } from "@/contexts/gameContext";
import { Line } from "./Line";

export function Board() {
  const { gameState, word } = useGameContext();

  if (gameState !== "playing") {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {word && (
        <div className="text-center text-2xl font-bold">
          {word.toUpperCase()}
        </div>
      )}
      {new Array(6).fill(0).map((_, index) => (
        <Line key={index} index={index} />
      ))}
    </div>
  );
}
