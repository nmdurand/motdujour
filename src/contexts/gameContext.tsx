import { getNewWord } from "@/app/actions";
import { isWordValid } from "@/utils";
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
  onNextGuess: () => void;
  onSuccess: () => void;
  gameState: GameState;
  word: string | null;
  onLetter: (letter: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onNewGame: () => void;
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

  const onNextGuess = useCallback(() => {
    setCurrentGuessIndex((prev) => prev + 1);
    setCurrentGuess("");
  }, []);

  const onSuccess = useCallback(() => {
    setCurrentGuessIndex(-1);
    setGameState("won");
  }, []);

  const onLetter = useCallback(
    (letter: string) => {
      if (guessedWords[currentGuessIndex]?.length < 6) {
        setCurrentGuess((prev) => prev + letter);
      }
    },
    [guessedWords, currentGuessIndex]
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
      if (currentGuess === word) {
        onSuccess();
      } else {
        if (currentGuessIndex < 5) {
          setGuessedWords((prev) => {
            const newGuessedWords = [...prev];
            newGuessedWords[currentGuessIndex] = currentGuess;
            return newGuessedWords;
          });
          onNextGuess();
        } else {
          setGameState("lost");
        }
      }
    }
  }, [currentGuess, word, onSuccess, onNextGuess, currentGuessIndex]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key.length === 1 && event.key.toLowerCase().match(/[a-z]/)) {
        onLetter(event.key.toLowerCase());
      } else if (event.key.toLowerCase() === "backspace") {
        onBackspace();
      } else if (
        guessedWords[currentGuessIndex]?.length === 6 &&
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
    guessedWords,
    onLetter,
    onBackspace,
    onEnter,
  ]);

  const onNewGame = useCallback(async () => {
    const newWord = await getNewWord();
    setCurrentGuessIndex(0);
    setGameState("playing");
    setGuessedWords(new Array(6).fill(""));
    setWord(newWord);
  }, []);

  const value = {
    currentGuessIndex,
    guessedWords,
    currentGuess,
    onNextGuess,
    onSuccess,
    gameState,
    word,
    onLetter,
    onBackspace,
    onEnter,
    onNewGame,
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
