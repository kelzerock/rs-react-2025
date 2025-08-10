import { LocalStorageKey } from "../../models/enums/localStorageKey";
import { Search } from "../../components/Search";
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
  const [forceRequest, setForceRequest] = useState(false);

  const page = searchParams.get(Query.PAGE) || "1";
  const details = searchParams.get(Query.DETAILS);
  const newPage = (parseFloat(page) - 1).toString();

  const { data, isFetching, error } = useGetCharactersQuery(
    {
      params: newPage,
      search: inputSearch,
    },
    { skip: newPage === null, refetchOnMountOrArgChange: forceRequest },
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

  const handleClick = () => {
    setForceRequest(!forceRequest);
  };

  let errorBlock = null;

  if (error) {
    const stub = "information absent";
    let message = "";
    let status:
      | number
      | "FETCH_ERROR"
      | "PARSING_ERROR"
      | "TIMEOUT_ERROR"
      | "CUSTOM_ERROR"
      | null = null;
    let errMes = "";
    if ("message" in error) {
      message = error.message || "";
    }
    if ("status" in error) {
      errMes = "error" in error ? error.error : JSON.stringify(error.data);
      status = error.status;
    }
    errorBlock = (
      <div className="w-full h-full bg-stone-100 p-2">
        <div className=" text-2xl font-semibold">An error has occurred:</div>
        <div data-testid="error-msg">message: {message || stub}</div>
        <div data-testid="error-status">status: {status || stub}</div>
        <div data-testid="error-data">data: {errMes || stub}</div>
      </div>
    );
  }

  return (
    <>
      <h1 className="p-4 text-4xl dark:text-stone-400">
        StarTrek characters library:
      </h1>
      <button
        onClick={handleClick}
        className="bg-stone-300 hover:cursor-pointer hover:bg-stone-400 transition-colors duration-300 p-1 rounded-md hover:text-stone-50"
      >
        Force fetching: {forceRequest ? "on" : "off"}
      </button>
      <Search
        onInputChange={handleSearchInputChange}
        isLoading={isFetching}
        initialValue={inputSearch}
      />

      {errorBlock ? (
        errorBlock
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 items-start grow relative">
          <ListOfCharacters
            characters={data?.characters ?? []}
            isLoading={isFetching}
          />
          <CharacterInfo forceFetching={forceRequest} />
          <FlyOutPanel />
        </div>
      )}

      {data?.page && (
        <PaginationSection isLoading={isFetching} page={data.page} />
      )}
    </>
  );
};
