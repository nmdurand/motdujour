import { getNewWord } from "@/app/actions";
import { isWordValid } from "@/utils";
import confetti from "canvas-confetti";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

type GameState = "intro" | "playing" | "won" | "lost";

interface GameContextType {
  currentGuessIndex: number;
  guessedWords: string[];
  currentGuess: string;
  gameState: GameState;
  word: string | null;
  onLetter: (letter: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onNewGame: () => void;
  animatingLine: number | null;
  onLineAnimationComplete: (lineIndex: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameContextProvider({ children }: GameProviderProps) {
  const [word, setWord] = useState<string | null>(null);

  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>("intro");
  const [guessedWords, setGuessedWords] = useState<string[]>(
    new Array(6).fill("")
  );
  const [animatingLine, setAnimatingLine] = useState<number | null>(null);

  const onLetter = useCallback(
    (letter: string) => {
      if (currentGuess.length < 6) {
        setCurrentGuess((prev) => prev + letter);
      }
    },
    [currentGuess]
  );

  const onBackspace = useCallback(() => {
    if (currentGuess.length > 0) {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
  }, [currentGuess]);

  const onEnter = useCallback(() => {
    if (currentGuess.length === 6) {
      if (!isWordValid(currentGuess)) {
        alert("Mot invalide");
        return;
      }

      setGuessedWords((prev) => {
        const newGuessedWords = [...prev];
        newGuessedWords[currentGuessIndex] = currentGuess;
        return newGuessedWords;
      });

      setAnimatingLine(currentGuessIndex);
    }
  }, [currentGuess, currentGuessIndex]);

  const onLineAnimationComplete = useCallback(
    (lineIndex: number) => {
      setAnimatingLine(null);

      // Now that animation is complete, update game state
      if (currentGuess === word) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        setCurrentGuessIndex(-1);
        setCurrentGuess("");
        setTimeout(() => {
          setGameState("won");
        }, 3000);
      } else if (lineIndex >= 5) {
        setGameState("lost");
      } else {
        setCurrentGuessIndex((prev) => prev + 1);
        setCurrentGuess("");
      }
    },
    [currentGuess, word, setGameState]
  );

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key.length === 1 && event.key.toLowerCase().match(/[a-z]/)) {
        onLetter(event.key.toLowerCase());
      } else if (event.key.toLowerCase() === "backspace") {
        onBackspace();
      } else if (
        currentGuess.length === 6 &&
        event.key.toLowerCase() === "enter"
      ) {
        onEnter();
      }
    };

    if (gameState === "playing") {
      window.addEventListener("keydown", listener);
      return () => window.removeEventListener("keydown", listener);
    }
  }, [
    word,
    gameState,
    currentGuessIndex,
    currentGuess,
    onLetter,
    onBackspace,
    onEnter,
  ]);

  const onNewGame = useCallback(async () => {
    const newWord = await getNewWord();
    setCurrentGuessIndex(0);
    setGameState("playing");
    setGuessedWords(new Array(6).fill(""));
    setCurrentGuess("");
    setWord(newWord);
    setAnimatingLine(null);
  }, []);

  const value = {
    currentGuessIndex,
    guessedWords,
    currentGuess,
    gameState,
    word,
    onLetter,
    onBackspace,
    onEnter,
    onNewGame,
    animatingLine,
    onLineAnimationComplete,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
}
