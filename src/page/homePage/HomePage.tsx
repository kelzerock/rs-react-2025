import { LocalStorageKey } from "../../models/enums/localStorageKey";
import { Search } from "../../components/Search";
import { CrashComponent } from "../../components/CrashComponent";
import { ListOfCharacters } from "../../components/ListOfCharacters";
import { CharacterInfo } from "../../components/CharacterInfo";
import { PaginationSection } from "../../components/Pagination";
import { useSearchParams } from "react-router";
import { Query } from "../../models/enums/query";
import { useLS } from "../../hooks/useLS";
import { FlyOutPanel } from "../../components/FlyOutPanel";
import { useGetCharactersQuery } from "../../serviceAPI/stapiAPI";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedSearch, setSavedSearch] = useLS(LocalStorageKey.inputData, "");
  const [inputSearch, setInputSearch] = useState(savedSearch);

  const page = searchParams.get(Query.PAGE) || "1";
  const details = searchParams.get(Query.DETAILS);
  const newPage = (parseFloat(page) - 1).toString();

  const { data, isFetching, isError } = useGetCharactersQuery(
    {
      params: newPage,
      search: inputSearch,
    },
    { skip: newPage === null },
  );

  useEffect(() => {
    const newParams = new URLSearchParams();
    const page = searchParams.get(Query.PAGE) || "1";
    const details = searchParams.get(Query.DETAILS);
    newParams.set(Query.PAGE, page);
    if (details) newParams.set(Query.DETAILS, details);
    setSearchParams(newParams);
  }, [data]);

  const handleSearchInputChange = (value: string): void => {
    setInputSearch(value);
    setSavedSearch(value);
    const newParams = new URLSearchParams();
    newParams.set(Query.PAGE, "1");
    if (details) newParams.set(Query.DETAILS, details);
    setSearchParams(newParams);
  };

  return (
    <>
      <h1 className="p-4 text-4xl dark:text-stone-400">
        StarTrek characters library:
      </h1>

      <Search
        onInputChange={handleSearchInputChange}
        isLoading={isFetching}
        initialValue={inputSearch}
      />

      {isError && <CrashComponent />}

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 items-start grow relative">
        <ListOfCharacters
          characters={data?.characters ?? []}
          isLoading={isFetching}
        />
        <CharacterInfo />
        <FlyOutPanel />
      </div>

      {data?.page && (
        <PaginationSection isLoading={isFetching} page={data.page} />
      )}
    </>
  );
};
