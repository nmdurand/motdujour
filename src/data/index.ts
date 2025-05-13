import { english6LetterWords } from "./english6LetterWords";
import { french6LetterWords } from "./french6LetterWords";
import removeAccents from "remove-accents";

export function getFrenchWords() {
  return french6LetterWords.split(" ").map((word) => removeAccents(word));
}

export function getEnglishWords() {
  return english6LetterWords.split(" ");
}

export function getRandomFrenchWord() {
  const frenchWords = getFrenchWords();
  return frenchWords[Math.floor(Math.random() * frenchWords.length)];
}

export function getRandomEnglishWord() {
  const englishWords = getEnglishWords();
  return englishWords[Math.floor(Math.random() * englishWords.length)];
}
