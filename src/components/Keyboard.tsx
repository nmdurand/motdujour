import { useGameContext } from "@/contexts/gameContext";

const KEYS_LINES = [
  ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
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

  const getDisplayedLetter = (letter: string) => {
    if (letter === "enter") return "↵";
    if (letter === "backspace") return "⌫";
    return letter.toUpperCase();
  };

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
        <button
          key={letter}
          className="w-8 h-10 bg-gray-500 rounded-md
          text-white text-2xl font-bold
          hover:bg-gray-600 transition-colors cursor-pointer"
          onClick={() => handleLetterClick(letter)}
        >
          {getDisplayedLetter(letter)}
        </button>
      ))}
    </div>
  );
}
