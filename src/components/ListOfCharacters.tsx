import { memo, useCallback } from "react";
import type { MainCharacter } from "../models/types/mainCharacter";
import { Character } from "./Character";
import { useSearchParams } from "react-router";

export const ListOfCharacters = memo(function ListOfCharacters({
  characters,
}: {
  characters: MainCharacter[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const cachedSetSearchParams = useCallback(
    (data: { [key: string]: string }) => {
      const newParams = new URLSearchParams(data);
      setSearchParams(newParams);
    },
    [],
  );

  if (characters.length === 0) {
    searchParams.has("title");
    return <h2>Characters are absent</h2>;
  }

  return (
    <ul className="bg-cyan-100 p-2 rounded-2xl flex flex-wrap gap-2 basis-1/2 sm:basis-2/3 justify-between">
      {characters.map((character) => (
        <Character
          character={character}
          key={character.uid}
          setSearchParams={cachedSetSearchParams}
        />
      ))}
    </ul>
  );
});
