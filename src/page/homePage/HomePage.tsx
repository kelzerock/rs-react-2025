import { LocalStorageKey } from "../../models/enums/localStorageKey";
import { Search } from "../../components/Search";
import { CrashComponent } from "../../components/CrashComponent";
import { ListOfCharacters } from "../../components/ListOfCharacters";
import { CharacterInfo } from "../../components/CharacterInfo";
import { PaginationSection } from "../../components/Pagination";
import { useSearchParams } from "react-router";
import { Query } from "../../models/enums/query";
import { RequestQuery } from "../../models/enums/requestQuery";
import { useLS } from "../../hooks/useLS";
import { FlyOutPanel } from "../../components/FlyOutPanel";
import { useGetCharactersQuery } from "../../serviceAPI/stapiAPI";
import { useMemo, useState } from "react";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedSearch, setSavedSearch] = useLS(LocalStorageKey.inputData, "");
  const [inputSearch, setInputSearch] = useState(savedSearch);

  const page = searchParams.get(Query.PAGE) || "1";
  const details = searchParams.get(Query.DETAILS);

  const queries = useMemo(() => {
    const params = new URLSearchParams();
    params.set(RequestQuery.PAGE, String(parseInt(page) - 1));
    if (details) params.set(Query.DETAILS, details);
    return params;
  }, [page, details]);

  const { data, isLoading, isError } = useGetCharactersQuery({
    search: inputSearch,
    params: queries,
  });
  console.log({ data, isLoading });
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
        isLoading={isLoading}
        initialValue={inputSearch}
      />

      {isError && <CrashComponent />}

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 items-start grow relative">
        <ListOfCharacters
          characters={data?.characters ?? []}
          isLoading={isLoading}
        />
        <CharacterInfo />
        <FlyOutPanel />
      </div>

      {data?.page && (
        <PaginationSection isLoading={isLoading} page={data.page} />
      )}
    </>
  );
};
