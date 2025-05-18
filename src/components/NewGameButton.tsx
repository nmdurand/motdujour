import { useGameContext } from "@/contexts/gameContext";

export function NewGameButton() {
  const { onNewGame } = useGameContext();

  return (
    <button
      onClick={onNewGame}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
    >
      Nouvelle partie
    </button>
  );
}
