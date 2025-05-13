import frenchWords from "an-array-of-french-words";
import removeAccents from "remove-accents";

export type LetterResult = "correct" | "present" | "absent";

export function getWordDetailedResult({
  word,
  guess,
}: {
  word: string;
  guess: string;
}) {
  const result: LetterResult[] = [];
  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = "correct";
      word = word.replace(guess[i], " ");
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") {
      continue;
    }
    if (word.includes(guess[i])) {
      result[i] = "present";
      word = word.replace(guess[i], "");
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct" || result[i] === "present") {
      continue;
    }
    result[i] = "absent";
  }
  return result;
}

export function isWordValid(word: string) {
  return (frenchWords as string[])
    .map((frenchWord) => removeAccents(frenchWord))
    .includes(word);
}
