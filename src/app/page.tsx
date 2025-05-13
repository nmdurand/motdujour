import Game from "@/components/Game";
import { getRandomFrenchWord } from "@/data";

export default async function Home() {
  const word = getRandomFrenchWord();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Game word={word} />
    </div>
  );
}
