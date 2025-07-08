import { useGameContext } from "@/contexts/gameContext";
import {
  LetterState,
  useKeyboardLetterState,
} from "@/hooks/useKeyboardLetterState";
import { twMerge } from "tailwind-merge";

const KEYS_LINES = [
  ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
  ["backspace", "w", "x", "c", "v", "b", "n", "enter"],
];

export function Keyboard() {
  return (
    <div className="flex flex-col gap-1">
      {KEYS_LINES.map((line, index) => (
        <KeyboardLine key={index} line={line} />
      ))}
    </div>
  );
}

function KeyboardLine({ line }: { line: string[] }) {
  const { onLetter, onBackspace, onEnter } = useGameContext();

  const handleLetterClick = (letter: string) => {
    switch (letter) {
      case "enter":
        onEnter();
        break;
      case "backspace":
        onBackspace();
        break;
      default:
        onLetter(letter);
    }
  };

  return (
    <div className="flex justify-center gap-1">
      {line.map((letter) => (
        <KeyboardLetter
          key={letter}
          letter={letter}
          onClick={() => handleLetterClick(letter)}
        />
      ))}
    </div>
  );
}

function KeyboardLetter({
  letter,
  onClick,
}: {
  letter: string;
  onClick: () => void;
}) {
  const letterState = useKeyboardLetterState({ letter });

  const getDisplayedLetter = (letter: string) => {
    if (letter === "enter") return "↵";
    if (letter === "backspace") return "⌫";
    return letter.toUpperCase();
  };

  const getLetterClasses = (letterState: LetterState | undefined) => {
    if (letterState === "correct") return "bg-green-500";
    if (letterState === "present") return "bg-yellow-500";
    if (letterState === "incorrect") return "bg-gray-800";
    return "bg-gray-500";
  };

  return (
    <button
      key={letter}
      className={twMerge(
        "w-8 h-10 grow rounded-md",
        "text-white text-2xl font-bold",
        "hover:opacity-80 active:opacity-60 transition-opacity cursor-pointer",
        getLetterClasses(letterState)
      )}
      onClick={onClick}
    >
      {getDisplayedLetter(letter)}
    </button>
  );
}
