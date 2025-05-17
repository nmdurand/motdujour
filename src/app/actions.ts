"use server";

import { getRandomFrenchWord } from "@/data";

export async function getNewWord() {
  return getRandomFrenchWord();
}
