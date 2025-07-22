import type { MainCharacter } from "../models/types/mainCharacter";
import { Character } from "./Character";

export const ListOfCharacters = ({
  characters,
}: {
  characters: MainCharacter[];
}) => {
  if (characters.length === 0) {
    return <h2>Characters are absent</h2>;
  }

  return (
    <ul className="bg-cyan-100 p-2 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
      {characters.map((character) => (
        <Character character={character} key={character.uid} />
      ))}
    </ul>
  );
};
