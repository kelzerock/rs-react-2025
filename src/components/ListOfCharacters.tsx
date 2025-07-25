import { memo, useCallback } from "react";
import type { MainCharacter } from "../models/types/mainCharacter";
import { Character } from "./Character";
import { useSearchParams } from "react-router";
import { GridLoader } from "react-spinners";
import { Title } from "./helperComponent/Title";
import { Query } from "../models/enums/query";

export const ListOfCharacters = memo(function ListOfCharacters({
  characters,
  isLoading,
}: {
  characters: MainCharacter[];
  isLoading: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = useCallback((id: string) => {
    const page = searchParams.get(Query.PAGE);
    const params = new URLSearchParams();

    if (page) {
      params.set(Query.PAGE, page);
    }

    params.set(Query.DETAILS, id);

    setSearchParams(params);
  }, []);

  return (
    <div className="xl:grid-cols-3 sm:col-span-2 xl:col-span-3 h-full bg-stone-50 rounded-md">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center col-span-1 sm:col-span-2 xl:col-span-3">
          <GridLoader size="40px" />
        </div>
      ) : characters.length === 0 ? (
        <Title title="Characters are absent" />
      ) : (
        <ul className="p-2 rounded-2xl gap-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start auto-rows-fr">
          {characters.map((character) => (
            <Character
              character={character}
              key={character.uid}
              onClick={handleClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
});
