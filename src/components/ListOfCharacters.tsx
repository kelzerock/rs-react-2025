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
    <ul className="bg-cyan-100 p-2 rounded-2xl flex flex-wrap gap-2 basis-1/2 sm:basis-2/3 justify-between">
      {characters.map((character) => (
        <Character character={character} key={character.uid} />
      ))}
    </ul>
  );
};
