import { memo, useCallback } from "react";
import { Character } from "./Character";
import { useSearchParams } from "react-router";
import { GridLoader } from "react-spinners";
import { Title } from "./helperComponent/Title";
import { Query } from "../models/enums/query";
import type z from "zod";
import type { CharacterBaseZ } from "../schema/characterBaseZ";

export const ListOfCharacters = memo(function ListOfCharacters({
  characters,
  isLoading,
}: {
  characters: z.infer<typeof CharacterBaseZ>[];
  isLoading: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams);

      params.set(Query.DETAILS, id);

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  return (
    <div className="xl:grid-cols-3 sm:col-span-2 xl:col-span-3 h-full bg-stone-50 dark:bg-stone-700 rounded-md">
      {isLoading ? (
        <div
          className="w-full h-full flex justify-center items-center col-span-1 sm:col-span-2 xl:col-span-3"
          role="status"
        >
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
