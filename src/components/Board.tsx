import { useGameContext } from "@/contexts/gameContext";
import { Line } from "./Line";

export function Board() {
  const { gameState } = useGameContext();

  if (gameState !== "playing") {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {new Array(6).fill(0).map((_, index) => (
        <Line key={index} index={index} />
      ))}
    </div>
  );
}
